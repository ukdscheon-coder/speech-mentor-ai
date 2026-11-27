# SEO audit, speech-mentor-ai.com

Date: 27/11/2026. Scope: the single page served at https://speech-mentor-ai.com/.

## Found and fixed in this change

- Missing meta description. Added, in English, describing the product and its seven languages.
- Missing canonical URL. Added `https://speech-mentor-ai.com/`.
- No social share tags. Added Open Graph and Twitter card tags.
- No robots.txt or sitemap. Added `public/robots.txt` and `public/sitemap.xml`.

## Found, not yet fixed

1. The page is a client-rendered app. Most visible text is built by JavaScript after load. Search engines can render it, but a crawler that reads only the first HTML response sees little copy. Fix: add a static, crawlable landing section (the copy in 03-landing-copy.md is written for this).
2. One URL for seven languages. Search results cannot show a Japanese or German page for a Japanese or German query. Fix: separate crawlable URLs per language (for example /ja/, /de/), each with its own title, description and hreflang tags. This is a structural change and needs a decision first.
3. No structured data. Fix: add SoftwareApplication JSON-LD. Added in this change (see index.html head).
4. `lang="ko"` on the root element. Correct for the default Korean UI, but a multilingual site needs the lang set per language version (see item 2).
5. Page speed. The page loads Tailwind from a CDN and Lucide from unpkg at runtime. Both work, but a build step would reduce load time and avoid a runtime dependency. Not urgent.

## Keyword themes to target (to validate with a keyword tool)

Search volumes were not checked in this session, so no numbers are given. Validate before writing long articles:
- speech practice app, public speaking practice, speech rehearsal app
- teleprompter app, free teleprompter, presentation teleprompter
- AI speech coach, AI presentation feedback
- Themes that match each language, such as 발표 연습 앱 (Korean), スピーチ 練習 (Japanese), 演讲 练习 (Chinese).

Verification needed: confirm in Google Search Console after indexing that the site appears for brand and theme queries.
