/* Supabase Auth + per-user RLS. Only the browser publishable key is used. */
(() => {
  const app=window.NhipTapApp,host=$('#sync-status'),config=window.NHIP_TAP_SUPABASE_CONFIG,core=window.GymSyncCore;
  if(!app||!host)return;
  if(!config||!core||!window.supabase){host.innerHTML='<strong>Chưa tải được đăng nhập.</strong><p>Nhật ký ở máy vẫn dùng được. Kiểm tra kết nối mạng và tải lại trang.</p>';return;}
  const auth=window.supabase.createClient(config.url,config.publishableKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,storageKey:'nhip-tap-supabase-auth'}});
  const PREFIX='nhiptap-supabase-',ACTIVE=PREFIX+'active-user';
  let session=null,revision=0,ready=false,busy=false,dirty=false,conflict=false,pendingRemote=null,lastPayload='',timer=null,sequence=0,epoch=0,initializing=false;
  const requests=new Set();
  function read(key){try{return JSON.parse(localStorage.getItem(key));}catch{return null;}}
  function write(key,value){try{localStorage.setItem(key,JSON.stringify(value));}catch{}}
  function cacheCurrent(){if(session?.user?.id){write(PREFIX+'cache-'+session.user.id,app.getState());write(PREFIX+'meta-'+session.user.id,{revision,dirty});}}
  function clearRequests(){for(const controller of requests)controller.abort();requests.clear();clearTimeout(timer);}
  function status(title,detail,tone='normal'){
    host.classList.toggle('cloud-warning',tone==='warning');
    host.innerHTML=`<div><strong>${escapeText(title)}</strong><p>${escapeText(detail)}</p>${session?`<small>${escapeText(session.user.email||'Tài khoản Supabase')}</small>`:''}</div><div class="cloud-buttons">${session?'<button class="button secondary" id="sync-now">Đồng bộ ngay</button><button class="text-button" id="cloud-history">Bản sao trên database</button><button class="text-button" id="logout-button">Đăng xuất</button>':'<button class="button primary" id="open-login">Đăng nhập / Đăng ký</button><a class="text-button" href="#data-backup">Sao lưu file →</a>'}</div>`;
    if(session){$('#sync-now').onclick=()=>conflict?choose(pendingRemote):!ready?initialize(true):dirty?save():refresh();$('#cloud-history').onclick=history;$('#logout-button').onclick=logout;}
    else $('#open-login').onclick=()=>showAuth('signin');
  }
  function authMessage(error){return ({invalid_credentials:'Email hoặc mật khẩu chưa đúng.',email_not_confirmed:'Hãy mở email xác nhận tài khoản trước khi đăng nhập.',user_already_exists:'Email này đã có tài khoản. Chuyển sang Đăng nhập.',weak_password:'Mật khẩu chưa đủ mạnh. Hãy dùng tối thiểu 8 ký tự.',over_email_send_rate_limit:'Bạn gửi yêu cầu quá nhanh. Vui lòng chờ một lúc rồi thử lại.',email_address_not_authorized:'Dự án chưa cho phép gửi email tới địa chỉ này. Chủ dự án cần kiểm tra cấu hình gửi email trong Supabase.',signup_disabled:'Dự án đang tắt đăng ký tài khoản mới.',email_address_invalid:'Địa chỉ email chưa hợp lệ.'})[error?.code]||'Chưa thực hiện được yêu cầu. Kiểm tra thông tin và thử lại sau.';}
  function showAuth(mode='signin',email=''){
    const signup=mode==='signup',reset=mode==='reset',update=mode==='update';
    modal(update?'Đặt mật khẩu mới':reset?'Lấy lại mật khẩu':signup?'Tạo tài khoản':'Đăng nhập nhật ký','Supabase · đồng bộ trên điện thoại và máy tính',`<form id="auth-form" class="auth-form">${update?'':`<label>Email<input type="email" id="auth-email" autocomplete="email" required value="${escapeText(email)}" placeholder="Email của bạn"></label>`}${reset?'':`<label>${signup||update?'Mật khẩu · tối thiểu 8 ký tự':'Mật khẩu'}<input type="password" id="auth-password" autocomplete="${signup||update?'new-password':'current-password'}" minlength="${signup||update?8:1}" required></label>`}<p id="auth-message" class="auth-message" role="status"></p><button class="button primary" id="auth-submit" type="submit">${update?'Lưu mật khẩu mới':reset?'Gửi email khôi phục':signup?'Đăng ký':'Đăng nhập'}</button></form>${update?'':`<div class="auth-links"><button class="text-button" id="auth-switch">${signup?'Đã có tài khoản? Đăng nhập':'Chưa có tài khoản? Đăng ký'}</button>${reset?'':'<button class="text-button" id="auth-forgot">Quên mật khẩu?</button>'}</div>`}<p class="photo-reference">Dùng cùng một tài khoản trên các thiết bị. Khi chưa đăng nhập, thay đổi chỉ lưu trên trình duyệt hiện tại.</p>`);
    $('#auth-form').onsubmit=async event=>{
      event.preventDefault();const button=$('#auth-submit'),message=$('#auth-message');button.disabled=true;message.textContent='Đang xử lý…';
      const address=$('#auth-email')?.value.trim(),password=$('#auth-password')?.value;
      try{
        if(update){const {error}=await auth.auth.updateUser({password});if(error)throw error;dialog.close();toast('Đã đổi mật khẩu.');return;}
        if(reset){const {error}=await auth.auth.resetPasswordForEmail(address,{redirectTo:config.redirectUrl});if(error)throw error;message.textContent='Nếu email có tài khoản, bạn sẽ nhận được liên kết khôi phục. Kiểm tra cả thư rác.';}
        else if(signup){const {data,error}=await auth.auth.signUp({email:address,password,options:{emailRedirectTo:config.redirectUrl}});if(error)throw error;if(data.session)dialog.close();else message.textContent='Mở email xác nhận tài khoản, sau đó quay lại trang để đăng nhập.';}
        else {const {error}=await auth.auth.signInWithPassword({email:address,password});if(error)throw error;dialog.close();}
      }catch(error){message.textContent=authMessage(error);}finally{if(button.isConnected)button.disabled=false;}
    };
    if($('#auth-switch'))$('#auth-switch').onclick=()=>showAuth(signup||reset?'signin':'signup',$('#auth-email')?.value||'');
    if($('#auth-forgot'))$('#auth-forgot').onclick=()=>showAuth('reset',$('#auth-email')?.value||'');
  }
  async function dataRequest(path,options={}){
    const current=session,currentEpoch=epoch;if(!current)throw new Error('unauthorized');
    const controller=new AbortController();requests.add(controller);const timeout=setTimeout(()=>controller.abort(),15000);
    try{
      const response=await fetch(config.url+'/rest/v1/'+path,{cache:'no-store',...options,signal:controller.signal,headers:{apikey:config.publishableKey,Authorization:'Bearer '+current.access_token,...options.headers}});
      const data=await response.json().catch(()=>null);
      if(currentEpoch!==epoch||current.user.id!==session?.user.id)throw new Error('account_changed');
      if(!response.ok){const error=new Error(data?.message||'network_error');error.status=response.status;error.code=data?.code;throw error;}
      return data;
    }finally{clearTimeout(timeout);requests.delete(controller);}
  }
  async function getRemote(){const rows=await dataRequest('gym_states?select=revision,payload,updated_at&user_id=eq.'+encodeURIComponent(session.user.id)+'&limit=1');const row=rows?.[0];return row&&Number(row.revision)>0?{revision:Number(row.revision),state:GymPlan.sanitize(row.payload),updatedAt:row.updated_at}:{revision:0,state:null,updatedAt:null};}
  function networkFailure(error){
    if(error.message==='account_changed'||error.name==='AbortError'&&!session)return;
    if(['PGRST205','PGRST202'].includes(error.code)){ready=false;status('Đăng nhập được · database chưa cấu hình xong','Nhật ký ở máy vẫn còn. Cần tạo các bảng và hàm đồng bộ trong dự án Supabase rồi thử lại.','warning');}
    else if(error.status===401){ready=false;status('Cần xác nhận lại phiên đăng nhập','Dữ liệu ở máy vẫn còn. Đăng xuất rồi đăng nhập lại để kết nối database.','warning');}
    else status('Chưa đồng bộ được lên Supabase','Dữ liệu ở máy vẫn còn. Kiểm tra mạng rồi bấm Đồng bộ ngay; chưa nên xóa dữ liệu trình duyệt.','warning');
  }
  function adopt(remote){if(remote.state)app.replaceState(remote.state,{preserveView:true});revision=remote.revision;lastPayload=core.text(remote.state||app.getState());dirty=false;conflict=false;pendingRemote=null;ready=true;cacheCurrent();status('Đã đồng bộ với Supabase',`Phiên bản ${revision}. Đăng nhập cùng tài khoản để mở trên thiết bị khác.`);}
  function choose(remote){
    if(!remote)return;ready=true;conflict=true;pendingRemote=remote;status('Cần chọn bản nhật ký để tiếp tục','Chưa có bản nào bị ghi đè. Bấm Đồng bộ ngay để chọn lại khi cần.','warning');
    const local=app.getState(),cloud=GymPlan.sanitize(remote.state),count=s=>Object.values(s.done).filter(Boolean).length;
    modal('Chọn bản dữ liệu để tiếp tục','Bạn có thể tải bản ở máy trước khi chọn',`<p>Ở máy này: ${count(local)} mục hoàn thành. Supabase: ${count(cloud)} mục hoàn thành, phiên bản ${remote.revision}.</p><p style="margin-top:12px">Dùng bản ở máy sẽ gửi nó lên tài khoản đang đăng nhập và thay bản hiện tại trên Supabase. Bản trước đó được giữ trong lịch sử. Nếu thiết bị khác vừa thay đổi, hệ thống sẽ hỏi lại.</p><div class="sync-choice"><button class="button secondary" id="download-conflict">Tải bản ở máy này</button><button class="button primary" id="use-remote">${remote.state?'Dùng bản trên Supabase':'Dùng nhật ký trống'}</button><button class="button secondary" id="use-local">Gửi bản ở máy này lên</button></div>`);
    $('#download-conflict').onclick=app.downloadBackup;
    $('#use-remote').onclick=()=>{if(!remote.state)app.replaceState(GymPlan.sanitize(null),{preserveView:true});adopt(remote);dialog.close();if(!remote.state){lastPayload='';dirty=true;schedule();}};
    $('#use-local').onclick=()=>{revision=remote.revision;lastPayload=remote.state?core.text(remote.state):'';dirty=true;conflict=false;pendingRemote=null;cacheCurrent();dialog.close();save();};
  }
  function schedule(){clearTimeout(timer);timer=setTimeout(save,900);}
  async function save(){
    if(!ready||!session||busy||conflict||!navigator.onLine)return;
    const body=core.snapshot(app.getState()),serialized=core.text(body);if(serialized===lastPayload){dirty=false;cacheCurrent();status('Đã đồng bộ với Supabase',`Phiên bản ${revision}. Không có thay đổi đang chờ gửi.`);return;}
    const started=sequence,currentEpoch=epoch;busy=true;dirty=true;cacheCurrent();status('Đã lưu ở máy · đang gửi lên Supabase…','Giữ trang mở cho tới khi hiện Đã đồng bộ.');
    try{
      const result=await dataRequest('rpc/save_gym_state',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({p_expected_revision:revision,p_payload:body})});
      if(currentEpoch!==epoch)return;
      if(!result?.ok){if(result?.code==='conflict'){choose({revision:Number(result.revision),state:result.state,updatedAt:result.updatedAt});return;}throw new Error('save_failed');}
      revision=Number(result.revision);lastPayload=serialized;dirty=started!==sequence&&core.text(app.getState())!==serialized;cacheCurrent();status(dirty?'Còn thay đổi đang chờ gửi':'Đã đồng bộ với Supabase',`Phiên bản ${revision}. Các thay đổi đã được lưu vào tài khoản của bạn.`);if(dirty)schedule();
    }catch(error){if(currentEpoch===epoch)networkFailure(error);}finally{if(currentEpoch===epoch)busy=false;}
  }
  async function refresh(){
    if(!ready||busy||!session||conflict||!navigator.onLine)return;if(dirty){await save();return;}
    if(/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName||''))return;
    const currentEpoch=epoch;busy=true;
    try{const remote=await getRemote();if(currentEpoch===epoch&&remote.revision!==revision){if(dirty)choose(remote);else adopt(remote);}}catch(error){if(currentEpoch===epoch)networkFailure(error);}finally{if(currentEpoch===epoch){busy=false;if(dirty&&!conflict)schedule();}}
  }
  async function history(){
    if(!session)return;
    try{
      const rows=await dataRequest('gym_state_backups?select=id,revision,created_at&user_id=eq.'+encodeURIComponent(session.user.id)+'&order=revision.desc&limit=10');
      modal('Các bản trước trên Supabase','Giữ tối đa 10 phiên bản trước khi thay đổi',rows.length?`<div class="cloud-backup-list">${rows.map(row=>`<button class="button secondary" data-backup-id="${escapeText(row.id)}">Phiên bản ${Number(row.revision)} · ${escapeText(new Intl.DateTimeFormat('vi-VN',{timeZone:'Asia/Ho_Chi_Minh',dateStyle:'short',timeStyle:'short'}).format(new Date(row.created_at)))}</button>`).join('')}</div><p>Chọn bản để xem trước; dữ liệu hiện tại vẫn giữ cho tới khi bạn xác nhận khôi phục.</p>`:'<p>Chưa có bản cũ. Sau mỗi lần thay đổi, bản trước đó sẽ được giữ tại đây.</p>');
      $$('[data-backup-id]').forEach(button=>button.onclick=async()=>{try{const row=(await dataRequest('gym_state_backups?select=payload,created_at&id=eq.'+encodeURIComponent(button.dataset.backupId)+'&user_id=eq.'+encodeURIComponent(session.user.id)+'&limit=1'))?.[0];if(!row)throw new Error('not_found');app.previewRestore(GymPlan.parseBackup(JSON.stringify({app:'nhip-tap',version:1,savedAt:row.created_at,state:row.payload})));}catch{toast('Không đọc được bản sao.');}});
    }catch(error){networkFailure(error);}
  }
  async function initialize(force=false){
    if(!session||initializing&&!force)return;const currentEpoch=epoch,uid=session.user.id;initializing=true;ready=false;status('Đang kết nối nhật ký Supabase…','Đang kiểm tra phiên bản trước khi gửi hoặc tải dữ liệu.');
    try{
      const active=read(ACTIVE),cached=read(PREFIX+'cache-'+uid),meta=read(PREFIX+'meta-'+uid);
      if(active&&active!==uid){if(cached)app.replaceState(cached,{preserveView:true});else if(active!=='guest')app.replaceState(GymPlan.sanitize(null),{preserveView:true});}
      write(ACTIVE,uid);
      const beforeSequence=sequence,remote=await getRemote();if(currentEpoch!==epoch)return;revision=remote.revision;
      if((beforeSequence!==sequence||dirty)&&remote.state&&core.text(app.getState())!==core.text(remote.state)){choose(remote);return;}
      const decision=core.decide(meta,app.getState(),remote);
      if(decision==='conflict')choose(remote);else if(decision==='push'){lastPayload=remote.state?core.text(remote.state):'';ready=true;dirty=true;cacheCurrent();await save();}else adopt(remote);
    }catch(error){if(currentEpoch===epoch)networkFailure(error);}finally{if(currentEpoch===epoch)initializing=false;}
  }
  async function logout(){if(dirty&&!conflict)await save();cacheCurrent();const {error}=await auth.auth.signOut({scope:'local'});if(error)toast('Chưa đăng xuất được. Hãy thử lại.');}
  function handleSession(next,event){
    if(next?.user.id===session?.user.id&&next){session=next;if(!ready&&!initializing&&event==='SIGNED_IN')initialize();return;}
    if(session)cacheCurrent();clearRequests();epoch++;busy=false;initializing=false;ready=false;conflict=false;pendingRemote=null;
    const old=session,pendingChanges=dirty;session=next;
    if(!next){dirty=false;revision=0;lastPayload='';const bound=read(ACTIVE);if(old||bound&&bound!=='guest'){if(!old)write(PREFIX+'cache-'+bound,app.getState());app.replaceState(GymPlan.sanitize(null),{preserveView:true});write(ACTIVE,'guest');}status('Đăng nhập để giữ nhật ký khi đổi máy','Khi chưa đăng nhập, dữ liệu chỉ lưu ở trình duyệt. Dùng cùng tài khoản Supabase trên các thiết bị.');return;}
    dirty=old?false:pendingChanges;initialize();
  }
  document.addEventListener('nhiptap:changed',()=>{sequence++;dirty=true;if(!session)return;cacheCurrent();if(ready&&!conflict){status('Đã lưu ở máy · đang chờ đồng bộ','Giữ trang mở tới khi hiện Đã đồng bộ với Supabase.');schedule();}});
  auth.auth.onAuthStateChange((event,next)=>{setTimeout(()=>{handleSession(next,event);if(event==='PASSWORD_RECOVERY')showAuth('update');},0);});
  window.addEventListener('online',()=>session?(ready?(dirty?save():refresh()):initialize(true)):null);
  window.addEventListener('focus',()=>{if(ready)refresh();});
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&ready)refresh();});
  setInterval(()=>{if(document.visibilityState==='visible'&&ready)refresh();},30000);
  status('Đang kiểm tra đăng nhập…','Nhật ký ở máy vẫn được giữ.');
  auth.auth.getSession().then(({data,error})=>{if(error){status('Chưa đọc được phiên đăng nhập','Bạn có thể tiếp tục dùng và sao lưu dữ liệu ở máy.','warning');return;}handleSession(data.session,'INITIAL_SESSION');});
})();
