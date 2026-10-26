(function(root,factory){
  const core=factory(typeof module!=='undefined'&&module.exports?require('./program.js'):GymPlan);
  if(typeof module!=='undefined'&&module.exports)module.exports=core;else root.GymSyncCore=core;
})(typeof globalThis!=='undefined'?globalThis:this,function(Plan){
  function snapshot(state){return {...Plan.sanitize(state),week:1,day:0,mode:'machine'};}
  function sorted(value){if(Array.isArray(value))return value.map(sorted);if(value&&typeof value==='object')return Object.fromEntries(Object.keys(value).sort().map(k=>[k,sorted(value[k])]));return value;}
  const text=state=>JSON.stringify(sorted(snapshot(state)));
  function meaningful(raw){const s=Plan.sanitize(raw);return Object.values(s.done).some(Boolean)||Object.values(s.logs).some(v=>v.kg!==null||v.reps!==null)||Object.values(s.metrics).some(v=>v.weight!==null||v.waist!==null)||!!s.notes||s.profile.waist!==null;}
  function decide(meta,local,remote){
    if(meta?.dirty){if(meta.revision===remote.revision)return 'push';return 'conflict';}
    if(remote.state===null)return meaningful(local)?'conflict':'push';
    if(meta)return 'adopt';
    return meaningful(local)&&text(local)!==text(remote.state)?'conflict':'adopt';
  }
  return {snapshot,text,meaningful,decide};
});
