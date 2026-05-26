# i18n Language Switcher Specification

## Purpose

Locale selection UI with native language names and full accessibility.

## Requirements

### Requirement: Native Names, No Flags

Languages SHALL display in their own name: "English", "Español", "Français", "Deutsch". Flags MUST NOT appear.

#### Scenario: Correct names rendered
- GIVEN the switcher renders
- THEN text reads exactly "English", "Español", "Français", "Deutsch"

### Requirement: Active Locale

Current locale SHALL use `aria-current="page"`.

#### Scenario: Français active
- GIVEN user is on the French page
- THEN "Français" MUST have `aria-current="page"`

### Requirement: Header Presence

Switcher SHALL appear in the header. It MAY also appear in the footer.

#### Scenario: Present on every page
- GIVEN any page in any locale
- THEN the switcher MUST be in the header

### Requirement: Keyboard and ARIA

Every link SHALL have an `aria-label` in the current locale. Switcher MUST be keyboard navigable.

#### Scenario: ARIA in English
- GIVEN English page
- WHEN inspecting "Español" link
- THEN `aria-label` describes switching to Spanish in English

### Requirement: Base-Path-Aware URLs

Links SHALL use `getRelativeLocaleUrl()`. `href` MUST start with `/terra-preta/`.
