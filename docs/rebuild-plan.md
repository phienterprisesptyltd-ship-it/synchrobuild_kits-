# SynchroBuild Kits — Astro Rebuild: Migration Plan

Branch: `rebuild/astro-site`. This document is written before any rebuild code, per the audit-first requirement.

## 1. Why rebuild (not just re-skin)

The current `apps/web` is a Vite + React SPA (`Hostinger Horizons` scaffold). Its `index.html` ships an
empty `<div id="root">` — all real content (headings, floor plan copy, inclusions, testimonials) is
injected client-side by React after JS executes. That's the core problem for SEO/AEO/GEO: crawlers and
answer engines that don't fully execute JS see almost nothing in the initial HTML. A large fraction of the
codebase (`apps/web/plugins/visual-editor/**`, `session-journal`, `selection-mode`, the Horizons error
postMessage shims in `vite.config.js`) is also platform tooling for Hostinger's live in-browser editor —
not application logic, and not something a rebuild should carry forward.

The rebuild target is Astro: HTML is generated per-page at build time (crawlable by default), and
JavaScript is opt-in per component (`client:*` islands or plain `<script>`), used only where a page is
genuinely interactive (chat widget, inquiry form, image galleries, mobile nav).

## 2. What's being preserved (real business content)

Everything below is copied verbatim from the current site into the new content architecture — none of it
is being reworded or invented.

**Business identity**
- Name: Synchro Build / SynchroBuild Kits, family-owned, Australian, operating since 2007
- Phone: `02 5760 1059` (Mon–Fri 8am–6pm AEST)
- Emails: `info@synchrobuild.com.au` (general/inquiries), `sales@synchrobuild.com.au` (order confirmations, from the PocketBase mailer hook)
- Logo: currently hosted at `horizons-cdn.hostinger.com` (no local copy exists in the repo — see §5)
- Model: **supply-only** — engineering + materials for owner-builders/contractors, not full construction

**Floor plans** — all 7 entries in `apps/web/src/data/floorPlans.js`, migrated 1:1 (id, name, description,
type, beds, baths, features, image, customImages). No square-meter data exists in the source for any plan;
the detail page already renders "TBA" for that field — carried forward as-is, not invented.

**Process content**
- 5-stage supply process (Design → Quotation → Approval & Deposit → Manufacturing → Delivery), with full
  descriptions and detail bullets, from `ProcessPage.jsx`
- 5-step design process (Pay fee → Interview → First design → Changes → Price kit), from
  `HomePage.jsx` / `DesignServicesPage.jsx`

**Inclusions / exclusions** (two related but distinct structures — kept distinct, not merged):
- `InclusionsPage.jsx`: 13-part numbered kit breakdown (steel frame, roof, cladding, windows/doors,
  insulation, internal lining, internal doors, robes, steel floor, design/doc, optional upgrades, common
  exclusions)
- `SupplyAccordion.jsx` + `CommonExclusions.jsx` (used on the Packages/"Explore Supply Options" page):
  lock-up kit / internal lining / steel floor / design support / quality-warranty accordion, plus a
  36-item common-exclusions grid

**Design pricing calculator** — `EstimateYourKitInvestment.jsx`: 1BR $395 / 2BR $445 / 3BR $495 (marked
popular) base packages + $30/extra room, "100% credited toward kit order" messaging. Real, structured data
— migrated as-is into the content layer so the calculator stays data-driven.

**Testimonials** — all 8 entries from `TestimonialsPage.jsx`, migrated as-is. **Flagged, not fixed**: the
avatar images are generic Unsplash stock headshots, not real customers. These read as placeholder/sample
content, not verified reviews — see §6.

**Gallery/projects** — all 15 project entries from `InspirationGalleryPage.jsx` (image, title, category,
description), consolidated into one `projects` collection since the same handful of images are currently
duplicated by hand across the Home "Featured Projects" section, the gallery, and the Footer "Recent
Projects" — one source of truth means "add a project" only ever happens in one place going forward.

**Legal pages** — Privacy Policy and Terms & Conditions bodies carried over verbatim.

## 3. What's being dropped or replaced

**Dropped — Hostinger e-commerce demo scaffolding, not real SynchroBuild functionality:**
`ProductDetailPage`, `CheckoutPage`, `OrderPage`, `SuccessPage`, `SecureEscrowPage` ("CheckVault" /
"Perpetual Corporate Trust" escrow messaging), `ShoppingCart`, `useCart`, `EcommerceApi.js`. These talk to
a generic Hostinger store ID (`store_01KWK0SW031DGMSYKVPT4SE0J4`) selling unspecified cart "products" —
this contradicts the business's own stated model on `InquiryPage.jsx` ("We focus exclusively on
engineering and supplying premium materials... Supply-Only Model"). There's no real cart/checkout business
here; the actual conversion path is the inquiry form and phone/email. Carrying this forward would just
re-publish a demo flow as if it were a real purchase path.

