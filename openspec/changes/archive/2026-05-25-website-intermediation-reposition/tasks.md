# Tasks: Website Intermediation Reposition

**Change:** `website-intermediation-reposition`
**Date:** 2026-05-25
**Phase:** Tasks
**Delivery Strategy:** `auto-chain` (split if >400 lines — not needed, ~98 lines total)
**Total Tasks:** 13 (12 modify, 1 new file)

---

## Executive Summary

13 implementation tasks across 14 delta specs, organized by the design's 4 implementation phases. Total estimated ~98 changed lines + 1 file rename. Well under the 400-line chained-PR threshold — single PR is sufficient. All tasks are independently verifiable via grep-based and build-based acceptance criteria. No structural refactoring required; no new dependencies.

**Key constraint**: Phase 4 (Footer + Header nav) must wait for Phase 3 (HowWeWorkSection + reorder) because nav link order must match the new section order.

---

## Phase 1 — Critical Factual Fixes (Tasks 1–4)

Correct legal/factual errors: BioFood SRL removal, "No middlemen" lie, producer-implying site description, and BioFood-bearing PDF filename. These fix incorrect claims that could affect buyer trust.

---

### Task 1: `site.ts` — Rewrite Metadata Description
**Phase**: 1-Critical
**File**: `src/data/site.ts`
**Dependencies**: None
**Estimated Lines**: ~2
**Risk**: Low

**Steps**:
1. Replace the `description` field value (lines 16–17) with the new intermediation text per Spec 1 required state
2. Verify tagline remains unchanged ("Amazonian superfoods, exported with integrity.")

**Same-chunk change** (from Spec 1):
```ts
// Old:
description:
  "Terra Preta exports premium freeze-dried açaí powder from the Bolivian Amazon. USDA NOP and EU Organic certified. Direct from producer to your facility.",

// New:
description:
  "Terra Preta connects European buyers with certified freeze-dried açaí producers in the Bolivian Amazon. We coordinate harvest-to-export logistics and manage organic certification verification — so you receive compliant, premium açaí powder without navigating complex supply chains. USDA NOP and EU Organic certified.",
```

**Acceptance Criteria**:
- [x] `grep "Direct from producer" src/data/site.ts` returns 0 matches
- [x] Description includes both "connects" and "coordinate" (connection + coordination role)
- [x] "USDA NOP" and "EU Organic" keywords retained
- [x] Tagline unchanged
- [x] New description is ~316 chars (within 320-char guideline — no SEO truncation concern beyond standard SERP limits)

---

### Task 2: `ExportSection.astro` — Remove BioFood SRL & Reframe Columns
**Phase**: 1-Critical
**File**: `src/components/sections/ExportSection.astro`
**Dependencies**: None
**Estimated Lines**: ~5
**Risk**: Low (but **critical** — BioFood SRL is a factual inaccuracy)

**Steps**:
1. Replace the entire `exportColumns` array (lines 6–22) with the corrected version from Spec 8
2. Verify no remaining BioFood, "Direct from Source", "our producer partner", or "Our açaí" references

**Key changes** in the array:
- Column 1 body: `"Our açaí meets..."` → `"Açaí sourced by Terra Preta meets..."`
- Column 3 heading: `"Direct from Source"` → `"Source-Verified Quality"`
- Column 3 body: Remove `"BioFood SRL"` and `"our producer partner"`, add producer selection flexibility + traceability documentation language
- Column 2 body: unchanged

**Acceptance Criteria**:
- [x] `grep "BioFood" src/components/sections/ExportSection.astro` returns 0 matches
- [x] `grep "our producer partner" src/components/sections/ExportSection.astro` returns 0 matches
- [x] `grep "Direct from Source" src/components/sections/ExportSection.astro` returns 0 matches
- [x] `grep "Our açaí" src/components/sections/ExportSection.astro` returns 0 matches
- [x] Third column heading reads "Source-Verified Quality"
- [x] Third column body contains "competitive quality and seasonal availability" and "Full traceability documentation"
- [x] Section heading and CTA unchanged

---

### Task 3: `CertificationsSection.astro` — Remove "No Middlemen" & Add Ownership Clarification
**Phase**: 1-Critical
**File**: `src/components/sections/CertificationsSection.astro`
**Dependencies**: None
**Estimated Lines**: ~10
**Risk**: Low

**Steps**:
1. Replace the `SectionHeading` subtitle (line 24) to remove "No middlemen" (Spec 7 required state)
2. Insert the certification ownership clarification box between the `</SectionHeading>` (line 25) and the certification cards grid opener (line 28)
3. Verify no remaining "No middlemen" reference

