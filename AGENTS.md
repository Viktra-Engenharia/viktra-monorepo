# AGENTS.md — Viktra landing page

Conversion landing page for **Viktra** (solar PV installation; secondarily batteries and electrical work —
São Carlos, SP; serves SP and GO).

**Single goal: get the visitor to start a WhatsApp conversation with Viktra.** Every section is judged by one
question: *does this bring the visitor closer to messaging us on WhatsApp?* If not, it shrinks, moves or goes.

Site language: **pt-BR**. Code language (identifiers, components, commits, these docs): **English**.

---

## Audience and channel

- Traffic comes mainly from **Instagram** (bio link, Stories, possibly ads): almost all **mobile**, opened in
  **Instagram's in-app browser** (iOS and Android). Design and test for that first.
- Low intent (they were scrolling, not searching): the page must grab attention in seconds, with short,
  scannable copy, real photos of installations and a short scroll to the first CTA.
- Page headline and offer must match the post/Story/ad that drove the click.
- One link per source with UTMs (`utm_source=instagram`, `utm_medium=bio|stories|ads`, `utm_campaign=...`).
- In-app browser: no `window.open`, no pop-ups, nothing that breaks in webviews; `wa.me` and `tel:` links must
  open correctly on iOS and Android.

## Page structure (in order)

| # | Section | Purpose | Reuses |
|---|---|---|---|
| 1 | `Hero` | Benefit headline + **WhatsApp CTA** | `Hero` (rewritten) |
| 2 | `Calculator` | Quick savings estimate that ends in a WhatsApp message with the inputs pre-filled | new |
| 3 | `HowItWorks` | Remove fear of the process: steps with real lead times | `Etapas` |
| 4 | `SocialProof` | Real installations (city, kWp, savings), authorized testimonials, Google reviews | `Depoimentos` |
| 5 | `AfterSales` | Warranty and after-sales + short credibility block (USP engineers, CREA-SP, years in business) | `PosInstalacao` + `Sobre` (reduced) |
| 6 | `Faq` | Real objections (cloudy days, roof type, approval time, financing, maintenance, warranty) | new |
| 7 | `FinalCta` | Last WhatsApp push + company contact data | `Contato` |
| — | `Footer` | **Keep as is.** No blog/other pages exist yet | `Footer` |

Shrunk or removed: `Produtos` → at most a small "também fazemos" strip; `OndeEstamos` → one line
("atendemos SP e GO" + cities with real installations); `Sobre` → credibility block inside `AfterSales`.

## Conversion rules

- **Primary CTA everywhere: WhatsApp** (`wa.me` with a pre-filled pt-BR message). Repeat it after each major
  section. No sticky bar (removed by decision). No competing CTAs (no blog/social links above the footer).
- WhatsApp messages are built by `getWhatsAppUrl()` in `src/data/site.ts`; vary the message per CTA so the team
  knows where the lead came from (e.g. calculator result includes bill amount, city and connection type).
- **No lead form for now.** WhatsApp is the lead channel. Do not add form backends without asking.
- Headline speaks to the benefit in plain language (e.g. "Reduza sua conta de luz com energia solar em São Carlos").
  Only promise numbers Viktra can back with real installations.
- Speed is part of conversion: keep the page light.

## Savings calculator

- Inputs (minimum): average monthly bill (R$), state/city (SP or GO), connection type (mono/bi/tri).
- Show results **as ranges**, before asking anything: monthly/yearly savings, suggested kWp, approx. panel count,
  payback. Then CTA: "Receber proposta detalhada no WhatsApp" → opens WhatsApp with the inputs and estimate.
