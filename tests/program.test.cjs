const test=require('node:test');
const assert=require('node:assert/strict');
const plan=require('../program.js');

test('eight weeks cross month boundaries without timezone drift',()=>{
  assert.equal(plan.date(1).toISOString(),'2026-10-26T00:00:00.000Z');
  assert.equal(plan.date(1,6).toISOString(),'2026-11-01T00:00:00.000Z');
  assert.equal(plan.date(8,6).toISOString(),'2026-12-20T00:00:00.000Z');
});
test('five resistance evenings include two lower-body days and two weekend rests',()=>{
  assert.equal(plan.days.filter(d=>d.type==='rest').length,2);
  assert.deepEqual(plan.days.flatMap((d,i)=>d.type==='lower'?[i]:[]),[2,4]);
  for(const d of plan.days.slice(0,5)){
    assert.ok(d.free.length>=4);
    assert.equal(d.free.length,d.machine.length);
  }
});
test('progress is scoped by week and uses actual session lengths',()=>{
  assert.equal(plan.weeklyCount(),28);
  const done={};done[plan.key(1,0,0)]=true;done[plan.key(1,4,5)]=true;
  assert.equal(plan.completed(done,1,0),1);
  assert.equal(plan.completed(done,2,0),0);
  assert.equal(plan.completed(done,1,4),1);
  assert.equal(plan.count(5),0);
});
test('invalid stored measurements and stale completion slots are discarded',()=>{
  const s=plan.sanitize({week:99,day:-1,mode:'bad',done:{'1:0:0':true,'1:0:7':true,'0-0':true},profile:{weight:-1,waist:999,kcal:2300},logs:{'1:0:free:dbPress':{kg:7.5,reps:8}},metrics:{1:{weight:75.2,waist:90.1}}});
  assert.equal(s.week,1);assert.equal(s.day,0);assert.equal(s.mode,'machine');
  assert.deepEqual(s.done,{'1:0:0':true});
  assert.equal(s.profile.waist,null);
  assert.deepEqual(s.logs['1:0:free:dbPress'],{kg:7.5,reps:8});
  assert.deepEqual(s.metrics[1],{weight:75.2,waist:90.1});
});
test('cooked chicken reference and protein range use cooked grams and bodyweight',()=>{
  assert.deepEqual(plan.chicken(100),{protein:29,kcal:151});
  assert.deepEqual(plan.chicken(300),{protein:87,kcal:453});
  assert.deepEqual(plan.protein(74),{min:118,max:148});
});
test('later weeks add working sets while accessories remain bounded',()=>{
  assert.equal(plan.sets(1,'dbPress'),2);
  assert.equal(plan.sets(1,'lateral'),1);
  assert.equal(plan.sets(3,'dbPress'),3);
  assert.equal(plan.sets(8,'lateral'),2);
});
