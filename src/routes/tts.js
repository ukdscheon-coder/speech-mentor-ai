// POST /api/tts: neural voice proxy (Gemini TTS). The key stays in the Worker. The client falls back to browser voices.
import { json, readJson, methodNotAllowed } from '../util.js';

const MODEL = 'gemini-2.5-flash-preview-tts';

export default async function tts(request, env) {
  const bad = methodNotAllowed(request.method, 'POST');
  if (bad) return bad;
  if (!env.GEMINI_API_KEY) return json({ error: 'Neural voice is not configured.' }, 503);

  const { prompt = '', voiceName = 'Charon' } = await readJson(request);
  if (!prompt.trim()) return json({ error: 'Send a prompt.' }, 400);

  const upstream = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY },
    body: JSON.stringify({
      contents: [{ parts: [{ text: String(prompt).slice(0, 4000) }] }],
      generationConfig: {
        responseModalities: ['AUDIO'],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: String(voiceName) } } },
      },
    }),
  });
  if (!upstream.ok) return json({ error: `Neural voice failed (${upstream.status}).` }, 502);

  const data = await upstream.json();
  const part = data?.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
  if (!part?.inlineData?.data) return json({ error: 'No audio returned.' }, 502);

  const rate = String(part.inlineData.mimeType || '').match(/rate=(\d+)/);
  return json({ audio: part.inlineData.data, sampleRate: rate ? parseInt(rate[1], 10) : 24000 });
}
