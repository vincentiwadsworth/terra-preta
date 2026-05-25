# Website Intermediation Reposition — Exploration Report

**Date:** 2026-05-25  
**Change:** `website-intermediation-reposition`  
**Phase:** Explore  

---

## Executive Summary

Terra Preta's current website messaging incorrectly positions the company as a **producer** rather than an **export intermediation company**. Analysis of all 7 website sections reveals 23+ ambiguous phrases that imply ownership, production, or fixed producer relationships — when in reality Terra Preta has NO fixed producer partnership and will source from whichever producer is competitive once a buyer is secured.

The repositioning requires shifting from "we produce" language to "we coordinate/source/connect" language across every touchpoint. Key competitor analysis shows successful intermediaries (Adely Eco Nusantara, Lubembo, Exofusion) explicitly state their intermediary role on the homepage, lead with traceability and compliance coordination as their value prop, and avoid possessive language about products.

**Critical finding:** BioFood SRL is NOT a fixed partner — it was only used as a reference during site construction. The phrase "We coordinate directly with our producer partner BioFood SRL" must be removed entirely.

---

## Ambiguity Map

| File | Line(s) | Current Text | Why Ambiguous | Suggested Direction |
|------|---------|--------------|---------------|---------------------|
| `src/data/site.ts` | 17 | "Direct from producer to your facility" | Implies Terra Preta IS the producer or has exclusive direct relationship | "Sourced from competitive producers, exported to your facility" |
| `src/data/site.ts` | 17 | "Terra Preta exports premium freeze-dried açaí powder" | OK but could be clearer about intermediation role | Add "We connect European buyers with certified Bolivian Amazon producers" |
| `src/components/sections/HeroSection.astro` | 44-46 | "Direct from producer to your facility" | Same as above — suggests no intermediary | "Coordinated from harvest to your facility" or "Exported from the Bolivian Amazon to your facility" |
| `src/components/sections/OriginSection.astro` | 11 | "Harvested, processed, and exported in under 100 hours" | Subject is ambiguous — who harvests? who processes? | "Harvested by indigenous communities, processed by certified partners, exported by Terra Preta" |
| `src/components/sections/OriginSection.astro` | 19-21 | "Our açaí is harvested by indigenous communities" | Possessive "Our" implies ownership/production relationship | "Açaí sourced for Terra Preta is harvested by indigenous communities" |
| `src/components/sections/OriginSection.astro` | 25-29 | "The wild-harvested Euterpe precatoria palm produces..." | Continues possessive framing | Remove "our" framing entirely — describe the product, not ownership |
| `src/components/sections/CertificationsSection.astro` | 24 | "No middlemen, no claims without proof" | **CRITICAL** — Terra Preta IS the middleman. This is factually incorrect | "Transparent documentation, verified claims" or "Every certification is third-party verified" |
| `src/components/sections/CertificationsSection.astro` | 22 | "Certified Organic, Verified Transparent" | Title is OK but doesn't clarify who holds certification | Clarify that certifications belong to producers/supply chain, Terra Preta coordinates verification |
| `src/components/sections/ProductSection.astro` | 10 | "Star Product: Freeze-Dried Açaí Powder" | "Star Product" suggests Terra Preta owns/manufactures it | "Featured Export: Freeze-Dried Açaí Powder" |
| `src/components/sections/ProductSection.astro` | 38-39 | "100% organic freeze-dried açaí powder sourced from..." | "Sourced from" is good! But rest of section uses possessive | Keep "sourced" language, remove "our" throughout |
| `src/components/sections/ExportSection.astro` | 19-20 | "Direct from Source" | Column heading implies no intermediary | "Coordinated at Source" or "Source-Verified Quality" |
| `src/components/sections/ExportSection.astro` | 20 | "We coordinate directly with our producer partner BioFood SRL" | **CRITICAL** — BioFood is NOT a fixed partner. This is factually wrong | "We coordinate with certified producers in Santa Cruz, Bolivia. Producer selection is based on competitive quality and availability for each season." |
| `src/components/sections/ExportSection.astro` | 20 | "Transparent supply chain, verified quality" | OK but vague | Add specifics: "Full traceability documentation from harvest location to export" |
| `src/components/sections/SocialProofSection.astro` | 19 | "Trusted by Industry Leaders" | Implies existing buyer partnerships (may be OK as aspirational) | Keep but ensure testimonials (when added) clarify Terra Preta's coordination role |
| `src/components/sections/SocialProofSection.astro` | 20 | "Stories from our partners, coming soon" | "Our partners" is ambiguous — could mean producer partners or buyer partners | "Buyer testimonials coming soon" or "Partner success stories coming soon" |
| `src/components/sections/SocialProofSection.astro` | 58-60 | "Terra Preta is a new venture built on decades of Amazonian expertise" | Doesn't clarify what kind of expertise (coordination vs production) | "Terra Preta is a new export venture built on decades of Amazonian supply chain expertise" |
| `src/components/sections/ContactSection.astro` | 11 | "Let's Talk Açaí" | OK — neutral | Keep |
| `src/components/sections/ContactSection.astro` | 12 | "Inquire about seasonal stock, request samples, or discuss your requirements" | Good — implies availability varies (not producer-owned) | Keep |
| `src/data/products.ts` | 35-36 | "Premium organic açaí from the Bolivian Amazon" | Subtitle is OK | Add "exported by Terra Preta" or "sourced for export" |
| `src/data/products.ts` | 37-39 | "100% organic freeze-dried açaí powder sourced from wild-harvested..." | "Sourced from" is correct! | Keep this language, ensure consistency across site |
| All sections | Various | "Our" (possessive used 15+ times) | Cumulative effect creates producer impression | Audit every instance — replace with "Terra Preta" or rephrase to avoid possession |

