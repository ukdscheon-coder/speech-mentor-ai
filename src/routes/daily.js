import {json,readJson} from '../util.js';
import {requireUser,userHeaders} from '../auth.js';
const prompts=[
 {id:'clarity',category:'clarity',text:'A clear message is more powerful than a complicated one.',task:'Explain this idea in your own words.'},
 {id:'practice',category:'confidence',text:'Progress begins with one small step.',task:'Describe a small step you took recently.'},
 {id:'listening',category:'audience',text:'Good communication begins with listening.',task:'Give an example from your own experience.'},
 {id:'focus',category:'emphasis',text:'Focus on what matters most.',task:'Explain what matters most in your next presentation.'},
 {id:'learning',category:'reflection',text:'Every mistake can teach us something useful.',task:'Describe something you learned this week.'},
 {id:'preparation',category:'presentation',text:'Preparation makes difficult conversations easier.',task:'Describe a conversation you are preparing for.'},
 {id:'questions',category:'questions',text:'A thoughtful question can change a conversation.',task:'Ask a question that would help your audience.'}
];
export default async function daily(request,env){
 if(request.method==='GET'&&new URL(request.url).searchParams.get('mode')==='prompt'){
  const day=Math.floor(Date.now()/86400000);
  return json({prompt:prompts[day%prompts.length],date:new Date().toISOString().slice(0,10),note:'Original practice prompts. No news articles or third-party speeches reproduced.'});
 }
 if(!['GET','POST'].includes(request.method))return json({error:'Use GET or POST.'},405);
 const a=await requireUser(request,env);if(a.error)return a.error;
 const base=env.SUPABASE_URL.replace(/\/$/,'')+'/rest/v1/daily_practices';
 if(request.method==='GET'){
  const q=new URLSearchParams({select:'id,prompt_id,original_text,rewritten_text,spoken_transcript,duration_seconds,words_per_minute,feedback,created_at',user_id:'eq.'+a.user.id,order:'created_at.desc',limit:'30'});
  const r=await fetch(base+'?'+q,{headers:userHeaders(env,a.token)});
  return r.ok?json({practices:await r.json()}):json({error:'Unable to load practice history.'},502);
 }
 const b=await readJson(request);
 const original=String(b.originalText||'').slice(0,1000),rewrite=String(b.rewrittenText||'').slice(0,4000),spoken=String(b.spokenTranscript||'').slice(0,4000);
 if(!rewrite&&!spoken)return json({error:'Add a rewritten sentence or transcript.'},400);
 const duration=Number(b.durationSeconds);
 const seconds=Number.isFinite(duration)&&duration>0?Math.min(3600,Math.round(duration)):null;
 const wordCount=spoken.trim()?spoken.trim().split(/\s+/).length:0;
 const wpm=seconds&&wordCount?Math.round(wordCount*60/seconds):null;
 const fillers=(spoken.match(/\b(um|uh|erm|like)\b/gi)||[]).length;
 const feedback={word_count:wordCount,filler_count:fillers,measured_wpm:wpm,notes:['This is a transcript-based estimate, not an assessment of pronunciation, confidence, stress or gestures.']};
 const row={user_id:a.user.id,prompt_id:String(b.promptId||'custom').slice(0,100),original_text:original,rewritten_text:rewrite,spoken_transcript:spoken,duration_seconds:seconds,words_per_minute:wpm,feedback};
 const r=await fetch(base,{method:'POST',headers:userHeaders(env,a.token,{prefer:'return=representation'}),body:JSON.stringify(row)});
 return r.ok?json({practice:(await r.json())[0]},201):json({error:'Unable to save daily practice.'},502);
}