**Dropped — dead code:** `ThreePathwaysSection.jsx` is not imported by any page in the current site.

**Removed — Horizons platform tooling:** the visual editor, selection-mode, session-journal, and
site-pages dev plugins under `apps/web/plugins/`, and the Horizons-specific error/console postMessage
shims in `vite.config.js`. These exist to let Hostinger's hosted editor manipulate this specific Vite app
live; they have no role in an Astro static build and aren't "the website," they're that platform's tooling.

**Out of scope for this pass:** the `/admin/login` + `/admin/chat` support dashboard. It's an
authenticated internal tool (already secured against the real PocketBase admin auth, per the merged
security fixes), not a public/crawlable page, and doesn't benefit from static generation. It keeps running
on the existing `apps/web`/`apps/api` stack untouched. The public `ChatWidget` (customer-facing) **is**
in scope, since it's part of the public site.

**Replaced — architecture:**
| Current | New |
|---|---|
| Vite + React SPA, all content client-rendered | Astro, static HTML per page at build time |
| Floor plans/testimonials/inclusions as inline JS arrays inside page components | Astro content collections (schema-validated JSON data collections) — editing content never means touching page/layout code |
| Framer Motion scroll-triggered fade/slide on nearly every element | Plain CSS transitions on hover/focus only; content is visible immediately (also fixes real jank/CLS risk, and matches "not overly futuristic, avoid excessive animation") |
| React Router client routing | Astro file-based routing (same URL paths kept, so no link/SEO breakage) |
| Full React + Radix + shadcn/ui runtime shipped on every page | Zero JS by default; small vanilla-JS islands only for chat widget, inquiry form, image gallery/lightbox, accordions, mobile nav |
| No JSON-LD, thin/duplicate `<title>` tags (many pages just say "SynchroBuild") | Per-page unique titles/descriptions, OpenGraph, and JSON-LD (LocalBusiness, Product/Service where relevant) |

## 4. New content architecture (the "AI-maintainable" part)

```
apps/site/src/content/
  floorPlans/*.json        one file per floor plan
  projects/*.json          one file per gallery/portfolio image
  testimonials/*.json      one file per testimonial
  config/
    business.json          phone, emails, hours, nav, logo, social
    designPackages.json    the $395/$445/$495 + $30/room calculator data
    supplyProcess.json     5-stage process
    designProcess.json     5-step design process
    kitInclusions.json     13-part inclusions breakdown
    supplyOptions.json     lock-up/lining/floor accordion + exclusions
```

Each collection has a Zod schema in `src/content/config.ts`, so a malformed entry fails the build with a
clear error instead of silently rendering wrong. This is what makes "add this floor plan" or "add this
testimonial" a safe, mechanical, one-file change that can't accidentally break a page layout.

## 5. Images

No image is being invented. All current imagery is hosted at `horizons-cdn.hostinger.com` (business
photos) or `images.unsplash.com` (testimonial stock avatars). The rebuild references the same URLs
directly rather than inventing placeholders — this preserves the real photos exactly. Downloading and
re-hosting them inside this repo is a reasonable follow-up (removes the external dependency, enables
Astro's image optimization) but isn't required for a working first version and isn't done in this pass.
The site logo has no local file anywhere in the current repo either; same treatment.

## 6. Flagged — needs real business input before this goes live

- **Price inconsistency in the current site itself**: Home/Design Services say the design package is
  **$495** (the 3BR calculator default); `InquiryPage.jsx` separately says "consultation starts from
  **$1,500**." Both are carried forward exactly where they appeared — this is *not* resolved by picking
  one, since that would mean inventing/guessing which is correct.
- **Testimonials are placeholder-shaped**: stock Unsplash headshots, generic names — likely not real
  customer reviews. Kept but flagged; recommend replacing with real customer testimonials (or removing the
  page) before launch.
- **Unverified stats**: "500+ Projects Completed" (Inspiration Gallery), "50-Year BlueScope Steel
  Structural Warranty," "8.8% price-beat guarantee," AS 1684/AS 4100 compliance claims — all pre-existing
  claims on the live site, carried forward as-is, not newly invented. Flagging so the business can confirm
  they're still accurate/current before this ships.
- **No real logo/favicon file** — currently an externally hosted image and the default Vite icon.

## 7. Build order

1. Scaffold `apps/site` (Astro + Tailwind, no UI framework runtime)
2. Content collections + schemas, populated from the audit above
3. Shared layout (Header/Footer/Nav) + design tokens
4. Core pages, in priority order: Home → Floor Plans (index + detail) → Get Started/Inquiry → Process →
   Inclusions → Packages → Testimonials → Design Services → Gallery → Privacy/Terms → 404
5. Interactive islands: chat widget, inquiry form, floor plan gallery/lightbox, accordions, mobile nav
6. SEO metadata + JSON-LD per page
7. `astro build`, fix errors, visual review, iterate
8. Commit to `rebuild/astro-site` (main untouched)