**Total ambiguous elements identified:** 23+

---

## Competitor Messaging Patterns

### 1. Adely Eco Nusantara (Indonesia) — **GOLD STANDARD**
**URL:** https://adelyeconusantara.com

**Key Quote (Homepage Hero):**
> "We are not a manufacturer. We act as a single commercial and regulatory contact between overseas buyers and selected Indonesian producers."

**Patterns to Emulate:**
- ✅ **Explicit negation:** "We are not a manufacturer" — removes all ambiguity immediately
- ✅ **Role clarity:** "single commercial and regulatory contact" — defines the intermediation function
- ✅ **"What We Don't Do" section:** Explicitly lists "We do not claim to own factories", "We do not sell retail"
- ✅ **Workflow transparency:** 6-step process shows coordination role (not production)
- ✅ **Traceability disclaimer:** "Full farm-level traceability may vary depending on supplier structure"

**Why It Works:** They lead with what they AREN'T, then define their actual role. This prevents buyer confusion from the first 10 seconds.

---

### 2. Lubembo Co. (Africa) — B2B Platform Model
**URL:** https://lubembo.co

**Key Quote:**
> "Superfoods you can trace from African Farms to Your Tables"  
> "Our B2B platform seamlessly connects professional Western buyers with verified Sub-Saharan African suppliers"

**Patterns to Emulate:**
- ✅ **Connector language:** "connects buyers with suppliers" — not "we supply"
- ✅ **Platform framing:** "B2B platform" — suggests facilitation, not ownership
- ✅ **Traceability as value prop:** "Follow your superfoods' complete journey" — coordination is the product
- ✅ **Supplier profiles:** Shows individual producers (DRC honey, Nigeria hibiscus) — Terra Preta could show "Producer Profile: Community Buen Retiro"

**Why It Works:** They're a platform, not a supplier. The traceability dashboard IS the product.

---

### 3. Exofusion Ventures (India) — "Sourcing Partner" Positioning
**URL:** https://exofusionventures.com

