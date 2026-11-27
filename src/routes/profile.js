import {json,readJson} from '../util.js';
import {requireUser,userHeaders} from '../auth.js';
export default async function profile(request,env) {
  if (!['GET','POST'].includes(request.method)) return json({error:'Use GET or POST.'},405);
  const auth=await requireUser(request,env);
  if(auth.error) return auth.error;
  const base=env.SUPABASE_URL.replace(/\/$/,'')+'/rest/v1/speech_profiles';
  if(request.method==='GET') {
    const q=new URLSearchParams({select:'id,name,role,purpose,language,goals,created_at,updated_at',user_id:'eq.'+auth.user.id,order:'updated_at.desc',limit:'20'});
    const res=await fetch(base+'?'+q,{headers:userHeaders(env,auth.token)});
    return res.ok?json({profiles:await res.json()}):json({error:'Unable to load profiles.'},502);
  }
  const b=await readJson(request);
  const allowedRoles=['student','employee','founder','educator','other'];
  if(!allowedRoles.includes(b.role)) return json({error:'Choose a valid role.'},400);
  const row={user_id:auth.user.id,name:String(b.name||'My presentation').slice(0,80),role:b.role,purpose:String(b.purpose||'general').slice(0,80),language:String(b.language||'en-GB').slice(0,20),goals:Array.isArray(b.goals)?b.goals.filter(x=>typeof x==='string').slice(0,10).map(x=>x.slice(0,60)):[]};
  const res=await fetch(base,{method:'POST',headers:userHeaders(env,auth.token,{prefer:'return=representation'}),body:JSON.stringify(row)});
  return res.ok?json({profile:(await res.json())[0]},201):json({error:'Unable to save profile.'},502);
}
