// /api/history: saves practice attempts to Supabase (Postgres via PostgREST). Service key stays in the Worker.
import { json, readJson, methodNotAllowed } from '../util.js';

function configured(env) {
  return Boolean(env.SUPABASE_URL && env.SUPABASE_SERVICE_KEY);
}

function headers(env, extra = {}) {
  return {
    apikey: env.SUPABASE_SERVICE_KEY,
    authorization: `Bearer ${env.SUPABASE_SERVICE_KEY}`,
    'content-type': 'application/json',
    ...extra,
  };
}

export default async function history(request, env) {
  if (!configured(env)) return json({ error: 'History is not configured.' }, 503);
  const base = `${env.SUPABASE_URL.replace(/\/$/, '')}/rest/v1/practice_attempts`;

  if (request.method === 'POST') {
    const b = await readJson(request);
    const row = {
      scene_title: String(b.sceneTitle || '').slice(0, 200),
      spoken: String(b.spoken || '').slice(0, 4000),
      wpm: Math.max(0, Math.min(400, Math.round(Number(b.wpm) || 0))),
      energy: String(b.energy || '').slice(0, 40),
      feedback: String(b.feedback || '').slice(0, 1200),
    };
    const res = await fetch(base, { method: 'POST', headers: headers(env, { prefer: 'return=minimal' }), body: JSON.stringify(row) });
    if (!res.ok) return json({ error: `Supabase write failed (${res.status}).` }, 502);
    return json({ saved: true }, 201);
  }

  if (request.method === 'GET') {
    const res = await fetch(`${base}?select=created_at,scene_title,wpm,energy,feedback&order=created_at.desc&limit=20`, {
      headers: headers(env),
    });
    if (!res.ok) return json({ error: `Supabase read failed (${res.status}).` }, 502);
    return json({ attempts: await res.json() });
  }

  return methodNotAllowed(request.method, 'POST');
}