**Key Quote:**
> "Direct from Bihar. Built for Your Supply Chain."  
> "We buy directly from farming cooperatives in Darbhanga and Madhubani — bypassing middlemen, ensuring grade consistency, and giving you full supply chain traceability from pond to port."

**Patterns to Emulate:**
- ✅ **"Sourcing partner" language:** Not "producer", not "supplier" — partner
- ✅ **Geographic specificity:** "Bihar wetlands", "Darbhanga and Madhubani" — shows coordination depth
- ✅ **Documentation emphasis:** "Full documentation... ships with every order" — compliance is the value
- ✅ **Grade consistency promise:** Intermediary value prop (not producer value prop)

**Note:** They say "bypassing middlemen" — but they ARE the intermediary. This is acceptable because they're transparent about their coordination role.

---

### 4. DFRUT (India) — "Reliable Sourcing Partner"
**URL:** https://dfrutindia.com

**Key Quote:**
> "We position ourselves as a reliable sourcing partner, not just another supplier."  
> "A Professional Bulk Supplier Built for Global Trade"

**Patterns to Emulate:**
- ✅ **Partnership framing:** "long-term sourcing partnerships" — not transactional
- ✅ **Professional operations:** "From warehouse to global shipment — every step managed with precision" — coordination as service
- ✅ **Documentation badges:** FSSAI, APEDA, IEC, GST — shows compliance management capability

---

### 5. Beyond Amazon Superfoods (Peru/USA) — Direct Competitor
**URL:** https://beyondamazonsuperfoods.com

**Key Quote:**
> "Sourced at origin in Peru · Distributed from California, USA"  
> "Direct sourcing from the peruvian Amazon with full traceability"

**Patterns to Emulate:**
- ✅ **Dual-location model:** Origin + Distribution hub — shows coordination across geographies
- ✅ **"Sourced at origin" language:** Clear about not producing
- ✅ **Product portfolio breadth:** Multiple superfoods (Camu Camu, Aguaje, etc.) — Terra Preta could expand beyond açaí

**Key Difference:** They have physical distribution in USA. Terra Preta's model is export coordination from Bolivia only.

---

## Value Proposition Reframe

### Current (Producer-Implying) Value Prop:
> "Premium freeze-dried açaí powder from the Bolivian Amazon. USDA NOP and EU Organic certified. Direct from producer to your facility."

**Problem:** Reads like Terra Preta owns/operates the production.

---

### Reframed (Intermediation) Value Prop:

**Option A — Compliance & Coordination Focus:**
> "Terra Preta connects European buyers with certified freeze-dried açaí producers in the Bolivian Amazon. We coordinate harvest-to-export logistics, manage organic certification verification, and ensure full traceability — so you receive compliant, premium açaí powder without navigating complex supply chains."

**Option B — Flexibility & Sourcing Focus:**
> "Premium freeze-dried açaí powder, sourced from competitive certified producers in the Bolivian Amazon. Terra Preta handles export coordination, compliance documentation, and quality verification — adapting to seasonal availability while maintaining USDA NOP and EU Organic standards."

**Option C — Traceability Focus (Lubembo-inspired):**
> "Traceable Amazonian açaí, exported with integrity. Follow your shipment from indigenous harvest communities in Beni, Bolivia to your European facility — with full organic certification, batch-level documentation, and single-point coordination."

**Recommended:** **Option A** — leads with the actual service (connection + coordination + compliance), not the product.

---

## Section-by-Section Recommendations

### 1. Hero Section (`HeroSection.astro`)

**Current:**
- H1: "Amazonian Açaí, European Standards"
- P: "Premium freeze-dried açaí powder from the Bolivian Amazon. USDA NOP and EU Organic certified. Direct from producer to your facility."

**Issues:**
- "Direct from producer" implies no intermediary
- Doesn't clarify Terra Preta's role

