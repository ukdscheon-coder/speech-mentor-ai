import {json} from '../util.js';
export default async function authConfig(request,env){
 if(request.method!=='GET')return json({error:'Use GET.'},405);
 if(!env.SUPABASE_URL||!env.SUPABASE_ANON_KEY)return json({error:'Authentication not configured.'},503);
 return json({url:env.SUPABASE_URL.replace(/\/$/,''),anonKey:env.SUPABASE_ANON_KEY});
}