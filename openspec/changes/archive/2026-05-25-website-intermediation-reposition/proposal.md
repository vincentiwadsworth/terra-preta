# Change Proposal: Website Intermediation Reposition

**Change:** `website-intermediation-reposition`  
**Date:** 2026-05-25  
**Phase:** Propose  

---

## Intent

Terra Preta's website currently misrepresents the company as a producer rather than an export intermediation business. This proposal repositions all messaging from "we produce" to "we coordinate, verify, and export" — aligning the site with the actual business model where Terra Preta sources from competitive certified producers on a per-buyer basis, with no fixed producer partnerships. The repositioning draws on proven patterns from successful intermediaries (Adely Eco Nusantara, Lubembo, Exofusion) that explicitly state their intermediary role while using traceability and compliance coordination as their primary value proposition.

---

## Scope

### In Scope
- **Copy changes** across all 7 existing sections to remove producer-implying language
- **Data layer updates** (`site.ts`, `products.ts`) to reflect intermediation messaging
- **New "How We Work" section** showing the 4-step coordination workflow
- **Section reordering** to place workflow and product earlier in the page
- **Certification ownership clarification** — who holds certs vs. who verifies them
- **BioFood SRL removal** from all copy (not a fixed partner)
- **Trust signal additions** — traceability documentation example, export registration note
- **Structured data update** — Organization schema reflects intermediation role

### Out of Scope
- Adding new products beyond freeze-dried açaí powder
- Building a downloadable PDF traceability report (future phase)
- SEO migration strategy (monitored post-change, not pre-emptive)
- Multi-language support (site remains English-only for now)
- Backend/CRM integration for inquiry forms
- Design system changes — existing Tailwind tokens and component architecture stay

---

## Approach

### Messaging Framework: "Sourcing Partner & Export Coordinator"

Adopt the **Adely Eco Nusantara model** as the primary reference: lead with explicit role clarity ("we are not the producer"), then define the actual value (coordination, compliance, traceability). This prevents buyer confusion from the first page load.

**Core messaging pillars:**

| Pillar | Message | Evidence |
|--------|---------|----------|
| **Role Clarity** | We coordinate, we don't produce | "How We Work" workflow section |
| **Compliance Management** | EU Organic import docs handled for you | Certification section with ownership note |
| **Traceability** | Full documentation from harvest to export | Origin section with example sourcing locations |
| **Flexibility** | Producer selection per season, per buyer | Export section copy |

### Structural Changes

1. **Add "How We Work" section** between Hero and Product — 4 steps: Requirements → Producer Matching → Verification → Export
2. **Reorder sections:** Hero → How We Work → Product → Origin → Certifications → Export → SocialProof → Contact
3. **Add traceability info box** in Certifications section clarifying who holds certifications
4. **Add export registration note** in Footer

### What Stays
- Visual design system (colors, typography, Tailwind tokens)
- Component architecture (`SectionHeading`, `SectionLayout`, etc.)
- Product specifications (nutrition facts, particle size, packaging)
- Certification data (USDA NOP, EU Organic, CERESCERT)
- Contact section copy (already aligned with intermediation model)
- Magnetic cursor, accessibility features, analytics

---

## Affected Components

| File | Change Level | Summary |
|------|-------------|---------|
| `src/data/site.ts` | **Copy** | Update `description` — remove "Direct from producer", add coordination language |
| `src/data/products.ts` | **Copy** | Add "exported by Terra Preta" to subtitle; description already uses "sourced from" (keep) |
| `src/layouts/BaseLayout.astro` | **Copy** | Update structured data `description` field (inherits from site.ts — auto-updates) |
| `src/components/sections/HeroSection.astro` | **Copy** | Replace "Direct from producer to your facility" with coordination value prop |
| `src/components/sections/OriginSection.astro` | **Copy** | Replace "Our açaí" → "Açaí sourced for Terra Preta"; clarify harvest/processing actors; add "example sourcing locations" caption |
| `src/components/sections/CertificationsSection.astro` | **Copy + Structural** | Remove "No middlemen"; add certification ownership clarification box |
| `src/components/sections/ProductSection.astro` | **Copy** | "Star Product" → "Featured Export"; add "by certified partners" to processing description |
| `src/components/sections/ExportSection.astro` | **Copy** | Remove BioFood SRL entirely; "Direct from Source" → "Source-Verified Quality"; add producer selection flexibility language |
| `src/components/sections/SocialProofSection.astro` | **Copy** | "Stories from our partners" → "Buyer success stories"; clarify expertise type |
| `src/components/sections/ContactSection.astro` | **None** | Already aligned — no changes needed |
| `src/components/sections/HowWeWorkSection.astro` | **New** | New component — 4-step workflow grid |
| `src/pages/index.astro` | **Structural** | Reorder section imports; add HowWeWorkSection import and placement |
| `src/components/Footer.astro` | **Copy** | Add export registration note |

