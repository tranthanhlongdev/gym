/* Shared plan rules. Dates use UTC so the same week appears on every device. */
const GymPlan = (() => {
  const START = Date.UTC(2026, 9, 26);
  const phases = [
    {name:'Học kỹ thuật & tạo nhịp',main:2,accessory:1,rir:'3–4',upperCardio:'5–10',lowerCardio:'5–10',walk:'15–20',focus:'Chọn tải nhẹ. Buổi đầu có thể chỉ 1 hiệp/bài nếu chưa quen. Chưa cần tăng tạ.'},
    {name:'Tăng khối lượng có kiểm soát',main:3,accessory:2,rir:'2–3',upperCardio:'10–15',lowerCardio:'10',walk:'20–30',focus:'Chỉ thêm hiệp khi đã hồi phục. Giữ kỹ thuật và ghi lại mức tạ, số lần của hiệp làm việc cuối.'},
    {name:'Tích lũy sức mạnh',main:3,accessory:2,rir:'2–3',upperCardio:'15',lowerCardio:'10–15',walk:'25–35',focus:'Giữ số hiệp, tăng số lần trước. Chỉ tăng nấc tạ nhỏ nhất khi đạt đầu trên khoảng lần ở mọi hiệp.'},
    {name:'Củng cố & đối chiếu kết quả',main:3,accessory:2,rir:'2–3',upperCardio:'15–20',lowerCardio:'10–15',walk:'30–40',focus:'So với tuần 1 bằng kỹ thuật tương đương. Không thử tạ tối đa hay ép ăn ít để chạy theo số cân cuối kỳ.'}
  ];
  const days = [
    {short:'Thứ 2',title:'Ngực, vai & tay sau',tag:'Push',type:'upper',mins:'40–60',free:['dbPress','cableFly','lateral','pushdown'],machine:['chestMachine','pecDeck','lateralMachine','pushdown']},
    {short:'Thứ 3',title:'Lưng, xô & tay trước',tag:'Pull',type:'upper',mins:'45–60',free:['pulldown','row','facePull','hammer'],machine:['pulldown','machineRow','reverseDeck','machineCurl']},
    {short:'Thứ 4',title:'Chân, mông & bụng A',tag:'Legs A',type:'lower',mins:'45–65',free:['goblet','rdl','bridge','calf','deadbug'],machine:['legPress','legCurl','bridge','calfMachine','deadbug']},
    {short:'Thứ 5',title:'Thân trên cân bằng',tag:'Upper',type:'upper',mins:'50–70',free:['incline','seatedRow','pulldown','pushdown','hammer'],machine:['inclineMachine','machineRow','pulldown','pushdown','machineCurl']},
    {short:'Thứ 6',title:'Chân, mông & bụng B',tag:'Legs B',type:'lower',mins:'45–65',free:['rdl','goblet','bridge','calf','deadbug'],machine:['legCurl','legPress','bridge','calfMachine','deadbug']},
    {short:'Thứ 7',title:'Nghỉ & phục hồi',tag:'Rest day',type:'rest',free:[],machine:[]},
    {short:'Chủ nhật',title:'Nghỉ & nạp năng lượng',tag:'Rest day',type:'rest',free:[],machine:[]}
  ];
  const mainExercises = new Set(['dbPress','chestMachine','incline','inclineMachine','row','machineRow','pulldown','seatedRow','goblet','rdl','legPress','legCurl']);
  const phase = week => phases[Math.floor((Math.max(1,Math.min(8,week))-1)/2)];
  const date = (week,day=0) => new Date(START+((week-1)*7+day)*86400000);
  const formatDate = d => `${d.getUTCDate()}/${d.getUTCMonth()+1}`;
  const range = week => `${formatDate(date(week))} – ${formatDate(date(week,6))}/2026`;
  const sets = (week,id) => mainExercises.has(id)?phase(week).main:phase(week).accessory;
  const rest = id => mainExercises.has(id)?'90–150 giây':'60–90 giây';
  const reps = id => ['deadbug'].includes(id)?'6–8 / bên':id==='row'?'8–12 / bên':['calf','calfMachine','bridge','lateral','lateralMachine','facePull','reverseDeck'].includes(id)?'12–15':'8–12';
  const cardio = (week,day) => days[day].type==='upper'?phase(week).upperCardio:days[day].type==='lower'?phase(week).lowerCardio:phase(week).walk;
  const count = day => days[day].type==='rest'?0:days[day].type==='walk'?1:days[day].free.length+1;
  const weeklyCount = () => days.reduce((n,_,day)=>n+count(day),0);
  const key = (week,day,item) => `${week}:${day}:${item}`;
  const logKey = (week,day,mode,id) => `${week}:${day}:${mode}:${id}`;
  const protein = weight => ({min:Math.round(weight*1.6),max:Math.round(weight*2)});
  const chicken = grams => ({protein:Math.round(grams*28.98/100),kcal:Math.round(grams*151/100)});
  function number(value,min,max) {const n=Number(value);return value!==''&&value!==null&&Number.isFinite(n)&&n>=min&&n<=max?n:null;}
  function sanitize(saved) {
    const s={week:1,day:0,mode:'machine',done:{},logs:{},metrics:{},notes:'',chicken:300,profile:{weight:74,waist:null,kcal:2300}};
    if(!saved||typeof saved!=='object')return s;
    s.week=Number.isInteger(saved.week)&&saved.week>=1&&saved.week<=8?saved.week:1;
    s.day=Number.isInteger(saved.day)&&saved.day>=0&&saved.day<=6?saved.day:0;
    s.mode=saved.mode==='free'?'free':'machine';
    s.notes=typeof saved.notes==='string'?saved.notes.slice(0,2000):'';
    s.chicken=number(saved.chicken,100,500)??300;
    s.profile={weight:number(saved.profile?.weight,30,250)??74,waist:number(saved.profile?.waist,40,200),kcal:number(saved.profile?.kcal,1500,4000)??2300};
    for(const [k,v] of Object.entries(saved.done||{})) {
      const match=/^([1-8]):([0-6]):([0-9]+)$/.exec(k);
      if(match&&Number(match[3])<count(Number(match[2]))&&v===true)s.done[k]=true;
    }
    for(const [k,v] of Object.entries(saved.logs||{})){const m=/^([1-8]):([0-6]):(free|machine):([A-Za-z]+)$/.exec(k);if(m&&days[Number(m[2])][m[3]].includes(m[4])&&v&&typeof v==='object')s.logs[k]={kg:number(v.kg,0,300),reps:number(v.reps,1,50)};}
    for(let w=1;w<=8;w++){const m=saved.metrics?.[w];if(m)s.metrics[w]={weight:number(m.weight,30,250),waist:number(m.waist,40,200)};}
    return s;
  }
  function completed(done,week,day){return Array.from({length:count(day)},(_,i)=>done[key(week,day,i)]===true?1:0).reduce((a,b)=>a+b,0);}
  function backup(state,savedAt=new Date().toISOString()){return {app:'nhip-tap',version:1,savedAt,state:sanitize(state)};}
  function parseBackup(text){
    if(typeof text!=='string'||text.length>2_000_000)throw new Error('File quá lớn hoặc không hợp lệ.');
    let data;try{data=JSON.parse(text);}catch{throw new Error('File không phải JSON hợp lệ.');}
    if(!data||data.app!=='nhip-tap'||data.version!==1||!data.state||typeof data.state!=='object'||Array.isArray(data.state))throw new Error('Đây không phải bản sao lưu Nhịp Tập được hỗ trợ.');
    if(typeof data.savedAt!=='string'||Number.isNaN(Date.parse(data.savedAt)))throw new Error('Ngày sao lưu không hợp lệ.');
    return {savedAt:data.savedAt,state:sanitize(data.state)};
  }
  return {phases,days,phase,date,formatDate,range,sets,rest,reps,cardio,count,weeklyCount,key,logKey,protein,chicken,number,sanitize,completed,backup,parseBackup};
})();
if(typeof module!=='undefined')module.exports=GymPlan;
