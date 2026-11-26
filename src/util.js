export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });
}

export async function readJson(request) {
  return request.json().catch(() => ({}));
}

export function methodNotAllowed(method, allowed) {
  return method === allowed ? null : json({ error: `Use ${allowed}.` }, 405);
}