- Model (to be calibrated by Viktra's engineers):
  - consumption (kWh/month) = bill ÷ tariff
  - kWp ≈ consumption ÷ (peak sun hours × 30 × system efficiency ~0.75–0.8)
  - savings ≈ (consumption − availability cost of 30/50/100 kWh for mono/bi/tri) × tariff
  - Fio B (Lei 14.300) is **low priority** per the engineers: keep it as an optional config parameter
    (default small/zero), and don't build copy or marketing around it.
- All parameters (tariffs per utility, sun hours, price per kWp, efficiency) live in `src/data/calculator.ts`,
  editable without touching components. Placeholder values must be marked `TODO(conteudo)`.
- Always state the estimate is approximate and the final proposal depends on a site visit.
- Runs fully in the browser (vanilla JS, no backend). Keyboard accessible, labelled inputs, clear errors,
  numeric keyboard on mobile (`inputmode="decimal"`). `<noscript>` fallback: plain WhatsApp CTA.

## Offers and urgency (Brazilian consumer law — CDC)

- Every offer shows its **end date and conditions** on the page. Fixed deadline; never a timer that resets.
- Prefer bonuses (free site visit, 12 months monitoring) over % discounts.
- No fake scarcity. No "install before January because of Fio B" claims.
- Offer data lives in `src/data/offer.ts` (title, description, end date, conditions); expired offers are not rendered.

## Stack (do not add anything without asking)

- **Astro** + **TypeScript strict**; **plain CSS** (variables in `src/styles/global.css` + scoped `<style>`)
- **No client JS by default.** Justified exceptions: calculator,
  measurement events. Vanilla JS only, no frameworks (React/Vue/Svelte), no UI libs, no Tailwind, no jQuery.
- Self-hosted fonts via `@fontsource`; images via `astro:assets` (`<Image />` / `<Picture />`)
- No third-party scripts (analytics, chat, pixels) without explicit request. Measurement: keep a small
  `track(event, data)` helper that is a no-op until an analytics tool is chosen (prefer cookieless: Plausible/Umami).
  Events: hero view, calculator start, result shown, WhatsApp click (with CTA location), phone/e-mail click.

## Commands

```bash
npm run dev -- --host  # dev server (reachable from a phone on the LAN)
npm run build          # production build -> dist/
npm run preview        # serve the build
npx astro check        # type check
```

Run `npm run build` after every relevant change and fix errors/warnings before finishing.

## Structure

```
design/mockup/     # Canva mockup images (desktop only, institutional version — layout/style reference)
public/            # robots.txt, favicon, og-image
src/
  assets/          # optimizable images and SVGs
  components/      # one component per section (see Page structure)
  data/
    site.ts        # SINGLE source for company data (phone, e-mail, address, CNPJ, CREA, socials) + getWhatsAppUrl
    calculator.ts  # calculator parameters
    offer.ts       # current offer (optional)
    faq.ts, testimonials.ts, projects.ts  # typed content arrays
  lib/track.ts     # measurement helper
  layouts/         # BaseLayout.astro (head, SEO, JSON-LD)
  pages/index.astro
  styles/global.css
```

## Design tokens

Defined in `:root` in `global.css`. **Always use the variables**, never raw hex in components.

```css
:root {
  --color-navy:   #0e1e48; /* titles, dark backgrounds, main text */
  --color-orange: #fc4f00; /* CTAs, highlights, icons, bands */
  --color-bg:     #f7f7f7; /* light background */
  --color-white:  #ffffff;
}
```

- Headings: **Oswald** (uppercase, bold). Body: **Montserrat**. (Confirm with Canva.)
- Visual style from the mockup: straight blocks (no big radii), orange bands, orange underline under section
  titles, orange cards with white icons, navy "ECONOMIA" block. Paper texture optional, never at LCP cost.
- WhatsApp buttons may use the brand orange (navy text) — keep one consistent CTA style across the page.
- Spacing and font sizes in variables (`--space-*`, `--text-*`); fluid type with `clamp()`.

### Contrast (approximate — respect it)

| Combination | Ratio | Allowed for |
|---|---|---|
| Navy on `#f7f7f7` | ≈ 15:1 | any text |
| Navy on orange | ≈ 4.8:1 | any text |
| Orange on navy | ≈ 4.8:1 | any text |
| White on orange | ≈ 3.4:1 | **large text only** (≥ 24px, or ≥ 18.66px bold) and icons |
| Orange on `#f7f7f7` | ≈ 3.1:1 | large/decorative elements only, never small text |

## Responsive

- **Mobile-first**: base styles for ~320–390px; scale up with `min-width` (640, 768, 1024, 1280px).
- Content `max-width` ~1200px centered; no horizontal scroll at any width.
- Left-aligned text on mobile (the mockup's justified text only on wide screens, if at all).
- Touch targets ≥ 44×44px.
- Test at 320, 390, 768, 1024, 1440px — and inside Instagram's in-app browser.

## Performance

- Target: **Lighthouse mobile ≥ 95** in all categories; **LCP < 2.5s**; **CLS ≈ 0**.
- Hero image `loading="eager"` + `fetchpriority="high"`; everything else `loading="lazy"`.
- Always set dimensions; AVIF/WebP via Astro; icons and logo as SVG; **never text inside images**.

## SEO (still required — local search matters)

- `<html lang="pt-BR">`; unique `<title>`/`description` about solar energy in São Carlos.
- `canonical`, Open Graph and Twitter Card (the link preview in DMs/Stories matters); OG image in `public/`.
- JSON-LD `LocalBusiness` from `src/data/site.ts` + `FAQPage` from `src/data/faq.ts`.
- `@astrojs/sitemap` + `public/robots.txt`; `site` set in `astro.config.mjs`.
- **Exactly one `<h1>`** (hero); no skipped heading levels; semantic HTML; descriptive `alt` (`alt=""` if decorative).

## Accessibility

- Keyboard navigation and visible focus on everything interactive.
- Real `<button>`/`<a>` elements; `aria-label` on icon-only links.
- Respect `prefers-reduced-motion`. FAQ via `<details>/<summary>`. Carousels via CSS `scroll-snap`.

## Content honesty and LGPD

- **Never invent** numbers, testimonials, names, certifications, prices, deadlines or savings percentages.
- Company data only in `src/data/site.ts`; components never hardcode phone/e-mail/address.
- Mockup placeholders ("Monitoramento em um frase", "aaaa…", repeated lorem, empty logo boxes) never ship:
  mark gaps with `TODO(conteudo): description`.
- Fix mockup typos: "PROBRIA" → "PRÓPRIA", "Direiros" → "Direitos", "Eletrica" → "Elétrica"; copyright year automatic.
- Photos/testimonials of people only with authorization; keep them easy to swap.
- Be honest about response time ("respondemos no WhatsApp em até X") — only once Viktra defines X.

## Code

- One component per section, `PascalCase`, typed props; repeated content in typed arrays in `src/data/`.
- CSS classes in semantic `kebab-case`; no `!important`; no inline styles.
- No new dependencies without approval. Comments only where the "why" isn't obvious.

## Workflow

1. Read this file and the relevant mockup in `design/mockup/` before writing code.
2. Larger tasks: propose a short plan and wait for approval.
3. One section at a time, mobile-first, without touching files outside the scope.
4. Run `npm run build` (and `npx astro check`) with no errors.
5. When done: summarize changes, mockup deviations, and pending `TODO(conteudo)` items.
6. Small commits, Conventional Commits (`feat:`, `fix:`, `style:`, `chore:`, `docs:`).
7. When unsure about content, design or scope: **ask**, don't assume.