**Recommended Changes:**
```astro
<h1>Amazonian Açaí, European Standards</h1>
<p>
  Terra Preta connects European buyers with certified freeze-dried açaí 
  producers in the Bolivian Amazon. We coordinate harvest-to-export 
  logistics and organic certification verification — so you receive 
  compliant, premium açaí powder without supply chain complexity.
</p>
```

**CTA:** Keep "Inquire About Seasonal Stock" — this is actually good because it implies availability varies (not producer-owned).

---

### 2. Origin Section (`OriginSection.astro`)

**Current:**
- Title: "From the Amazon to Your Facility"
- Subtitle: "Harvested, processed, and exported in under 100 hours — preserving nature's intent at every step."
- P1: "Our açaí is harvested by indigenous communities..."

**Issues:**
- "Our açaí" — possessive implies ownership
- "Harvested, processed, and exported" — ambiguous subject (who does each step?)
- Map shows specific communities — good for traceability, but implies fixed relationship

**Recommended Changes:**
```astro
<SectionHeading
  title="From the Amazon to Your Facility"
  subtitle="Coordinated from harvest to export in under 100 hours — preserving nature's intent at every step."
/>

<p>
  Açaí sourced for Terra Preta is harvested by indigenous communities 
  in the Bolivian Amazon. The fruit is transformed into puree within 
  24 hours of harvest by certified processing partners, then 
  freeze-dried into powder in under 100 hours — preserving maximum 
  nutritional integrity.
</p>

<p>
  The wild-harvested <em>Euterpe precatoria</em> palm produces a
  smaller, more nutrient-dense berry than its cultivated Brazilian
  cousin. Growing in the biodiverse floodplains of the Beni region,
  these palms absorb the richness of Amazonian soil — the original
  <em>terra preta</em> that gives our company its name.
</p>

<!-- Map caption change -->
<p class="mt-2 text-xs text-on-background/40 text-center">
  Example sourcing locations: Comunidad Buen Retiro · Luz de América · El Porvenir — Riberalta, Beni, Bolivia
</p>
```

**Key Changes:**
- "Our açaí" → "Açaí sourced for Terra Preta"
- "Harvested, processed, and exported" → "Coordinated from harvest to export"
- Add "by certified processing partners" to clarify Terra Preta doesn't operate facilities
- "Example sourcing locations" — implies these are not fixed/exclusive partners

---

### 3. Certifications Section (`CertificationsSection.astro`)

**Current:**
- Title: "Certified Organic, Verified Transparent"
- Subtitle: "Every shipment is backed by third-party certification. No middlemen, no claims without proof."

**Issues:**
- **"No middlemen"** — Terra Preta IS the intermediary. This is factually incorrect.
- Doesn't clarify who holds the certifications (producers, not Terra Preta)

**Recommended Changes:**
```astro
<SectionHeading
  inverted
  title="Certified Organic, Verified Transparent"
  subtitle="Every shipment is backed by third-party organic certification. We verify all documentation — no claims without proof."
/>
```

**Additional Enhancement:**
Add a small info box below the heading:
```astro
<div class="max-w-3xl mx-auto text-center text-sm text-on-background/70 mb-8">
  <p>
    <strong>Note:</strong> Organic certifications are held by producers and 
    processing facilities in Bolivia. Terra Preta coordinates verification 
    and provides all documentation for EU import compliance.
  </p>
</div>
```

---

### 4. Product Section (`ProductSection.astro`)

**Current:**
- Title: "Star Product: Freeze-Dried Açaí Powder"
- Subtitle: "Euterpe precatoria — wild-harvested, organic, freeze-dried to preserve its extraordinary nutritional profile."

**Issues:**
- "Star Product" suggests Terra Preta manufactures/owns it
- Description uses "sourced from" (good!) but rest of section is possessive

