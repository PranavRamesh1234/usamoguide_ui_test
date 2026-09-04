---
name: USAMO Guide
description: Structured AMC to USAMO preparation, built by the olympiad community.
colors:
  ink-black: "#0F0D0B"
  desk-charcoal: "#1C1916"
  desk-slate: "#282420"
  graphite: "#38332F"
  rule-line: "#413C38"
  rule-line-strong: "#706B64"
  lamp-brass: "#E6B055"
  lamp-flare: "#F7CE82"
  paper-chalk: "#F1ECE4"
  paper-shadow: "#C2BDB5"
  pencil-grey: "#98958E"
  verified-sage: "#8CC093"
  attention-clay: "#E89265"
  paper-page: "#F5F2ED"
  paper-raised: "#FCFAF6"
  paper-recessed: "#EBE7E1"
  ink-primary: "#221D17"
  ink-secondary: "#4D4740"
  ink-muted: "#69645D"
  ink-rule: "#D0CBC5"
  ink-rule-strong: "#87827B"
  brass-deep: "#8B570F"
  brass-deepest: "#744200"
  verified-moss: "#3C6A43"
  attention-rust: "#A0461F"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "2rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 650
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  subtitle:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "normal"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.04em"
  mono:
    fontFamily: "IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
rounded:
  none: "0"
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  hair: "2px"
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  "2xl": "32px"
  "3xl": "48px"
components:
  button-primary:
    backgroundColor: "{colors.lamp-brass}"
    textColor: "{colors.ink-black}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "10px 16px"
  button-primary-hover:
    backgroundColor: "{colors.lamp-flare}"
    textColor: "{colors.ink-black}"
  button-secondary:
    backgroundColor: "{colors.desk-charcoal}"
    textColor: "{colors.paper-chalk}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "10px 16px"
  button-secondary-hover:
    backgroundColor: "{colors.desk-slate}"
    textColor: "{colors.paper-chalk}"
  input-text:
    backgroundColor: "{colors.ink-black}"
    textColor: "{colors.paper-chalk}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "10px 12px"
  card-surface:
    backgroundColor: "{colors.desk-charcoal}"
    textColor: "{colors.paper-chalk}"
    rounded: "{rounded.lg}"
    padding: "20px"
  pill-tag:
    backgroundColor: "{colors.desk-slate}"
    textColor: "{colors.paper-shadow}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "2px 10px"
  nav-bar:
    backgroundColor: "{colors.desk-charcoal}"
    textColor: "{colors.paper-chalk}"
    rounded: "{rounded.none}"
    height: "56px"
---

# Design System: USAMO Guide

## 1. Overview

**Creative North Star: "The Night Desk"**

One lamp, one hard problem, one in the morning. The whole system is built from the objects actually on that desk: graphite, brass, and paper. The page is the unlit room, surfaces are the parts of the desk the lamp reaches, and the accent is the lamp itself. Nothing on screen is there to be admired. Everything is there because the student needs it to keep working.

This system is deliberately not derived from its category. Math education does not get to mean primary colors and mascots; a dark developer-adjacent tool does not get to mean terminal green or cyan on black. The palette is warm graphite and brass because those are the materials of the scene, and that reasoning is the only reasoning that gets to set color here.

Density is the governing virtue. The audience handles AIME geometry, so the interface may show a great deal at once and must never pad, never spoon-feed, never split across steps what fits on one screen. Warmth is real but it is carried entirely by voice, attribution, and visible seams: the author's name in the header, the edit link inline, the open repo. Warmth is never carried by softer shapes, brighter color, illustration, or celebration.

**Key Characteristics:**
- Dark-primary, warm-neutral. Never blue-black, never pure black.
- One accent (brass), on 10% of any screen or less.
- Flat by construction. Depth comes from four tonal floors, never from shadow.
- Type hierarchy that descends monotonically, in both size and contrast.
- A real monospace for math, code, and identifiers.
- Motion that reports state in 150 to 220ms, or does not happen.

## 2. Colors: The Night Desk Palette

Warm graphite darks under a single brass light, with paper-toned text. Every neutral is tinted toward the warm hue; nothing in this system is a cold grey.

The dark theme is primary. The light theme is a real, supported second theme for daytime and for printing, not an afterthought.

### Primary

- **Lamp Brass** (`#E6B055`, dark) / **Brass Deep** (`#8B570F`, light): The single accent. Interactive text, the current selection, the focus ring, and primary action fills. **9.89:1** on Ink Black; **5.42:1** on Paper Page. This is the only color in the system permitted to attract the eye.
- **Lamp Flare** (`#F7CE82`, dark) / **Brass Deepest** (`#744200`, light): The hover and active step of the accent. Never used at rest.