**Key changes**:
- Subtitle: `"Every shipment is backed by third-party certification. No middlemen, no claims without proof."` → `"Every shipment is backed by third-party organic certification. We verify all documentation — no claims without proof."`
- New `<div>` block after the heading:
  ```astro
  <!-- Certification ownership clarification -->
  <div class="max-w-3xl mx-auto text-center text-sm text-cream/70 mb-8">
    <p>
      <strong>Note:</strong> Organic certifications are held by our producers and
      processing partners in Bolivia. Terra Preta coordinates verification and
      provides all documentation for EU import compliance.
    </p>
  </div>
  ```

**Acceptance Criteria**:
- [x] `grep "No middlemen" src/components/sections/CertificationsSection.astro` returns 0 matches
- [x] Subtitle reads "Every shipment is backed by third-party organic certification. We verify all documentation — no claims without proof."
- [x] Certification ownership box rendered between heading and cards grid (visual inspection)
- [x] Box text states certifications held by producers, verification coordinated by Terra Preta
- [x] Three certification cards (USDA NOP, EU Organic, CERESCERT) unchanged

---

### Task 4: `ContactSection.astro` & PDF — Remove BioFood Filename Reference
**Phase**: 1-Critical
**Files**: `src/components/sections/ContactSection.astro`, `public/Certificate_NOP_BIOFOOD_4080209399.pdf`
**Dependencies**: None
**Estimated Lines**: ~1 (code) + 1 file rename
**Risk**: Low

**Steps**:
1. Rename `public/Certificate_NOP_BIOFOOD_4080209399.pdf` → `public/Certificate_NOP_4080209399.pdf`
2. Update the `href` on ContactSection.astro line 79 to remove "BIOFOOD" from the path
3. Verify no `grep -r "BIOFOOD"` matches anywhere in repo

**Acceptance Criteria**:
- [x] `grep -r "BIOFOOD" public/` returns 0 matches (file renamed)
- [x] `grep "BIOFOOD" src/components/sections/ContactSection.astro` returns 0 matches
- [x] File `public/Certificate_NOP_4080209399.pdf` exists and is accessible
- [x] Link text "USDA NOP Certificate (PDF)" unchanged
- [x] All other contact cards (WhatsApp, Email, Location) unchanged

---

## Phase 2 — Copy Alignment (Tasks 5–9)

Update remaining section copy to remove "our/product ownership" language and establish intermediation tone. All independent — no file overlaps.

---