**Recommended Changes:**
```astro
<SectionHeading
  title="Featured Export: Freeze-Dried Açaí Powder"
  subtitle="Euterpe precatoria — wild-harvested, organic, freeze-dried to preserve its extraordinary nutritional profile."
/>

<p class="max-w-3xl mx-auto text-center text-on-background/80 leading-relaxed mb-12">
  100% organic freeze-dried açaí powder sourced from wild-harvested 
  <em>Euterpe precatoria</em> palms in the Beni region of Bolivia. 
  Cold-processed within hours of harvest by certified partners to 
  preserve maximum nutritional integrity, vibrant color, and authentic 
  Amazonian flavor.
</p>
```

**Key Changes:**
- "Star Product" → "Featured Export"
- Add "by certified partners" to processing description

---

### 5. Export Section (`ExportSection.astro`)

**Current:**
- Title: "Export-Ready for Europe"
- Column 3: "Direct from Source" — "We coordinate directly with our producer partner BioFood SRL in Santa Cruz, Bolivia. Transparent supply chain, verified quality."

**Issues:**
- **CRITICAL:** "our producer partner BioFood SRL" — BioFood is NOT a fixed partner
- "Direct from Source" — implies no intermediary

**Recommended Changes:**
```astro
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
    heading: "Source-Verified Quality",
    body: "We coordinate with certified producers and processors in Santa Cruz, Bolivia. Producer selection is based on competitive quality and seasonal availability. Full traceability documentation from harvest to export.",
  },
];
```

**Key Changes:**
- "Direct from Source" → "Source-Verified Quality"
- Remove BioFood SRL entirely
- Add "Producer selection is based on competitive quality and seasonal availability"
- Emphasize documentation

---

### 6. SocialProof Section (`SocialProofSection.astro`)

**Current:**
- Title: "Trusted by Industry Leaders"
- Subtitle: "Stories from our partners, coming soon."
- Fallback text: "Terra Preta is a new venture built on decades of Amazonian expertise."

**Issues:**
- "our partners" — ambiguous (producers? buyers?)
- "Amazonian expertise" — doesn't specify coordination/export expertise

**Recommended Changes:**
```astro
<SectionHeading
  title="Trusted by Industry Leaders"
  subtitle="Buyer success stories, coming soon."
/>

<!-- Fallback text change -->
<p class="text-on-background/70 leading-relaxed text-balance max-w-md mx-auto">
  Terra Preta is a new export venture built on decades of Amazonian 
  supply chain and compliance expertise. As our first European partners 
  come on board, their stories will appear here.
</p>
```

---

### 7. Contact Section (`ContactSection.astro`)

**Current:**
- Title: "Let's Talk Açaí"
- Subtitle: "Inquire about seasonal stock, request samples, or discuss your requirements."

**Assessment:** ✅ **This section is already well-aligned with intermediation model.**

**Why It Works:**
- "Inquire about seasonal stock" — implies availability varies (not producer-owned)
- "discuss your requirements" — suggests flexibility/customization (intermediary behavior)
- No possessive language

**Recommended:** Keep as-is.

---

## Information Architecture Recommendations

### Current Section Order:
1. Hero
2. Origin
3. Certifications
4. Product
5. Export
6. SocialProof
7. Contact

### Recommended Section Order (for Intermediation Model):
1. **Hero** — Lead with intermediation value prop
2. **How We Work** (NEW) — 4-6 step workflow showing coordination process
3. **Product** — What you're exporting
4. **Origin** — Where it comes from (traceability)
5. **Certifications** — Compliance proof
6. **Export** — Logistics capability
7. **SocialProof** — Trust signals
8. **Contact** — CTA

### Rationale:
- **Add "How We Work" section after Hero:** This is CRITICAL for intermediation companies. Buyers need to understand the coordination workflow immediately. See Adely's 6-step process.
- **Move Product earlier:** Intermediaries sell capability + product. Show the product sooner.
- **Keep Origin/Certifications adjacent:** Traceability → Compliance is a logical flow.
- **SocialProof before Contact:** Standard conversion optimization.

