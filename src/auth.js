import { json } from './util.js';

// Supabase Auth verifies each user's access token; never trust a client-supplied user ID.
export async function requireUser(request, env) {
  if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) return { error: json({error:'Authentication is not configured.'},503) };
  const token = (request.headers.get('authorization') || '').match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) return { error: json({error:'Sign in to continue.'},401) };
  const response = await fetch(env.SUPABASE_URL.replace(/\/$/,'') + '/auth/v1/user', {
    headers: { apikey: env.SUPABASE_ANON_KEY, authorization: 'Bearer ' + token }
  });
  if (!response.ok) return { error: json({error:'Session expired or invalid.'},401) };
  const user = await response.json();
  if (!user.id) return { error: json({error:'Invalid session.'},401) };
  return { user, token };
}
export function userHeaders(env, token, extra={}) {
  return {apikey:env.SUPABASE_ANON_KEY, authorization:'Bearer '+token, 'content-type':'application/json',...extra};
}
