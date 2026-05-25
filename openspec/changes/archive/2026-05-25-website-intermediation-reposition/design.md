# Design: Website Intermediation Reposition

## Technical Approach

Repo adjust copy across 9 existing components, add 1 new section component, reorder section composition in `index.astro`. Zero new dependencies. Zero structural refactors. No data model changes — all copy lives inline in Astro files or in `src/data/` plain TS exports. Build pipeline (Astro 6.2.1 → static HTML → GitHub Pages) unchanged.

---

## Architecture Decisions

| Decision | Options | Tradeoff | Choice |
|----------|---------|----------|--------|
| HowWeWorkSection component | New Astro file vs. inline in index.astro | Separate file: testable, clean. Inline: fewer files. | **New file** — patterns match existing section structure |
| Step visuals | Numbered circles vs. icon cards (existing pattern) vs. timeline | Numbered circles are distinct from certification icon cards, scannable | **Numbered circles** — differentiates workflow from certs, matches exploration mockup |
| Inline copy vs. data file | Hardcoded Astro strings vs. `src/data/howWeWork.ts` | Data file adds abstraction for 4 simple strings. Inline matches ExportSection pattern | **Inline in component** — 4 steps don't warrant a data layer; ExportSection shows precedent |
| SectionHeading reuse | Shared `SectionHeading` vs. custom heading | Reuse keeps consistency, zero risk | **Reuse** with `inverted` where needed |

---

## Data Flow

New section is self-contained (no data imports). Copy changes touch only the files themselves, no cross-cutting data flow.

```
site.ts (description) ──→ BaseLayout.astro (meta + JSON-LD)
                             ├─ HeroSection (hero copy)
                             ├─ HowWeWorkSection (new: inline copy)
                             ├─ ProductSection ← products.ts subtitle
                             ├─ OriginSection (narrative copy)
                             ├─ CertificationsSection (heading + info box)
                             ├─ ExportSection (columns array)
                             ├─ SocialProofSection (heading + fallback)
                             └─ ContactSection (no changes)
Footer.astro (add registration note) ← site.ts tagline
Header.astro (add "How" nav link)
```

---

## File Changes

| File | Action | Risk | Est. Lines | Notes |
|------|--------|------|------------|-------|
| `src/data/site.ts` | Modify | Low | 2 | Change `description` field |
| `src/data/products.ts` | Modify | Low | 1 | Add "exported by Terra Preta" to subtitle |
| `src/components/sections/HeroSection.astro` | Modify | Medium | 4 | Rewrite hero paragraph (SEO-sensitive) |
| `src/components/sections/OriginSection.astro` | Modify | Medium | 6 | Remove "our açaí", add "example sourcing locations" |
| `src/components/sections/CertificationsSection.astro` | Modify | Low | 4 | Remove "No middlemen", add ownership note box |
| `src/components/sections/ProductSection.astro` | Modify | Low | 2 | "Star Product" → "Featured Export" |
| `src/components/sections/ExportSection.astro` | Modify | Medium | 5 | Remove BioFood SRL, "Direct from Source" → "Source-Verified Quality" |
| `src/components/sections/SocialProofSection.astro` | Modify | Low | 3 | "our partners" → "Buyer success stories" |
| `src/components/sections/ContactSection.astro` | — | — | 0 | No changes — already aligned |
| `src/components/sections/HowWeWorkSection.astro` | **Create** | Medium | ~50 | New 4-step grid section |
| `src/pages/index.astro` | Modify | Low | 3 | Add import, reorder composition |
| `src/components/Header.astro` | Modify | Low | 1 | Add "How" nav link |
| `src/components/Footer.astro` | Modify | Low | 3 | Add export registration note |
| `src/layouts/BaseLayout.astro` | — | — | 0 | Auto-picks up `site.description` change |

**Total: 1 new, 11 modified, 0 deleted.**

---

## Implementation Strategy

**Phase 1 — Critical factual fixes:** ExportSection (BioFood removal), CertificationsSection ("No middlemen"), site.ts (description). These correct legal/factual errors.

**Phase 2 — Copy alignment:** HeroSection, OriginSection, ProductSection, SocialProofSection, products.ts subtitle. All "our/product ownership" language → coordination language.

**Phase 3 — New section + reorder:** Create HowWeWorkSection then reorder in index.astro (Hero → HowWeWork → Product → Origin → Certifications → Export → SocialProof → Contact). Don't add the new section to nav until reorder is done.

**Phase 4 — Footer + nav:** Footer export registration note, Header nav link for "How We Work".

**Verification:** After each phase, `npm run build`. After Phase 3, `npx astro dev` and visual scan. Grep for banned phrases (`BioFood`, `No middlemen`, `Direct from producer`, `our açaí`, `our producer partner`).

---

## Risk Mitigations

| Risk | Mitigation |
|------|-----------|
| SEO: "Direct from producer" removed from H1 adjacent text | Retain "Bolivian Amazon", "freeze-dried açaí powder", "USDA NOP", "EU Organic" in hero. Add "export coordinator", "sourcing" for new keywords |
| Broken anchor links from reorder | All sections use `id` attributes — order doesn't break `href="#id"`. Verify: grep all anchors match section IDs |
| Tailwind v4 class purge | New section uses only existing Tailwind classes from design system (`bg-background`, `text-on-background`, `rounded-full`, `grid`, etc.) — zero new tokens |
| Layout shift from new section | Same `section-padding` class, same container width (`max-w-7xl`) — no layout impact |

---

## Testing Strategy

| Layer | What | How |
|-------|------|-----|
| Build | Astro compilation | `npm run build` passes |
| Visual | Section rendering, order | `npx astro dev`, manual scan all sections |
| Copy audit | Zero banned phrases | `rg -l "BioFood|No middlemen|Direct from producer|our açaí" src/` |
| Accessibility | No Lighthouse regression | Chrome DevTools Lighthouse a11y ≥90 |
| Nav links | All anchors resolve | Manual click-trough header + footer nav links |

## Migration

None. Static site — deploy via existing GitHub Pages pipeline after build verification.