### Secondary

Two status roles, and only two. Both are low-chroma members of the same warm family so the surface still reads as one palette rather than a paintbox.

- **Verified Sage** (`#8CC093`, dark) / **Verified Moss** (`#3C6A43`, light): Correct, solved, complete. **9.31:1** / **5.64:1**.
- **Attention Clay** (`#E89265`, dark) / **Attention Rust** (`#A0461F`, light): Incorrect, destructive, needs review. **8.06:1** / **5.55:1**.

### Neutral

Dark theme, the four floors:

- **Ink Black** (`#0F0D0B`): The unlit room. Page background, and the text color that sits on top of brass fills.
- **Desk Charcoal** (`#1C1916`): First floor up. Cards, panels, navigation, input wells.
- **Desk Slate** (`#282420`): Second floor. Table headers, hover fills, tag pills, nested regions.
- **Graphite** (`#38332F`): Third floor. Disabled fills and the deepest recess.
- **Paper Chalk** (`#F1ECE4`): Primary text. **16.49:1** on Ink Black.
- **Paper Shadow** (`#C2BDB5`): Secondary text. **10.38:1**.
- **Pencil Grey** (`#98958E`): Muted text, placeholders, timestamps. **6.49:1**.
- **Rule Line** (`#413C38`): Hairline dividers between rows and sections. Decorative only.
- **Rule Line Strong** (`#706B64`): Component boundaries that carry meaning. **3.67:1**, clearing the 3:1 non-text minimum.

Light theme: **Paper Page** (`#F5F2ED`), **Paper Raised** (`#FCFAF6`), **Paper Recessed** (`#EBE7E1`), **Ink Primary** (`#221D17`, 14.97:1), **Ink Secondary** (`#4D4740`, 8.21:1), **Ink Muted** (`#69645D`, 5.25:1), **Ink Rule** (`#D0CBC5`), **Ink Rule Strong** (`#87827B`, 3.41:1).

### Named Rules

**The One Lamp Rule.** Brass appears on at most 10% of any screen. It marks what is interactive, what is selected, and what has focus. It is never a background wash, never a decorative flourish, never applied to a heading for emphasis. Its rarity is the entire mechanism by which it works.

**The No Pure Ends Rule.** `#000` and `#fff` are prohibited, in every file, with no exception. Every dark is warm-tinted graphite and every light is warm-tinted paper. If a value has three equal channels, it is wrong.

**The Two Signals Rule.** Sage and Clay are the complete status vocabulary. There is no info blue, no warning yellow, no separate danger red. A concept that cannot be expressed as accent, sage, or clay does not get a color; it gets a label, an icon, or a position.

**The Never Color Alone Rule.** Difficulty, progress, contest status, and correctness must each carry a label, an icon, or a position in addition to their hue. Removing all color from the interface must leave it fully usable.

## 3. Typography

**Display / Body Font:** Inter (self-hosted variable, weights 100 to 900, with `system-ui, sans-serif` fallback)
**Label/Mono Font:** IBM Plex Mono (self-hosted, with `ui-monospace, SFMono-Regular, Menlo, monospace` fallback)

**Character:** One neutral, highly legible sans carries every UI role, because a product interface does not need a display pairing and a second voice would only add noise to an already dense screen. The one genuine second voice is the monospace, and it exists for a specific reason: this product renders LaTeX, code, problem identifiers, and numeric tables, all of which need column alignment and unambiguous `l`/`1`/`I` and `0`/`O`. A proportional font in those positions is a defect, not a style.

### Hierarchy

- **Display** (700, 2rem, 1.15, -0.02em): The module or page title. Outranks everything inside the content body, without exception.
- **Headline** (700, 1.5rem, 1.25, -0.015em): Top-level section headings inside MDX content.
- **Title** (650, 1.25rem, 1.3, -0.01em): Subsection headings.
- **Subtitle** (700, 1.125rem, 1.4): Third-level headings. Separated from body by weight as much as by size.
- **Body** (400, 1rem, 1.7): All prose. **Capped at 68ch.** The tall line-height is deliberate: this is long-form mathematical reading in extended sessions, not UI chrome.
- **Label** (600, 0.8125rem, 1.4, 0.04em, uppercase): Table headers, tag pills, metadata, button text.
- **Mono** (400, 0.9375rem, 1.6): Inline code, code blocks, keyboard keys, problem IDs, numeric columns, rendered math identifiers.

