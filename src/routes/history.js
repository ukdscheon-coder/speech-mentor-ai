import { json, readJson } from '../util.js';
import { requireUser, userHeaders } from '../auth.js';
export default async function history(request, env) {
 if(!['GET','POST'].includes(request.method))return json({error:'Use GET or POST.'},405);
 const auth=await requireUser(request,env);if(auth.error)return auth.error;
 const base=env.SUPABASE_URL.replace(/\/$/,'')+'/rest/v1/practice_attempts';
 if(request.method==='POST'){
  const b=await readJson(request);
  const row={user_id:auth.user.id,scene_title:String(b.sceneTitle||'').slice(0,200),spoken:String(b.spoken||'').slice(0,4000),wpm:Math.max(0,Math.min(400,Math.round(Number(b.wpm)||0))),energy:String(b.energy||'').slice(0,40),feedback:String(b.feedback||'').slice(0,1200)};
  const res=await fetch(base,{method:'POST',headers:userHeaders(env,auth.token,{prefer:'return=minimal'}),body:JSON.stringify(row)});
  return res.ok?json({saved:true},201):json({error:'Unable to save practice.'},502);
 }
 const q=new URLSearchParams({select:'created_at,scene_title,wpm,energy,feedback',user_id:'eq.'+auth.user.id,order:'created_at.desc',limit:'20'});
 const res=await fetch(base+'?'+q,{headers:userHeaders(env,auth.token)});
 return res.ok?json({attempts:await res.json()}):json({error:'Unable to load history.'},502);
}