---

## Success Criteria

| # | Criterion | How to Measure |
|---|-----------|---------------|
| 1 | **Zero producer-implying phrases** | Grep for "our açaí", "our producer", "direct from producer", "no middlemen", "BioFood" — all should return 0 matches |
| 2 | **Explicit intermediation role visible above the fold** | Hero section contains "connect", "coordinate", or "sourcing" within first 3 lines |
| 3 | **"How We Work" section renders correctly** | Visual inspection: 4-step grid displays on desktop, stacks on mobile |
| 4 | **Certification ownership is clear** | Certifications section contains language distinguishing who holds certs vs. who verifies |
| 5 | **Build passes and site deploys** | `npm run build` succeeds; GitHub Pages deploy completes without errors |
| 6 | **No regressions in accessibility** | Lighthouse a11y score remains ≥90 (current baseline) |
| 7 | **No layout shifts from reordering** | Visual comparison: all sections render in new order without broken spacing |

---

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| **Losing emotional authenticity** — intermediary language feels transactional | Medium | High | Keep Origin story narrative; use "sourced for Terra Preta" instead of "our"; emphasize coordination as craft |
| **Buyers question intermediary value** — "Why pay you if I could go direct?" | Medium | High | Lead with EU compliance complexity; show 100-hour coordination timeline; emphasize single-point contact value |
| **Certification confusion** — buyers think Terra Preta lacks certs | Low | Medium | Use "We coordinate certification verification" (positive framing); keep certification cards prominent |
| **SEO ranking drop** from core copy changes | Low | Medium | Retain keywords: "Bolivian Amazon", "freeze-dried açaí powder", "USDA NOP", "EU Organic"; add "export coordinator", "sourcing" |
| **BioFood relationship tension** if they were involved in site creation | Low | Low | Factual accuracy issue — frame as "we work with multiple certified producers"; BioFood could still be one of many |
| **Section reordering breaks scroll navigation** | Low | Low | Header nav links use `id` anchors — verify all IDs still match after reorder |
| **New section increases page weight** | Low | Low | HowWeWorkSection uses existing Tailwind classes, no new images or heavy assets |

---

## Alternatives Considered

### 1. "We Are Not a Manufacturer" Explicit Statement (Adely Model)
**Rejected.** While effective for Adely (Indonesian spices), it's too blunt for Terra Preta's premium positioning. The Bolivian Amazon origin story is a strength — leading with negation would undermine it. Instead, we use positive framing ("we coordinate", "we connect") that implies intermediation without negation.

### 2. Platform/B2B Marketplace Model (Lubembo Model)
**Rejected.** Terra Preta is not a platform connecting multiple buyers/sellers — it's a single-point export coordinator. The platform model would over-promise capabilities (dashboards, supplier profiles) that don't exist yet.

### 3. Minimal Copy Fixes Only (No New Section)
**Rejected.** Fixing ambiguous phrases without adding a "How We Work" section would leave the intermediation model implicit rather than explicit. Competitor analysis shows successful intermediaries always show their workflow. The new section is the structural anchor that makes the copy changes credible.

### 4. Dual-Location Model (Beyond Amazon Superfoods)
**Rejected.** That model requires physical distribution hubs (Peru + California). Terra Preta coordinates export from Bolivia only — no US/EU warehouse. Adding distribution language would be misleading.

### 5. Keep "Direct from Producer" but Add Disclaimer
**Rejected.** A disclaimer contradicts the headline. The hero message must be accurate from the first read — not corrected by fine print below.

---

## Implementation Order

1. **Critical copy fixes** (BioFood removal, "No middlemen", "Direct from producer")
2. **Data layer updates** (`site.ts`, `products.ts`)
3. **Existing section copy updates** (Hero, Origin, Certifications, Product, Export, SocialProof)
4. **New HowWeWorkSection component**
5. **Section reordering** in `index.astro`
6. **Footer update** (export registration note)
7. **Build verification and visual testing**

---

## Next Step

Proceed to **Spec phase** — write delta specs for each affected component with exact before/after text, then **Tasks phase** to break into implementation units.