Scale ratios run 1.33, 1.20, 1.11, 1.125. The tightening near the bottom is intentional for a product register; weight contrast (700 against body 400) carries the separation where size alone would be too flat.

### Named Rules

**The Descending Rule.** Heading rank must fall monotonically in both size and contrast. A page title is never smaller than a heading inside its own content. A heading is never lower-contrast than the paragraph beneath it. A fourth-level heading is never smaller than body text; it demotes through weight and letter-spacing instead.

**The Measure Rule.** Prose is capped at 68ch and the cap is opt-out, not opt-in. Tables, code blocks, diagrams, and figures escape the measure explicitly. Prose never escapes it. The measure must not change partway down a page, so floated elements may not sit inside the text column.

**The Real Monospace Rule.** `font-mono` must resolve to an actual monospaced family. Aliasing the mono slot to the body sans is prohibited. If a numeral appears in a column that a reader will scan vertically, it is set in mono.

## 4. Elevation

This system has no shadows. Not "few", not "subtle": none. `box-shadow` is not part of the vocabulary, and neither is `backdrop-filter`.

Depth is expressed entirely through **four tonal floors** stepping upward from the page: Ink Black, Desk Charcoal, Desk Slate, Graphite. A surface reads as nearer by being lighter, exactly the way the lamp actually falls on the desk. Where a boundary needs to be explicit rather than tonal, it is drawn with a 1px Rule Line Strong hairline, not with a glow or a blur.

This is not minimalism for its own sake. Shadows on a warm near-black surface are close to invisible, so a shadow-based system on this palette would be paying a rendering cost for an effect nobody can see. Tonal layering is both cheaper and more legible here.

The one exception is focus, which is additive and must be impossible to miss: a 2px Lamp Brass outline at 2px offset, on every interactive element, in every state where the element can receive keyboard focus.

### Named Rules

**The Four Floors Rule.** A surface may sit at most one tonal floor above its parent. Two floors of jump reads as a mistake, and a card inside a card inside a card is always wrong regardless of tone.

**The No Glass Rule.** `backdrop-filter` and `blur()` are prohibited as surface treatments. A translucent blurred panel is the single most recognizable tell of a generated interface. Panels are opaque.

## 5. Components

Components are **tactile and confident**: real fills, real 1px borders, generous internal padding, unambiguous edges. They read as objects a student can hit, not as ghost regions. The confidence is in the definition, never in decoration.

### Buttons

- **Shape:** Softly squared (8px radius). Pills are reserved for tags, never used for actions.
- **Primary:** Lamp Brass fill with Ink Black text (9.89:1), 10px by 16px padding, Label typography. One primary action per view.
- **Secondary:** Desk Charcoal fill, 1px Rule Line Strong border, Paper Chalk text. The default for everything that is not the single primary action.
- **Hover:** Fill steps to Lamp Flare (primary) or Desk Slate (secondary) over 150ms. No transform, no lift, no scale.
- **Focus:** 2px Lamp Brass outline at 2px offset. Never removed without an equally visible replacement.
- **Active:** Fill darkens one step. No scale change.
- **Disabled:** Graphite fill, Pencil Grey text, `cursor: not-allowed`.
- **Loading:** Label is replaced in place by a pending indicator and the control becomes non-interactive. The button never disappears or changes size.

### Chips

- **Style:** Desk Slate fill, Paper Shadow text, Label typography, fully rounded, 2px by 10px padding. No border.
- **State:** Selected chips take a 1px Lamp Brass border and Paper Chalk text. Selection is never indicated by fill color alone.

### Cards / Containers

- **Corner Style:** 12px radius.
- **Background:** Desk Charcoal, exactly one floor above the page.
- **Shadow Strategy:** None. See Elevation.
- **Border:** 1px Rule Line, or none where the tonal step is sufficient.
- **Internal Padding:** 20px (`{spacing.xl}` less 4px), tightening to 16px at mobile widths.
- **Restraint:** Cards are the lazy answer to grouping. Prefer a heading plus a hairline rule, a table, or a plain list. Reach for a card only when the content genuinely needs to be liftable, dismissable, or independently actionable.

### Inputs / Fields

- **Style:** Ink Black well (recessed, *below* the surrounding surface, opposite of a card), 1px Rule Line Strong border, 8px radius, 10px by 12px padding, Body typography.
- **Focus:** Border steps to Lamp Brass and the 2px brass outline appears at 2px offset. No glow.
- **Error:** Border and message in Attention Clay, message rendered directly beneath the field, announced via `role="alert"`, cleared as soon as the user edits the field.
- **Disabled:** Graphite fill, Pencil Grey text.
- **Every field has a `<label>` with a matching `htmlFor` and `id`.** Placeholder text is never the only label.

