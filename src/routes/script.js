// POST /api/script: Writer agent (reads attachments) -> Director agent (builds scenes). Local rules without a key.
import { callClaude, hasClaude } from '../../lib/claude.js';
import { WRITER_PROMPT, directorPrompt } from '../../lib/prompts.js';
import { parseJsonLoose, normaliseScenes } from '../../lib/json.js';
import { buildLocalScenes } from '../../lib/local.js';
import { json, readJson, methodNotAllowed } from '../util.js';

const DOC_TYPES = {
  'image/png': 'image',
  'image/jpeg': 'image',
  'image/webp': 'image',
  'image/gif': 'image',
  'application/pdf': 'document',
};

function attachmentBlocks(mediaFiles) {
  return mediaFiles.map((f) => {
    const kind = DOC_TYPES[f.mimeType];
    if (!kind) throw Object.assign(new Error(`Unsupported attachment type: ${f.mimeType}. Use PDF, PNG, JPG or WebP.`), { status: 400 });
    return { type: kind, source: { type: 'base64', media_type: f.mimeType, data: f.base64Data } };
  });
}

export default async function script(request, env) {
  const bad = methodNotAllowed(request.method, 'POST');
  if (bad) return bad;

  const { textChunk = '', mediaFiles = [], chunkIdx = 0, totalChunks = 1, targetLang = 'en-GB', mentorLang = 'ko-KR', environment = {} } =
    await readJson(request);

  if (!textChunk.trim() && !mediaFiles.length) return json({ error: 'Send text or an attachment.' }, 400);

  if (!hasClaude(env)) return json({ source: 'local', ...buildLocalScenes(textChunk, mentorLang) });

  try {
    let source = textChunk.trim();

    if (mediaFiles.length) {
      const content = attachmentBlocks(mediaFiles);
      content.push({
        type: 'text',
        text: textChunk.trim()
          ? `Attached material for part ${chunkIdx + 1} of ${totalChunks}. Also consider this note: ${textChunk.trim()}`
          : `Attached material for part ${chunkIdx + 1} of ${totalChunks}. Extract the text.`,
      });
      source = (await callClaude(env, { system: WRITER_PROMPT, content, maxTokens: 8000 })).trim();
      if (!source) throw new Error('The Writer agent returned no text');
    }

    const env2 = {
      name: String(environment.name || 'Speech'),
      wpmMin: Number(environment.wpmMin) || 120,
      wpmMax: Number(environment.wpmMax) || 130,
      directive: String(environment.directive || 'like a clear, confident speaker'),
    };
    const directorOut = await callClaude(env, {
      system: directorPrompt({ environment: env2, targetLang, mentorLang, part: chunkIdx + 1, total: totalChunks }),
      content: [{ type: 'text', text: `SOURCE CONTENT (part ${chunkIdx + 1}/${totalChunks}):\n\n${source}` }],
      maxTokens: 12000,
    });
    return json({ source: 'claude', ...normaliseScenes(parseJsonLoose(directorOut)) });
  } catch (err) {
    const status = err.status || 502;
    console.error('script failed:', err.message);
    return json(
      { error: status === 400 ? err.message : 'The AI agents could not build this part. Try again or shorten the script.' },
      status,
    );
  }
}
