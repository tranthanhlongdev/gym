const test=require('node:test');
const assert=require('node:assert/strict');
const plan=require('../program.js'),sync=require('../sync-core.js');

test('cloud snapshots ignore device navigation and normalize object ordering',()=>{
  const a=plan.sanitize({week:8,day:4,mode:'free',done:{'1:0:0':true,'2:1:0':true}});
  const b=plan.sanitize({week:1,day:0,mode:'machine',done:{'2:1:0':true,'1:0:0':true}});
  assert.equal(sync.text(a),sync.text(b));
});
test('unsynced changes cannot silently overwrite a newer cloud revision',()=>{
  const state=plan.sanitize({done:{'1:0:0':true}});
  assert.equal(sync.decide({revision:2,dirty:true},state,{revision:3,state:plan.sanitize(null)}),'conflict');
  assert.equal(sync.decide({revision:2,dirty:true},state,{revision:2,state:plan.sanitize(null)}),'push');
  assert.equal(sync.decide(null,state,{revision:0,state:null}),'conflict');
  assert.equal(sync.decide(null,plan.sanitize(null),{revision:0,state:null}),'push');
});
test('an existing cloud journal is adopted on a clean second device',()=>{
  assert.equal(sync.decide(null,plan.sanitize(null),{revision:12,state:plan.sanitize({done:{'1:0:0':true}})}),'adopt');
});
test('backup roundtrip preserves private records and rejects unrelated files',()=>{
  const state=plan.sanitize({notes:'Ghi chú riêng',metrics:{2:{weight:75.2,waist:90.1}},logs:{'1:0:free:dbPress':{kg:5,reps:10}}});
  const exported=plan.backup(state,'2026-10-26T10:00:00.000Z');
  assert.deepEqual(plan.parseBackup(JSON.stringify(exported)).state,state);
  assert.throws(()=>plan.parseBackup('{"app":"other"}'));
  assert.throws(()=>plan.parseBackup('x'.repeat(2_000_001)));
});
test('unknown exercises and unexpected slots cannot expand saved records',()=>{
  const s=plan.sanitize({logs:{'1:0:free:unknown':{kg:5,reps:10},'1:0:machine:dbPress':{kg:5,reps:10}}});
  assert.deepEqual(s.logs,{});
});