### New Section: "How We Work"

**Proposed Content:**
```astro
<section id="how-we-work" class="section-padding bg-background scroll-reveal">
  <div class="mx-auto max-w-7xl px-4 sm:px-6">
    <SectionHeading
      title="How Terra Preta Works"
      subtitle="From inquiry to shipment — we coordinate every step."
    />

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <!-- Step 1 -->
      <div class="text-center">
        <div class="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-forest-green/10 text-forest-green mb-4 text-xl font-bold">1</div>
        <h3 class="font-semibold mb-2">Your Requirements</h3>
        <p class="text-sm text-on-background/70">Share your volume, certification needs, and delivery timeline.</p>
      </div>

      <!-- Step 2 -->
      <div class="text-center">
        <div class="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-forest-green/10 text-forest-green mb-4 text-xl font-bold">2</div>
        <h3 class="font-semibold mb-2">Producer Matching</h3>
        <p class="text-sm text-on-background/70">We identify competitive certified producers based on seasonal availability.</p>
      </div>

      <!-- Step 3 -->
      <div class="text-center">
        <div class="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-forest-green/10 text-forest-green mb-4 text-xl font-bold">3</div>
        <h3 class="font-semibold mb-2">Verification & Documentation</h3>
        <p class="text-sm text-on-background/70">We coordinate certification verification, batch testing, and export paperwork.</p>
      </div>

      <!-- Step 4 -->
      <div class="text-center">
        <div class="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-forest-green/10 text-forest-green mb-4 text-xl font-bold">4</div>
        <h3 class="font-semibold mb-2">Export & Delivery</h3>
        <p class="text-sm text-on-background/70">We handle logistics from Bolivia to your European facility.</p>
      </div>
    </div>
  </div>
</section>
```

---

## Trust Signals Audit

### What Intermediaries Need (That Producers Don't):

| Trust Signal | Current Site | Needed? | Recommendation |
|--------------|--------------|---------|----------------|
| **Traceability documentation** | ❌ No | ✅ Yes | Add "Traceability Report" downloadable example showing harvest location, batch ID, processing date |
| **Coordination workflow** | ❌ No | ✅ Yes | Add "How We Work" section (see above) |
| **Compliance handling** | ⚠️ Partial | ✅ Yes | Clarify that Terra Preta manages EU import documentation, not just provides certificates |
| **Producer flexibility** | ❌ No | ✅ Yes | Explicitly state "Producer selection based on seasonal availability and competitive quality" |
| **Batch-level COA** | ❌ No | ✅ Yes | Mention "Certificate of Analysis available per batch" in Export or Product section |
| **Export license/registration** | ❌ No | ✅ Yes | Add footer or Export section: "Registered exporter under Bolivian trade regulations" |
| **Insurance/liability** | ❌ No | ⚠️ Maybe | Consider "Cargo insured during transit" if applicable |
| **Payment terms flexibility** | ❌ No | ⚠️ Maybe | Add "Flexible payment terms for established partners" if offered |

### Recommended Additions:

**1. Traceability Example (in Origin or Export section):**
```astro
<div class="bg-cream rounded-lg p-6 border border-sand/20">
  <h4 class="font-semibold mb-4">Sample Traceability Documentation</h4>
  <p class="text-sm text-on-background/70 mb-4">
    Every shipment includes full traceability from harvest community to export port.
  </p>
  <ul class="space-y-2 text-sm">
    <li class="flex items-center gap-2">
      <span class="w-1.5 h-1.5 rounded-full bg-forest-green"></span>
      Harvest location GPS coordinates
    </li>
    <li class="flex items-center gap-2">
      <span class="w-1.5 h-1.5 rounded-full bg-forest-green"></span>
      Batch ID & processing date
    </li>
    <li class="flex items-center gap-2">
      <span class="w-1.5 h-1.5 rounded-full bg-forest-green"></span>
      Organic certificate reference
    </li>
    <li class="flex items-center gap-2">
      <span class="w-1.5 h-1.5 rounded-full bg-forest-green"></span>
      Export declaration number
    </li>
  </ul>
</div>
```