### Navigation

- **Style:** Opaque Desk Charcoal bar, 56px tall, 1px Rule Line bottom border. Not translucent, not blurred, not floating with a radius.
- **Typography:** Label.
- **Default / Hover / Active:** Paper Shadow text; hover moves to Paper Chalk; the active item takes Paper Chalk text plus a 2px Lamp Brass underline. Active state is never fill-only.
- **Mobile:** Collapses to a full-height sheet, not an overlay dropdown. Dismissible by Escape and by an always-visible close control at every breakpoint.

### Content Callouts

The signature component of a long-form math product, and the one most likely to be built wrong.

- **Structure:** A Label-cased kicker naming the type (NOTE, WARNING, OPTIONAL, PROBLEM), then the content. A 1px Rule Line full border and a Desk Charcoal fill.
- **Differentiation:** Callout types are distinguished by their **kicker text**, not by hue. At most, the kicker itself takes Attention Clay for warnings. The body of a callout is never tinted four different colors for four different types.
- **Prohibited:** A colored vertical stripe down the left edge, at any width above 1px, in any hue.

## 6. Do's and Don'ts

### Do:

- **Do** cap prose at 68ch, and make wide content escape the measure explicitly rather than letting prose run to the viewport.
- **Do** keep Lamp Brass under 10% of any screen. It marks interactive, selected, and focused. Nothing else.
- **Do** express depth with the four tonal floors (`#0F0D0B` to `#38332F`) and 1px hairlines.
- **Do** give every interactive element all seven states: default, hover, focus, active, disabled, loading, error. Shipping four of seven is shipping an unfinished component.
- **Do** render focus as a 2px Lamp Brass outline at 2px offset, on every focusable element.
- **Do** pair every status color with a label, icon, or position, so the interface survives with color removed.
- **Do** set every animation inside `@media (prefers-reduced-motion: reduce)` guards, and keep state transitions between 150 and 220ms with `cubic-bezier(0.22, 1, 0.36, 1)`.
- **Do** resolve `font-mono` to IBM Plex Mono, and use it for LaTeX identifiers, code, keyboard keys, problem IDs, and any numeric column.
- **Do** name the author and expose the edit-on-GitHub affordance inline on content pages. This is where warmth is spent.

### Don't:

- **Don't** use `border-left` or `border-right` above 1px as a colored accent on any blockquote, callout, card, or list item. Rewrite with a full hairline border, a background tint, or a kicker label.
- **Don't** use `backdrop-filter`, `blur()`, or translucent panels as a surface treatment. **"Glassmorphism, glow, gradient text, drop-shadow stacks, repeated icon-heading-paragraph card rows, decorative blur"** are named anti-references in PRODUCT.md.
- **Don't** ship `#000` or `#fff`, or any untinted grey, anywhere in the codebase.
- **Don't** build **"identical rounded card grids, hero-metric templates (big number, small label, supporting stats), gradient accents,"** or wrap every region in a container. That is the **"generic SaaS dashboard"** anti-reference.
- **Don't** reach for **"bright primaries, mascots, illustrated empty states, badge-and-confetti gamification, kid-facing warmth, encouragement copy."** Contests, streaks, and rankings are instruments, not rewards.
- **Don't** reproduce **"dense forum-era chrome, cramped tables, nested bordered boxes, 2000s-web visual language."** Density is welcome; that specific clutter is not.
- **Don't** drift toward the academic-manuscript lane (serif body, paper texture, LaTeX-preprint styling, wide margins) as an escape from the above. PRODUCT.md names it as the second-order reflex. It requires a real argument, not a default.
- **Don't** animate layout properties (`left`, `top`, `width`, `height`, `margin`). Animate `transform`, `opacity`, and color only.
- **Don't** use `transform: translateY()` hover lifts on cards or buttons. Motion reports state; it does not decorate.
- **Don't** remove a focus outline without replacing it with something equally visible. `outline: none` and `focus:outline-hidden` alone are defects.
- **Don't** introduce a third font family. Inter and IBM Plex Mono are the complete set; Literata and Space Grotesk should be removed from the preload.
- **Don't** open with a modal where an inline affordance exists on the same page. **"Modals are usually laziness."**
- **Don't** alias stock Tailwind class names to different colors (`bg-white` meaning cream, `text-blue-600` meaning the accent). Class names must describe what they do.

**Audit test:** if you can remove an element and no student loses information or capability, it was decoration, and this system does not carry decoration.
