# Delta Specs: Website Intermediation Reposition

**Change:** `website-intermediation-reposition`
**Phase:** Spec
**Date:** 2026-05-25

---

## Executive Summary

14 delta specs covering copy, structural, and data-layer changes to reposition Terra Preta's website from a producer-implying brand to an export intermediation company. Critical removals: BioFood SRL (2 references + 1 filename), "No middlemen" (1), "Direct from producer" (2), "Our açaí" possessive (2), "Star Product" (1). New "How We Work" section added. Section order restructured. One discrepancy found with the proposal: ContactSection.astro contains a BioFood-bearing PDF filename that was not flagged in the proposal's affected-components table.

---

## Specs

---

### Spec 1: `site.ts` — Metadata & Description

**File**: `src/data/site.ts`
**Change Type**: copy-only

**Current State**:
```ts
tagline: "Amazonian superfoods, exported with integrity.",
description:
  "Terra Preta exports premium freeze-dried açaí powder from the Bolivian Amazon. USDA NOP and EU Organic certified. Direct from producer to your facility.",
```

**Problem**:
- "Direct from producer to your facility" explicitly implies no intermediary exists.
- "Terra Preta exports" is correct but doesn't clarify the coordination/intermediation role.

**Required State**:
```ts
tagline: "Amazonian superfoods, exported with integrity.",
description:
  "Terra Preta connects European buyers with certified freeze-dried açaí producers in the Bolivian Amazon. We coordinate harvest-to-export logistics and manage organic certification verification — so you receive compliant, premium açaí powder without navigating complex supply chains. USDA NOP and EU Organic certified.",
```

**Rationale**: Tagline stays ("exported with integrity" works for intermediation). Description rewritten to lead with connection/coordination role, keep certifications, and explain the value proposition.

**Acceptance Criteria**:
- [ ] `grep "Direct from producer" src/data/site.ts` returns 0 matches
- [ ] Description includes both "connects" (connection role) and "coordinate" (coordination role)
- [ ] USDA NOP and EU Organic keywords retained
- [ ] Description fits within 320 chars (current: 214, new: ~345 — verify no SEO truncation issues in `<meta>`)
- [ ] Tagline unchanged ("Amazonian superfoods, exported with integrity.")

---

### Spec 2: `products.ts` — Product Subtitle

**File**: `src/data/products.ts`
**Change Type**: copy-only

**Current State**:
```ts
subtitle: "Premium organic açaí from the Bolivian Amazon",
```

**Problem**: Correct in isolation but doesn't signal Terra Preta's export/intermediation role. Creates a producer-brand impression when viewed with possessive language elsewhere.

**Required State**:
```ts
subtitle: "Premium organic açaí from the Bolivian Amazon, exported by Terra Preta.",
```

**Acceptance Criteria**:
- [ ] Subtitle reads "Premium organic açaí from the Bolivian Amazon, exported by Terra Preta."
- [ ] `product.description` field unchanged (already uses "sourced from" — correct language)

---

### Spec 3: HeroSection.astro — Subtitle & Scroll Anchor

**File**: `src/components/sections/HeroSection.astro`
**Change Type**: copy-only

**Current State** (lines 43-46):
```astro
<p class="mt-6 text-lg md:text-xl text-cream text-balance max-w-3xl mx-auto leading-relaxed">
  Premium freeze-dried açaí powder from the Bolivian Amazon. USDA NOP and
  EU Organic certified. Direct from producer to your facility.
</p>
```

And scroll-down indicator (lines 59-69):
```astro
<a href="#origin" ...>
```

**Problem**:
- "Direct from producer to your facility" implies Terra Preta is the producer or has exclusive direct relationship.
- Scroll anchor `#origin` points to the old first section — with new ordering, the scroll target should be `#how-we-work`.

**Required State** (subtitle, lines 43-46):
```astro
<p class="mt-6 text-lg md:text-xl text-cream text-balance max-w-3xl mx-auto leading-relaxed">
  Terra Preta connects European buyers with certified freeze-dried açaí
  producers in the Bolivian Amazon. We coordinate harvest-to-export
  logistics and organic certification verification — so you receive
  compliant, premium açaí powder without supply chain complexity.
</p>
```

**Required State** (scroll anchor, line 61):
```astro
<a href="#how-we-work" ...>
```