**2. Export Registration (in Footer or Export section):**
```
Terra Preta — Registered exporter under Bolivian trade regulations.
IEC: [insert if applicable] | GST: [insert if applicable]
```

---

## Risks of Repositioning

### 1. **Losing "Authenticity" Feel**
**Risk:** Current copy creates emotional connection ("Our açaí", "indigenous communities", "terra preta story"). Intermediary language can feel transactional.

**Mitigation:**
- Keep the Origin story — it's powerful and true
- Use "sourced for Terra Preta" instead of "our" — maintains connection without implying ownership
- Emphasize "coordination" as a skill/craft, not just logistics

---

### 2. **Reduced Perceived Value**
**Risk:** Buyers might think "Why pay you if you don't produce? I could go direct."

**Mitigation:**
- Lead with compliance complexity: "EU Organic import requires X, Y, Z documentation — we handle all of it"
- Emphasize flexibility: "Producer selection based on seasonal availability — you don't need to manage multiple relationships"
- Show coordination depth: "100-hour harvest-to-powder timeline requires precise coordination — that's our expertise"

---

### 3. **Confusion About Certification Ownership**
**Risk:** Buyers might think Terra Preta doesn't have certifications if we clarify they belong to producers.

**Mitigation:**
- Use language like "We coordinate certification verification" not "We don't hold certifications"
- Add: "All shipments include full certification documentation for EU import compliance"
- Keep certification cards prominent — just clarify the coordination role

---

### 4. **BioFood SRL Relationship Awkwardness**
**Risk:** If BioFood was involved in site creation, removing their name might create tension.

**Mitigation:**
- This is a factual accuracy issue, not a relationship issue
- BioFood is not a fixed partner — keeping them on the site is misleading to buyers
- Frame as "We work with multiple certified producers" — BioFood could still be one of many

---

### 5. **SEO Impact**
**Risk:** Changing core copy ("Direct from producer" → "Export coordination") might affect search rankings.

**Mitigation:**
- Keep key keywords: "Bolivian Amazon", "freeze-dried açaí powder", "USDA NOP", "EU Organic"
- Add new keywords: "açaí export coordinator", "Bolivian superfood sourcing", "organic açaí supplier"
- Monitor rankings for 3 months post-change

---

## Skill Resolution

**Skills Used:**
- `cognitive-doc-design` — Applied progressive disclosure, chunking, and signposting patterns to structure this exploration document
- `web-design-guidelines` — Referenced for UI best practices (will apply in implementation phase)

---

## Next Steps (for Spec Phase)

1. **Prioritize ambiguity fixes** — Start with CRITICAL items (BioFood mention, "No middlemen", "Direct from producer")
2. **Draft new section copy** — Write full replacement text for all 7 sections + new "How We Work" section
3. **Design traceability documentation example** — Create downloadable PDF or visual showing sample traceability report
4. **Legal review** — Confirm export registration requirements for Bolivian exporters
5. **Stakeholder alignment** — Confirm Carlos agrees with "no fixed producer" positioning

---

## Appendix: Competitor URLs for Reference

| Company | URL | Key Pattern |
|---------|-----|-------------|
| Adely Eco Nusantara | https://adelyeconusantara.com | "We are not a manufacturer" explicit statement |
| Lubembo | https://lubembo.co | B2B platform connecting buyers with verified suppliers |
| Exofusion Ventures | https://exofusionventures.com | "Sourcing partner" positioning, documentation emphasis |
| DFRUT | https://dfrutindia.com | "Reliable sourcing partner, not just another supplier" |
| Beyond Amazon Superfoods | https://beyondamazonsuperfoods.com | "Sourced at origin in Peru · Distributed from California" |

---

**End of Exploration Report**
