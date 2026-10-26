const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs/promises'),path=require('node:path'),os=require('node:os');
const {execFile}=require('node:child_process'),{promisify}=require('node:util');
const exec=promisify(execFile);
const A='10000000-0000-4000-8000-000000000001',B='10000000-0000-4000-8000-000000000002';

test('real Postgres: ownership, atomic revisions and history retention',async t=>{
  let bin;
  try{bin=(await exec('pg_config',['--bindir'])).stdout.trim();await fs.access(path.join(bin,'initdb'));}catch{t.skip('Install PostgreSQL to run database integration checks.');return;}
  if(process.getuid?.()===0){t.skip('initdb requires a non-root account.');return;}
  const temp=await fs.mkdtemp(path.join(os.tmpdir(),'nhiptap-db-')),data=path.join(temp,'data'),socket=path.join(temp,'socket');
  await fs.chmod(temp,0o700);await fs.mkdir(socket,{mode:0o700});
  let started=false;
  const psqlArgs=['-h',socket,'-p','55437','-U',os.userInfo().username,'-d','postgres','-v','ON_ERROR_STOP=1','-Atq'];
  async function sql(query){return (await exec(path.join(bin,'psql'),[...psqlArgs,'-c',query])).stdout.trim();}
  async function asUser(id,query){return sql(`set role authenticated;set request.jwt.claim.sub='${id}';${query}`);}
  try{
    await exec(path.join(bin,'initdb'),['-D',data,'--auth=trust','--encoding=UTF8','--no-locale']);
    await fs.appendFile(path.join(data,'postgresql.conf'),`\nlisten_addresses = ''\nunix_socket_directories = '${socket.replaceAll("'","''")}'\nport = 55437\nfsync = off\n`);
    await exec(path.join(bin,'pg_ctl'),['-D',data,'-l',path.join(temp,'postgres.log'),'-w','start']);started=true;
    await sql(`create role anon;create role authenticated;create schema auth;create table auth.users(id uuid primary key);insert into auth.users values('${A}'),('${B}');create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;grant usage on schema auth,public to anon,authenticated;`);
    const migration=path.resolve(__dirname,'../supabase/migrations/202610260001_private_gym_sync.sql');
    await exec(path.join(bin,'psql'),[...psqlArgs,'-f',migration]);
    await t.test('anonymous users have no table or write RPC access',async()=>{
      await assert.rejects(sql('set role anon;select * from public.gym_states;'),/permission denied/);
      await assert.rejects(sql(`set role anon;select public.save_gym_state(0,'{}');`),/permission denied/);
    });
    await t.test('each user sees only their own row; direct updates are denied',async()=>{
      const saved=JSON.parse(await asUser(A,`select public.save_gym_state(0,'{"notes":"account A"}');`));assert.equal(saved.revision,1);
      assert.equal(await asUser(A,'select count(*) from public.gym_states;'),'1');
      assert.equal(await asUser(B,'select count(*) from public.gym_states;'),'0');
      await assert.rejects(asUser(A,`update public.gym_states set payload='{}';`),/permission denied/);
      const other=JSON.parse(await asUser(B,`select public.save_gym_state(0,'{"notes":"account B"}');`));assert.equal(other.revision,1);
      assert.equal(await asUser(A,'select payload->>\'notes\' from public.gym_states;'),'account A');
    });
    await t.test('stale revisions conflict instead of overwriting data',async()=>{
      const newer=JSON.parse(await asUser(A,`select public.save_gym_state(1,'{"notes":"new"}');`));assert.equal(newer.revision,2);
      const stale=JSON.parse(await asUser(A,`select public.save_gym_state(1,'{"notes":"stale"}');`));assert.equal(stale.ok,false);assert.equal(stale.code,'conflict');
      assert.equal(await asUser(A,'select payload->>\'notes\' from public.gym_states;'),'new');
    });
    await t.test('at most ten old revisions are retained and backups remain private',async()=>{
      for(let revision=2;revision<15;revision++){const saved=JSON.parse(await asUser(A,`select public.save_gym_state(${revision},'{"revision":${revision}}');`));assert.equal(saved.revision,revision+1);}
      assert.equal(await asUser(A,'select count(*) from public.gym_state_backups;'),'10');
      assert.equal(await asUser(B,'select count(*) from public.gym_state_backups;'),'0');
      await assert.rejects(asUser(A,`select public.save_gym_state(-1,'{}');`),/Invalid gym state/);
    });
    await t.test('rerunning setup preserves existing records',async()=>{
      await exec(path.join(bin,'psql'),[...psqlArgs,'-f',migration]);
      assert.equal(await asUser(A,'select revision from public.gym_states;'),'15');
      assert.equal(await asUser(B,'select revision from public.gym_states;'),'1');
    });
  }finally{
    if(started)await exec(path.join(bin,'pg_ctl'),['-D',data,'-m','immediate','-w','stop']).catch(()=>{});
    await fs.rm(temp,{recursive:true,force:true});
  }
});