Also update the aria-label (line 63):
```astro
aria-label="Scroll to How We Work section"
```

**Acceptance Criteria**:
- [ ] `grep "Direct from producer" src/components/sections/HeroSection.astro` returns 0 matches
- [ ] First 3 lines of subtitle paragraph contain "connects" or "coordinate" or "sourcing"
- [ ] USDA NOP and EU Organic keywords retained (in subtitle or elsewhere above fold — they now sit in the data table and site description, but if the subtitle doesn't mention them, add to the CTA area or visually above fold)
- [ ] Scroll-down anchor points to `#how-we-work`
- [ ] CTA buttons unchanged ("Inquire About Seasonal Stock", "Download Product Specs")

---

### Spec 4: NEW — HowWeWorkSection.astro

**File**: `src/components/sections/HowWeWorkSection.astro` (new file)
**Change Type**: new-component

**Current State**: Does not exist.

**Required State**: Create a new component rendering a 4-step workflow grid. Use the same existing patterns as other sections: `SectionHeading` component, `scroll-reveal` class, standard `section-padding` and layout containers.

```astro
---
import SectionHeading from "../shared/SectionHeading.astro";
---

<section id="how-we-work" class="section-padding bg-background scroll-reveal">
  <div class="mx-auto max-w-7xl px-4 sm:px-6">
    <SectionHeading
      title="How Terra Preta Works"
      subtitle="From inquiry to shipment — we coordinate every step."
    />

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <!-- Step 1 -->
      <div class="text-center">
        <div class="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-forest-green/10 text-forest-green mb-4 text-xl font-bold">
          1
        </div>
        <h3 class="font-semibold mb-2">Your Requirements</h3>
        <p class="text-sm text-on-background/70">
          Share your volume, certification needs, and delivery timeline.
        </p>
      </div>

      <!-- Step 2 -->
      <div class="text-center">
        <div class="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-forest-green/10 text-forest-green mb-4 text-xl font-bold">
          2
        </div>
        <h3 class="font-semibold mb-2">Producer Matching</h3>
        <p class="text-sm text-on-background/70">
          We identify competitive certified producers based on seasonal availability.
        </p>
      </div>

      <!-- Step 3 -->
      <div class="text-center">
        <div class="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-forest-green/10 text-forest-green mb-4 text-xl font-bold">
          3
        </div>
        <h3 class="font-semibold mb-2">Verification &amp; Documentation</h3>
        <p class="text-sm text-on-background/70">
          We coordinate certification verification, batch testing, and export paperwork.
        </p>
      </div>

      <!-- Step 4 -->
      <div class="text-center">
        <div class="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-forest-green/10 text-forest-green mb-4 text-xl font-bold">
          4
        </div>
        <h3 class="font-semibold mb-2">Export &amp; Delivery</h3>
        <p class="text-sm text-on-background/70">
          We handle logistics from Bolivia to your European facility.
        </p>
      </div>
    </div>
  </div>
</section>
```

**Design Notes**:
- Background: `bg-background` (matches ProductSection.astro, which will now precede Origin)
- Uses existing `SectionHeading` component with same style as other sections
- Numbered circles follow the same pattern as icon circles in ExportSection
- No images or heavy assets — pure Tailwind + text
- Responsive: 4 columns on `lg`, 2 on `md`, 1 on mobile

**Acceptance Criteria**:
- [ ] Component renders without errors
- [ ] Section heading reads "How Terra Preta Works"
- [ ] All 4 steps render with correct numbering and text
- [ ] Desktop: 4-column grid; Tablet: 2-column; Mobile: 1-column stack
- [ ] Section ID `how-we-work` exists for anchor navigation
- [ ] Uses only existing Tailwind tokens (no new CSS variables or custom colors)
- [ ] `class="scroll-reveal"` present on the `<section>` tag

---

### Spec 5: OriginSection.astro — Possessive Language & Actor Clarity

**File**: `src/components/sections/OriginSection.astro`
**Change Type**: copy-only

**Current State** (lines 11-12):
```astro
subtitle="Harvested, processed, and exported in under 100 hours — preserving nature's intent at every step."
```

(lines 18-22):
```astro
<p class="text-lg text-on-background/80 leading-relaxed text-balance">
  Our açaí is harvested by indigenous communities in the Bolivian
  Amazon. The fruit is transformed into puree within 24 hours of
  harvest, then freeze-dried into powder in under 100 hours —
  preserving maximum nutritional integrity.
</p>
```

(map caption, lines 37-39):
```astro
<p class="mt-2 text-xs text-on-background/40 text-center">
  Comunidad Buen Retiro · Luz de América · El Porvenir — Riberalta, Beni, Bolivia
</p>
```

**Problem**:
- "Our açaí" — possessive implies Terra Preta owns the product
- "Harvested, processed, and exported" — ambiguous subject; who does each step?
- Map caption lists communities without indicating they are example/current sourcing locations, not fixed exclusive partners

**Required State** (subtitle, line 11):
```astro
subtitle="Coordinated from harvest to export in under 100 hours — preserving nature's intent at every step."
```

(lines 18-22):
```astro
<p class="text-lg text-on-background/80 leading-relaxed text-balance">
  Açaí sourced for Terra Preta is harvested by indigenous communities
  in the Bolivian Amazon. The fruit is transformed into puree within
  24 hours of harvest by certified processing partners, then
  freeze-dried into powder in under 100 hours — preserving maximum
  nutritional integrity.
</p>
```

(map caption, lines 37-39):
```astro
<p class="mt-2 text-xs text-on-background/40 text-center">
  Example sourcing locations: Comunidad Buen Retiro · Luz de América · El Porvenir — Riberalta, Beni, Bolivia
</p>
```

**Note**: The "terra preta that gives our company its name" on line 29 is acceptable — it refers to the company name's etymology, not product ownership. Keep unchanged.

**Acceptance Criteria**:
- [ ] `grep "Our açaí" src/components/sections/OriginSection.astro` returns 0 matches
- [ ] `grep "Harvested, processed, and exported" src/components/sections/OriginSection.astro` returns 0 matches
- [ ] First narrative paragraph includes "by certified processing partners" clarifying Terra Preta does not operate processing facilities
- [ ] Map caption begins with "Example sourcing locations:" prefix
- [ ] All other content (stats, MapEmbed, layout) unchanged

---

### Spec 6: ProductSection.astro — Title Reframing

**File**: `src/components/sections/ProductSection.astro`
**Change Type**: copy-only

**Current State** (lines 8-11):
```astro
<SectionHeading
  title="Star Product: Freeze-Dried Açaí Powder"
  subtitle="Euterpe precatoria — wild-harvested, organic, freeze-dried to preserve its extraordinary nutritional profile."
/>
```

**Problem**: "Star Product" implies Terra Preta manufactures or owns the product line — inappropriate for an export intermediary.

**Required State** (lines 8-11):
```astro
<SectionHeading
  title="Featured Export: Freeze-Dried Açaí Powder"
  subtitle="Euterpe precatoria — wild-harvested, organic, freeze-dried to preserve its extraordinary nutritional profile."
/>
```

**Note**: The product description renders `{product.description}` dynamically from `products.ts` — the data layer already uses "sourced from" language (see Spec 2). No additional change needed in the template for the description paragraph.

**Acceptance Criteria**:
- [ ] `grep "Star Product" src/components/sections/ProductSection.astro` returns 0 matches
- [ ] Title reads "Featured Export: Freeze-Dried Açaí Powder"
- [ ] Subtitle unchanged
- [ ] All spec tables (nutrition, particle size, packaging, shelf life, certifications) unchanged

---

### Spec 7: CertificationsSection.astro — "No Middlemen" Removal & Ownership Clarification

**File**: `src/components/sections/CertificationsSection.astro`
**Change Type**: copy-only + structural

**Current State** (lines 21-25):
```astro
<SectionHeading
  inverted
  title="Certified Organic, Verified Transparent"
  subtitle="Every shipment is backed by third-party certification. No middlemen, no claims without proof."
/>
```

**Problem**: "No middlemen" is FACTUALLY INCORRECT — Terra Preta IS the intermediary. This is the most critical messaging error on the site.

**Required State** (lines 21-25):
```astro
<SectionHeading
  inverted
  title="Certified Organic, Verified Transparent"
  subtitle="Every shipment is backed by third-party organic certification. We verify all documentation — no claims without proof."
/>
```

**Add** a certification ownership clarification box after the `<SectionHeading>` component and before the certification cards grid (insert between line 25 and line 28):
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
- [ ] `grep "No middlemen" src/components/sections/CertificationsSection.astro` returns 0 matches
- [ ] Subtitle reads "Every shipment is backed by third-party organic certification. We verify all documentation — no claims without proof."
- [ ] Certification ownership box rendered between heading and cards grid
- [ ] Box text clarifies certifications held by producers, verification coordinated by Terra Preta
- [ ] Certification cards (USDA NOP, EU Organic, CERESCERT) unchanged

---

### Spec 8: ExportSection.astro — BioFood Removal & Headline Reframing

**File**: `src/components/sections/ExportSection.astro`
**Change Type**: copy-only

**Current State** (lines 6-22):
```ts
const exportColumns = [
  {
    icon: "check-circle",
    heading: "EU Certified",
    body: "Our açaí meets EU Organic Regulation 2018/848. CN code 0813. Ready for import into all EU member states.",
  },
  {
    icon: "local-shipping",
    heading: "Flexible Orders",
    body: "No minimum order quantity. Inquire about seasonal stock availability and current pricing. We work with your volume needs.",
  },
  {
    icon: "factory",
    heading: "Direct from Source",
    body: "We coordinate directly with our producer partner BioFood SRL in Santa Cruz, Bolivia. Transparent supply chain, verified quality.",
  },
];
```

**Problems**:
- **CRITICAL**: "BioFood SRL" — not a fixed partner, must be removed
- **CRITICAL**: "our producer partner BioFood SRL" — implies exclusive/fixed producer relationship
- "Direct from Source" heading contradicts intermediation role
- "Our açaí" (column 1 body) uses possessive language
- No mention of producer selection flexibility (seasonal/competitive)

**Required State** (replace the entire `exportColumns` array and any references to it):
```ts
const exportColumns = [
  {
    icon: "check-circle",
    heading: "EU Certified",
    body: "Açaí sourced by Terra Preta meets EU Organic Regulation 2018/848. CN code 0813. Ready for import into all EU member states.",
  },
  {
    icon: "local-shipping",
    heading: "Flexible Orders",
    body: "No minimum order quantity. Inquire about seasonal stock availability and current pricing. We work with your volume needs.",
  },
  {
    icon: "factory",
    heading: "Source-Verified Quality",
    body: "We coordinate with certified producers and processors in Santa Cruz, Bolivia. Producer selection is based on competitive quality and seasonal availability. Full traceability documentation from harvest to export.",
  },
];
```

**Acceptance Criteria**:
- [ ] `grep "BioFood" src/components/sections/ExportSection.astro` returns 0 matches
- [ ] `grep "our producer partner" src/components/sections/ExportSection.astro` returns 0 matches
- [ ] `grep "Direct from Source" src/components/sections/ExportSection.astro` returns 0 matches
- [ ] `grep "Our açaí" src/components/sections/ExportSection.astro` returns 0 matches
- [ ] Third column heading reads "Source-Verified Quality"
- [ ] Third column body contains "Producer selection is based on competitive quality and seasonal availability"
- [ ] Third column body contains "Full traceability documentation from harvest to export"
- [ ] Section heading and CTA unchanged

---

### Spec 9: SocialProofSection.astro — Ambiguous Partner Language

**File**: `src/components/sections/SocialProofSection.astro`
**Change Type**: copy-only

**Current State** (line 20):
```astro
subtitle="Stories from our partners, coming soon."
```

(lines 55-60):
```astro
<h3 class="text-lg font-semibold text-on-background mb-3 text-balance">
  Partners Coming Soon
</h3>
<p class="text-on-background/70 leading-relaxed text-balance max-w-md mx-auto">
  Terra Preta is a new venture built on decades of Amazonian
  expertise. As our first European partners come on board, their
  stories will appear here.
</p>
```

**Problem**:
- "our partners" is ambiguous — could refer to producer partners (implying fixed relationships) or buyer partners
- "Amazonian expertise" doesn't specify coordination/export expertise

**Required State** (line 20):
```astro
subtitle="Buyer success stories, coming soon."
```

(lines 55-60):
```astro
<h3 class="text-lg font-semibold text-on-background mb-3 text-balance">
  Partnerships Coming Soon
</h3>
<p class="text-on-background/70 leading-relaxed text-balance max-w-md mx-auto">
  Terra Preta is a new export venture built on decades of Amazonian
  supply chain and compliance expertise. As our first European partners
  come on board, their stories will appear here.
</p>
```

**Acceptance Criteria**:
- [ ] `grep "Stories from our partners" src/components/sections/SocialProofSection.astro` returns 0 matches
- [ ] Section heading subtitle reads "Buyer success stories, coming soon."
- [ ] Fallback title changed to "Partnerships Coming Soon"
- [ ] Fallback body includes "export venture" and "supply chain and compliance expertise"
- [ ] Section heading title "Trusted by Industry Leaders" unchanged

---

### Spec 10: ContactSection.astro — BioFood PDF Filename

**File**: `src/components/sections/ContactSection.astro`
**Change Type**: copy-only (+ file rename)

**Current State** (line 79):
```astro
href="/Certificate_NOP_BIOFOOD_4080209399.pdf"
```

**Problem**: The filename contains "BIOFOOD" — a BioFood SRL reference. The requirement mandates zero BioFood mentions across all files. This was NOT flagged in the proposal's affected-components table (it stated "None — no changes needed").

**Required State**:
1. Rename the physical PDF file from `public/Certificate_NOP_BIOFOOD_4080209399.pdf` → `public/Certificate_NOP_4080209399.pdf`
2. Update the reference in ContactSection.astro (line 79) to:
```astro
href="/Certificate_NOP_4080209399.pdf"
```

**Note**: All other copy in ContactSection.astro is already aligned with the intermediation model ("Inquire about seasonal stock", "discuss your requirements"). No other changes needed.

**Acceptance Criteria**:
- [ ] `grep -r "BIOFOOD" public/` returns 0 matches (file renamed)
- [ ] `grep "BIOFOOD" src/components/sections/ContactSection.astro` returns 0 matches
- [ ] File `public/Certificate_NOP_4080209399.pdf` exists and is accessible
- [ ] Link text "USDA NOP Certificate (PDF)" unchanged
- [ ] All other contact cards (WhatsApp, Email, Location) unchanged

---

### Spec 11: Footer.astro — Section Link & Export Registration Note

**File**: `src/components/Footer.astro`
**Change Type**: copy-only

**Current State** (lines 7-14):
```ts
const footerLinks = [
  { label: "Home", href: "#hero", aria: "Back to top" },
  { label: "Origin", href: "#origin", aria: "Origin — footer" },
  { label: "Certifications", href: "#certifications", aria: "Certifications — footer" },
  { label: "Product", href: "#product", aria: "Product — footer" },
  { label: "Export", href: "#export", aria: "Export — footer" },
  { label: "Contact", href: "#contact", aria: "Contact — footer" },
];
```

**Problem**:
- "How We Work" section missing from footer navigation
- Section link order does not match new page order
- Missing export registration trust signal

**Required State** (lines 7-14):
```ts
const footerLinks = [
  { label: "Home", href: "#hero", aria: "Back to top" },
  { label: "How We Work", href: "#how-we-work", aria: "How We Work — footer" },
  { label: "Product", href: "#product", aria: "Product — footer" },
  { label: "Origin", href: "#origin", aria: "Origin — footer" },
  { label: "Certifications", href: "#certifications", aria: "Certifications — footer" },
  { label: "Export", href: "#export", aria: "Export — footer" },
  { label: "Contact", href: "#contact", aria: "Contact — footer" },
];
```

**Add** export registration note below the copyright line (after line 112):
```astro
<p class="mt-2 text-xs text-cream/40">
  Terra Preta — Export coordination. Santa Cruz de la Sierra, Bolivia.
</p>
```

**Acceptance Criteria**:
- [ ] Footer links include "How We Work" → `#how-we-work`
- [ ] Footer link order matches new page section order
- [ ] Export registration note rendered below copyright
- [ ] Note text: "Terra Preta — Export coordination. Santa Cruz de la Sierra, Bolivia."
- [ ] Tagline display remains unchanged (dynamically reads `site.tagline`)

---

### Spec 12: BaseLayout.astro — Auto-Updates

**File**: `src/layouts/BaseLayout.astro`
**Change Type**: copy-only

**Current State**: The meta description and structured data description are dynamically rendered from `siteData.description` (line 13):
```astro
const { title, description = siteData.description } = Astro.props;
```

And structured data (lines 56-66):
```json
{
  "@type": "Organization",
  "description": siteData.description,
  ...
}
```

**Problem**: No direct changes needed in this file — both the `<meta name="description">` and the structured data `description` field read from `site.ts`, which is already updated in Spec 1. However, the structured data `@type` is "Organization" — this is appropriate for an export coordination company and does not need to change.

**Required State**: No code changes. Verify after site.ts update:
- `<meta name="description">` automatically uses new description text
- Structured data description automatically uses new description text

**Optional enhancement** (add to structured data if applicable — confirm with stakeholder):
Add a `makesOffer` or `businessFunction` property to clarify intermediation role. Example:
```json
"businessFunction": "https://schema.org/ExportAction"
```
But this is out of scope for this phase — mark as enhancement candidate.

**Acceptance Criteria**:
- [ ] No manual edits to BaseLayout.astro required
- [ ] After site.ts update: build produces `<meta name="description">` with new intermediation text
- [ ] After site.ts update: structured data `description` field contains new text
- [ ] Lighthouse a11y score ≥ 90 (baseline maintained)

---

### Spec 13: Header.astro — Navigation Links

**File**: `src/components/Header.astro`
**Change Type**: copy-only

**Current State** (lines 2-11):
```ts
const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Origin", href: "#origin" },
  { label: "Certifications", href: "#certifications" },
  { label: "Product", href: "#product" },
  { label: "Export", href: "#export" },
  { label: "Trust", href: "#social-proof" },
  { label: "Contact", href: "#contact" },
];
```

**Problem**:
- "How We Work" section missing from navigation
- Order doesn't match new page section order

**Required State**:
```ts
const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "How We Work", href: "#how-we-work" },
  { label: "Product", href: "#product" },
  { label: "Origin", href: "#origin" },
  { label: "Certifications", href: "#certifications" },
  { label: "Export", href: "#export" },
  { label: "Trust", href: "#social-proof" },
  { label: "Contact", href: "#contact" },
];
```

**Acceptance Criteria**:
- [ ] Header nav includes "How We Work" → `#how-we-work`
- [ ] Nav link order matches new section order: Home, How We Work, Product, Origin, Certifications, Export, Trust, Contact
- [ ] All existing nav labels unchanged (except position)
- [ ] Mobile and desktop navigation both reflect the changes (single data source `navLinks`)
- [ ] No visual/functional regressions in mobile hamburger menu

---

### Spec 14: `index.astro` — Section Reordering

**File**: `src/pages/index.astro`
**Change Type**: structural

**Current State** (lines 1-20):
```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import HeroSection from "../components/sections/HeroSection.astro";
import OriginSection from "../components/sections/OriginSection.astro";
import CertificationsSection from "../components/sections/CertificationsSection.astro";
import ProductSection from "../components/sections/ProductSection.astro";
import ExportSection from "../components/sections/ExportSection.astro";
import SocialProofSection from "../components/sections/SocialProofSection.astro";
import ContactSection from "../components/sections/ContactSection.astro";
---

<BaseLayout title="Premium Freeze-Dried Açaí Powder">
  <HeroSection />
  <OriginSection />
  <CertificationsSection />
  <ProductSection />
  <ExportSection />
  <SocialProofSection />
  <ContactSection />
</BaseLayout>
```

**Problem**: Section order must change to: Hero → How We Work → Product → Origin → Certifications → Export → SocialProof → Contact. Plus new HowWeWorkSection import.

**Required State**:
```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import HeroSection from "../components/sections/HeroSection.astro";
import HowWeWorkSection from "../components/sections/HowWeWorkSection.astro";
import ProductSection from "../components/sections/ProductSection.astro";
import OriginSection from "../components/sections/OriginSection.astro";
import CertificationsSection from "../components/sections/CertificationsSection.astro";
import ExportSection from "../components/sections/ExportSection.astro";
import SocialProofSection from "../components/sections/SocialProofSection.astro";
import ContactSection from "../components/sections/ContactSection.astro";
---

<BaseLayout title="Premium Freeze-Dried Açaí Powder">
  <HeroSection />
  <HowWeWorkSection />
  <ProductSection />
  <OriginSection />
  <CertificationsSection />
  <ExportSection />
  <SocialProofSection />
  <ContactSection />
</BaseLayout>
```

**Acceptance Criteria**:
- [ ] Build succeeds (`npm run build`)
- [ ] Imports include `HowWeWorkSection`
- [ ] Section order renders as: Hero, How We Work, Product, Origin, Certifications, Export, SocialProof, Contact
- [ ] No duplicate sections
- [ ] All section IDs resolve correctly in navigation and footer links
- [ ] No visual layout shifts or broken spacing between sections
- [ ] Scroll-reveal animations work on all sections in new order

---

## Cross-Cutting Verification Checklist

### BioFood SRL — Zero Mentions
- [ ] `grep -r "BioFood" src/` returns 0 matches
- [ ] `grep -r "BIOFOOD" public/` returns 0 matches (file renamed)
- [ ] No BioFood references in any `.astro`, `.ts`, or asset file

### "No Middlemen" — Zero Mentions
- [ ] `grep -r "middlemen" src/` returns 0 matches
- [ ] `grep -ri "middleman" src/` returns 0 matches

### Possessive Language Audit
- [ ] `grep "Our açaí" src/` returns 0 matches
- [ ] `grep "our açaí" src/` returns 0 matches
- [ ] `grep "our producer" src/` returns 0 matches

### "Direct from" — Zero Producer-Implying Matches
- [ ] `grep "Direct from producer" src/` returns 0 matches
- [ ] `grep "Direct from Source" src/` returns 0 matches
- [ ] `grep "direct from" src/` returns only acceptable cases (none expected)

### Section Order Verification
- [ ] Page renders: Hero → How We Work → Product → Origin → Certifications → Export → SocialProof → Contact
- [ ] Header nav order matches page section order
- [ ] Footer nav order matches page section order

### Build & Accessibility
- [ ] `npm run build` succeeds
- [ ] Lighthouse a11y score ≥ 90
- [ ] No layout shifts from section reordering

---

## Discrepancy Flagged

**Proposal vs. Actual: ContactSection.astro** — The proposal's affected-components table lists ContactSection as "None — no changes needed." However, the file contains a reference to `/Certificate_NOP_BIOFOOD_4080209399.pdf` on line 79, and the corresponding file exists at `public/Certificate_NOP_BIOFOOD_4080209399.pdf`. Both contain "BIOFOOD" and must be cleaned. Spec 10 addresses this.

**Recommendation**: Update the proposal's affected-components table to reflect ContactSection as "Copy + File Rename — BioFood PDF filename" to keep documents consistent.

---

## Risks

| Risk | Likelihood | Impact | Mitigation in Specs |
|------|-----------|--------|---------------------|
| **BioFood PDF file rename breaks bookmarks** | Medium | Low | Archived Google index may serve 404s; submit URL change in Search Console post-deploy |
| **New HowWeWorkSection missing from mobile nav** | Low | High | Spec 13 adds it to single `navLinks` array — both mobile and desktop share the source |
| **Scroll-reveal animation offset off after reorder** | Low | Low | Each section has `scroll-reveal` class; no dependency on position — will work regardless of order |
| **SEO meta description truncated** | Medium | Low | New description ~345 chars; Google typically displays 150-160 in SERP — front-load key terms. Verify first 155 chars capture value prop |
| **Cert ownership note creates confusion** | Low | Medium | Mitigated by positive framing ("coordinate verification") per explore.md risk assessment |
| **ExportSection.astro uses `exportColumns` array — easy to miss inline objects** | Low | Low | Change is localized to the `const exportColumns` block — no other references in the file |

---

## Next Recommended Phases

1. **Tasks Phase** — Break 14 specs into ~7-10 implementation tasks (data layer → critical copy → new section → reorder → final touches)
2. **Apply Phase** — Implement changes per task order
3. **Verify Phase** — Run acceptance criteria checklist, grep-based verification, visual inspection, build test, Lighthouse audit

---

## Skill Resolution

- `cognitive-doc-design` — Applied: lead with the answer (executive summary with counts), progressive disclosure (per-spec structure with current/problem/required/acceptance), chunking (14 self-contained specs), signposting (consistent heading levels), review empathy (acceptance criteria as checkboxes for verifiable conditions)
