# CLAUDE.md

@AGENTS.md

## Claude Code specifics

- Project rules (goal, stack, design, SEO, content) live in `AGENTS.md` (imported above). **Don't duplicate**
  them here; if something is a project rule, edit `AGENTS.md`.
- Talk to the user in **English**, briefly. Site copy stays in pt-BR.
- Before building a section, **look at its mockup image** in `design/mockup/`. The mockup is the visual
  reference, but the page structure and conversion rules in `AGENTS.md` win; report deviations in the summary.
- New tasks: start with a short plan and wait for approval.
- Prefer editing existing files; no extra docs or files unless asked.
- Validate with `npm run dev -- --host`; always finish with `npm run build`.
- One section per task; `/clear` between sections to keep context lean.
- Never commit keys, tokens or `.env` files.

## Project memory (update when we decide something new)

- Goal: get visitors to message Viktra on WhatsApp. No lead form for now.
- Footer: keep as is (no blog/other pages yet).
- Fio B: engineers say it's low impact today — config parameter only, no copy around it.
- Placeholder-only sections (testimonials, unanswered FAQ) render in dev only, never in the production build.
- Calculator ships only after `calculatorConfig.validated = true` (engineers' sign-off).
- Baseline (2026-11-26, local preview): Lighthouse mobile 99/100/100/100, LCP ~1.9s, CLS ~0.
- Domain/hosting: _(TBD — Cloudflare Pages or Netlify)_
- Blog URL (separate project): _(TBD)_
- Final Canva fonts: _(confirm Oswald/Montserrat)_
- Analytics tool: _(TBD — prefer cookieless)_
- Open content questions: offer, calculator parameters, real installations/testimonials, legal name,
  single vs two WhatsApp numbers, response time, segments (residential only?), photos and SVG logo.