### Task 5: `HeroSection.astro` — Rewrite Subtitle & Update Scroll Anchor
**Phase**: 2-Alignment
**File**: `src/components/sections/HeroSection.astro`
**Dependencies**: None (scroll anchor `#how-we-work` doesn't need to exist yet — link is inert until Phase 3)
**Estimated Lines**: ~5
**Risk**: Medium (SEO-sensitive — hero paragraph is above-fold content)

**Steps**:
1. Replace the subtitle paragraph (lines 43–46) with new intermediation copy per Spec 3 required state
2. Update the scroll-down anchor `href` on line 60 from `#origin` to `#how-we-work`
3. Update the `aria-label` on line 62 from "Scroll to Origin section" to "Scroll to How We Work section"
4. Verify existing CTA buttons remain unchanged

**Key changes**:
- Paragraph: `"Premium freeze-dried açaí powder from the Bolivian Amazon. USDA NOP and EU Organic certified. Direct from producer to your facility."` → `"Terra Preta connects European buyers with certified freeze-dried açaí producers in the Bolivian Amazon. We coordinate harvest-to-export logistics and organic certification verification — so you receive compliant, premium açaí powder without supply chain complexity."`
- Anchor: `href="#origin"` → `href="#how-we-work"`, `aria-label="Scroll to Origin section"` → `aria-label="Scroll to How We Work section"`

**SEO Note**: New text front-loads keywords "Terra Preta", "European buyers", "Bolivian Amazon", "certified freeze-dried açaí" within the first 120 chars. USDA NOP and EU Organic are mentioned in the site description (Spec 1 / auto-picked by BaseLayout) and remain above fold via certification cards below.

**Acceptance Criteria**:
- [x] `grep "Direct from producer" src/components/sections/HeroSection.astro` returns 0 matches
- [x] First 120 chars of subtitle contain "connects" or "coordinate" (establishes intermediation role above fold)
- [x] "USDA NOP" and "EU Organic" keywords retained in site description meta tag (auto via Task 1)
- [x] Scroll-down anchor points to `#how-we-work`
- [x] Both CTA buttons unchanged ("Inquire About Seasonal Stock", "Download Product Specs")

---

### Task 6: `OriginSection.astro` — Remove Possessive Language & Clarify Actors
**Phase**: 2-Alignment
**File**: `src/components/sections/OriginSection.astro`
**Dependencies**: None
**Estimated Lines**: ~5
**Risk**: Medium (narrative tone is emotionally important)

**Steps**:
1. Replace subtitle (line 11) — change "Harvested, processed, and exported" to "Coordinated from harvest to export" per Spec 5
2. Replace first narrative paragraph (lines 18–22) — change "Our açaí" to "Açaí sourced for Terra Preta", add "by certified processing partners"
3. Add "Example sourcing locations:" prefix to map caption (line 37)
4. Verify "terra preta that gives our company its name" (line 29) remains unchanged (acceptable — refers to company name etymology, not ownership)

**Key changes**:
- Subtitle: `"Harvested, processed, and exported in under 100 hours"` → `"Coordinated from harvest to export in under 100 hours"`
- Paragraph: `"Our açaí is harvested by indigenous communities... The fruit is transformed into puree within 24 hours of harvest, then freeze-dried into powder in under 100 hours"` → `"Açaí sourced for Terra Preta is harvested by indigenous communities... The fruit is transformed into puree within 24 hours of harvest by certified processing partners, then freeze-dried into powder in under 100 hours"`
- Caption: `"Comunidad Buen Retiro"` → `"Example sourcing locations: Comunidad Buen Retiro"`

**Acceptance Criteria**:
- [x] `grep "Our açaí" src/components/sections/OriginSection.astro` returns 0 matches
- [x] `grep "Harvested, processed, and exported" src/components/sections/OriginSection.astro` returns 0 matches
- [x] First narrative paragraph contains "by certified processing partners" (clarifies Terra Preta doesn't operate facilities)
- [x] Map caption begins with "Example sourcing locations:"
- [x] Stats, MapEmbed, and "terra preta that gives our company its name" unchanged

---

### Task 7: `ProductSection.astro` — Reframe "Star Product" Title
**Phase**: 2-Alignment
**File**: `src/components/sections/ProductSection.astro`
**Dependencies**: None
**Estimated Lines**: ~1
**Risk**: Low

**Steps**:
1. Replace `title` line 9: `"Star Product: Freeze-Dried Açaí Powder"` → `"Featured Export: Freeze-Dried Açaí Powder"`
2. Verify subtitle (line 10) remains unchanged

**Acceptance Criteria**:
- [x] `grep "Star Product" src/components/sections/ProductSection.astro` returns 0 matches
- [x] Title reads "Featured Export: Freeze-Dried Açaí Powder"
- [x] Subtitle unchanged ("Euterpe precatoria — wild-harvested, organic, freeze-dried...")
- [x] All spec tables (nutrition, particle size, packaging, certifications) unchanged

---

### Task 8: `SocialProofSection.astro` — Clarify Partner Language
**Phase**: 2-Alignment
**File**: `src/components/sections/SocialProofSection.astro`
**Dependencies**: None
**Estimated Lines**: ~3
**Risk**: Low

**Steps**:
1. Replace `subtitle` (line 20): `"Stories from our partners, coming soon."` → `"Buyer success stories, coming soon."`
2. Replace fallback title (line 54): `"Partners Coming Soon"` → `"Partnerships Coming Soon"`
3. Replace fallback body (lines 57–59): add "export venture" and "supply chain and compliance expertise" per Spec 9 required state

**Key changes**:
- Section subtitle: clarifies audience (buyer, not producer partners)
- Fallback title: "Partners" → "Partnerships" (signals the relationship, not the producer)
- Fallback body: `"Terra Preta is a new venture built on decades of Amazonian expertise."` → `"Terra Preta is a new export venture built on decades of Amazonian supply chain and compliance expertise."`

**Acceptance Criteria**:
- [x] `grep "Stories from our partners" src/components/sections/SocialProofSection.astro` returns 0 matches
- [x] Section heading subtitle reads "Buyer success stories, coming soon."
- [x] Fallback title changed to "Partnerships Coming Soon"
- [x] Fallback body includes "export venture" and "supply chain and compliance expertise"
- [x] Section heading title "Trusted by Industry Leaders" unchanged

---

### Task 9: `products.ts` — Add "exported by Terra Preta" to Subtitle
**Phase**: 2-Alignment
**File**: `src/data/products.ts`
**Dependencies**: None
**Estimated Lines**: ~1
**Risk**: Low

**Steps**:
1. Append `", exported by Terra Preta."` to the `subtitle` field (line 34)
2. Verify `product.description` field unchanged (already uses "sourced from" — correct language)

**Same-chunk change** (from Spec 2):
```ts
// Old:
subtitle: "Premium organic açaí from the Bolivian Amazon",

// New:
subtitle: "Premium organic açaí from the Bolivian Amazon, exported by Terra Preta.",
```

**Acceptance Criteria**:
- [x] Subtitle reads "Premium organic açaí from the Bolivian Amazon, exported by Terra Preta."
- [x] `product.description` field unchanged ("100% organic freeze-dried açaí powder sourced from...")

---

## Phase 3 — New Section & Reorder (Tasks 10–11)

Create the structural anchor of the repositioning: the 4-step "How Terra Preta Works" section, then reorder all sections to match the new narrative flow.

---

### Task 10: Create `HowWeWorkSection.astro` — New 4-Step Workflow Component
**Phase**: 3-NewSection
**File**: `src/components/sections/HowWeWorkSection.astro` **(NEW)**
**Dependencies**: None
**Estimated Lines**: ~50 (new file)
**Risk**: Medium (new component — must match existing patterns exactly)

**Steps**:
1. Create `src/components/sections/HowWeWorkSection.astro` following the Spec 4 template exactly
2. Use `SectionHeading` component (import from `../shared/SectionHeading.astro`) with title="How Terra Preta Works" and subtitle="From inquiry to shipment — we coordinate every step."
3. Build 4-column responsive grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-4`) with numbered step circles
4. Use only existing Tailwind tokens (`bg-background`, `bg-forest-green/10`, `text-forest-green`, `text-on-background/70`, etc.)
5. Add `scroll-reveal` class to `<section>` tag
6. Give section `id="how-we-work"` for anchor navigation

**Component structure**:
```
<section id="how-we-work" class="section-padding bg-background scroll-reveal">
  <div class="mx-auto max-w-7xl px-4 sm:px-6">
    <SectionHeading title="How Terra Preta Works" subtitle="..." />
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <!-- Step 1-4: numbered circles + heading + body -->
    </div>
  </div>
</section>
```

**4 Steps**:
1. **Your Requirements** — Share your volume, certification needs, and delivery timeline.
2. **Producer Matching** — We identify competitive certified producers based on seasonal availability.
3. **Verification & Documentation** — We coordinate certification verification, batch testing, and export paperwork.
4. **Export & Delivery** — We handle logistics from Bolivia to your European facility.

**Acceptance Criteria**:
- [x] Component renders without errors (`npm run build` passes)
- [x] Section heading reads "How Terra Preta Works"
- [x] All 4 steps render with correct numbering (1–4) and exact body text from Spec 4
- [x] Desktop: 4-column grid; Tablet: 2-column; Mobile: 1-column stack
- [x] Section ID `how-we-work` exists for anchor navigation
- [x] Uses only existing Tailwind tokens (verify no new CSS variables or custom colors)
- [x] `class="scroll-reveal"` present on the `<section>` tag
- [x] No images or heavy assets — pure Tailwind + text

---

### Task 11: `index.astro` — Reorder Sections & Add Import
**Phase**: 3-NewSection
**File**: `src/pages/index.astro`
**Dependencies**: Task 10 (HowWeWorkSection must exist for import)
**Estimated Lines**: ~8 (1 new import, 1 new render, 6 line moves for reorder)
**Risk**: Low

**Steps**:
1. Add `import HowWeWorkSection from "../components/sections/HowWeWorkSection.astro";` to the import block (after HeroSection import)
2. Reorder import statements to match new section order
3. Add `<HowWeWorkSection />` after `<HeroSection />` in the template body
4. Reorder remaining section renders: Product → Origin → Certifications → Export → SocialProof → Contact
5. Run `npm run build` to verify compilation

**New section order**:
```
Hero → How We Work → Product → Origin → Certifications → Export → SocialProof → Contact
```

**Acceptance Criteria**:
- [x] Build succeeds (`npm run build`)
- [x] Imports include `HowWeWorkSection`
- [x] Section order in template matches: Hero, How We Work, Product, Origin, Certifications, Export, SocialProof, Contact
- [x] No duplicate sections
- [x] No visual layout shifts or broken spacing between sections (visual scan after build)
- [x] Scroll-reveal animations work on all sections in new order (scroll-driven class, order-independent)

---

## Phase 4 — Footer & Navigation (Tasks 12–13)

Update navigation to match the new section order and add trust signals.

---

### Task 12: `Footer.astro` — Add How We Work Link & Export Registration Note
**Phase**: 4-FooterNav
**File**: `src/components/Footer.astro`
**Dependencies**: Task 10 (for `#how-we-work` anchor), Task 11 (link order must match new page order)
**Estimated Lines**: ~5
**Risk**: Low

**Steps**:
1. Insert `{ label: "How We Work", href: "#how-we-work", aria: "How We Work — footer" }` after Home in the `footerLinks` array (line 8)
2. Reorder remaining links to match new page section order: Home → How We Work → Product → Origin → Certifications → Export → Contact
3. Add export registration note after the copyright line (after line 112):
   ```astro
   <p class="mt-2 text-xs text-cream/40">
     Terra Preta — Export coordination. Santa Cruz de la Sierra, Bolivia.
   </p>
   ```

**New link order**:
```
Home → How We Work → Product → Origin → Certifications → Export → Contact
```

**Acceptance Criteria**:
- [x] Footer links include "How We Work" → `#how-we-work`
- [x] Footer link order matches new page section order (Home, How We Work, Product, Origin, Certifications, Export, Contact)
- [x] Export registration note rendered below copyright line
- [x] Note text: "Terra Preta — Export coordination. Santa Cruz de la Sierra, Bolivia."
- [x] Tagline display remains unchanged (dynamically reads `site.tagline`)

---

### Task 13: `Header.astro` — Add How We Work Navigation Link
**Phase**: 4-FooterNav
**File**: `src/components/Header.astro`
**Dependencies**: Task 10 (for `#how-we-work` anchor), Task 11 (link order must match new page order)
**Estimated Lines**: ~2
**Risk**: Low

**Steps**:
1. Insert `{ label: "How We Work", href: "#how-we-work" }` after Home in the `navLinks` array (after line 3)
2. Reorder remaining links to match new page section order: Home → How We Work → Product → Origin → Certifications → Export → Trust → Contact

**New link order**:
```
Home → How We Work → Product → Origin → Certifications → Export → Trust → Contact
```

**Acceptance Criteria**:
- [x] Header nav includes "How We Work" → `#how-we-work`
- [x] Nav link order matches new section order (Home, How We Work, Product, Origin, Certifications, Export, Trust, Contact)
- [x] All existing nav labels unchanged (only position changed)
- [x] Mobile and desktop navigation both reflect the changes (single `navLinks` data source)
- [x] No visual/functional regressions in mobile hamburger menu

---

## Cross-Cutting Verification

These verifications require ALL tasks above to be complete. No code changes needed in `src/layouts/BaseLayout.astro` (Spec 12) — it auto-picks up the updated `site.description` from Task 1 for both `<meta>` and structured data.

### Build & Render
- [x] `npm run build` succeeds
- [x] Visual scan: all sections render in correct order with correct copy
- [x] No layout shifts from section reordering

### Banned Phrase Audit (grep)
- [x] `grep -r "BioFood" src/` — 0 matches
- [x] `grep -r "BIOFOOD" public/` — 0 matches
- [x] `grep -r "No middlemen" src/` — 0 matches
- [x] `grep -r "our açaí" src/` — 0 matches (case-insensitive)
- [x] `grep -r "our producer" src/` — 1 match (expected: "our producers" in CertificationsSection ownership note — plural generic reference, not singular "our producer partner")
- [x] `grep -r "Direct from producer" src/` — 0 matches
- [x] `grep -r "Direct from Source" src/` — 0 matches
- [x] `grep -r "Star Product" src/` — 0 matches
- [x] `grep -r "Stories from our partners" src/` — 0 matches
- [x] `grep -r "Partners Coming Soon" src/` — 0 matches

### Anchor & Navigation Integrity
- [x] Header nav labels link to valid section IDs: `#hero`, `#how-we-work`, `#product`, `#origin`, `#certifications`, `#export`, `#social-proof`, `#contact`
- [x] Footer nav labels link to valid section IDs: `#hero`, `#how-we-work`, `#product`, `#origin`, `#certifications`, `#export`, `#contact`
- [x] All section `id` attributes match nav links
- [x] `scroll-margin-top: 5rem` applies to all `section[id]` (inherited from BaseLayout global style)

### Accessibility
- [ ] Lighthouse a11y score ≥ 90 (no regressions from copy changes)

---

## Review Workload Forecast

| Metric | Value |
|--------|-------|
| Total files changed | 12 modified + 1 new + 1 renamed = **14** |
| Total estimated changed lines | **~98** (new: ~50, modify: ~48) |
| Per-task breakdown | See table below |
| Chained PR required? | **No** — 98 << 400 threshold |
| 400-line budget risk | **Low** — 24.5% of budget consumed |
| Delivery strategy override | Auto-chain not activated (forecast < 400) |

### Per-Task Line Estimate

| Task | File | Est. Lines | Type |
|------|------|-----------|------|
| 1 | `site.ts` | ~2 | Modify |
| 2 | `ExportSection.astro` | ~5 | Modify |
| 3 | `CertificationsSection.astro` | ~10 | Modify |
| 4 | `ContactSection.astro` + PDF | ~1 + rename | Modify |
| 5 | `HeroSection.astro` | ~5 | Modify |
| 6 | `OriginSection.astro` | ~5 | Modify |
| 7 | `ProductSection.astro` | ~1 | Modify |
| 8 | `SocialProofSection.astro` | ~3 | Modify |
| 9 | `products.ts` | ~1 | Modify |
| 10 | `HowWeWorkSection.astro` | ~50 | **New** |
| 11 | `index.astro` | ~8 | Modify |
| 12 | `Footer.astro` | ~5 | Modify |
| 13 | `Header.astro` | ~2 | Modify |
| **Total** | | **~98** | |

### PR Strategy Recommendation

**Single PR to `main`.** At ~98 lines, this change is well within the 400-line cognitive load budget. All tasks can be implemented and reviewed as a single unit. The auto-chain strategy requires no action.

However, if desired, a natural split point exists at Task 9/10 boundary (*Phase 2 → Phase 3*), producing:
- **PR 1** (Tasks 1–9, ~33 lines): All copy changes, critical fixes, and data layer updates. Delivers the full messaging correction without the new section.
- **PR 2** (Tasks 10–13, ~65 lines): New section, reorder, and nav updates. Delivers the structural change.

This split is **not required** but available if stakeholder prefers incremental review.

### Decision Needed Before Apply

**No.** The forecast is clear — single PR, no exceptions needed. Proceed to Apply phase with the task order as specified.

---

## Next Recommended Phases

1. **Apply Phase** — Implement tasks in order (1→13). Each task is independently verifiable and can be committed as a work unit per the `work-unit-commits` pattern.
2. **Verify Phase** — Run the Cross-Cutting Verification checklist above: grep audit, build test, visual scan, Lighthouse accessibility check.
3. **Archive Phase** — Sync delta specs to mark completion.

**Recommended commit grouping for apply** (per `work-unit-commits` skill — each commit is a verifiable work unit):
1. `fix(site): rewrite metadata description for intermediation role` (Task 1)
2. `fix(export): remove BioFood SRL and reframe source language` (Task 2)
3. `fix(certifications): remove "No middlemen" and add ownership note` (Task 3)
4. `fix(contact): rename BioFood-bearing PDF and update reference` (Task 4)
5. `fix(hero): update subtitle and scroll anchor for new flow` (Task 5)
6. `fix(origin): remove possessive language and clarify actors` (Task 6)
7. `fix(product): reframe "Star Product" as "Featured Export"` (Task 7)
8. `fix(social-proof): clarify partner language for buyer audience` (Task 8)
9. `fix(products): add "exported by Terra Preta" to subtitle` (Task 9)
10. `feat(sections): add How We Work 4-step workflow section` (Task 10)
11. `feat(layout): reorder sections and add HowWeWorkSection` (Task 11)
12. `fix(footer): add How We Work link and export registration note` (Task 12)
13. `fix(header): add How We Work navigation link` (Task 13)

---

## Skill Resolution

- **`cognitive-doc-design`**: Applied — lead with the answer (executive summary), progressive disclosure (phase-grouped tasks with quick-reference tables), chunking (13 self-contained tasks with consistent format), review empathy (acceptance criteria as grep-able checkboxes).
- **`work-unit-commits`**: Applied — each task maps to a single verifiable work unit with clear start/end state, tests/docs kept with code (verification checklist included), commit grouping recommended with conventional commit messages, SDD workload guard confirmed (98 lines < 400 threshold, no chaining needed).
