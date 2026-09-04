# Product

## Register

product

### Register exceptions

The default above governs everything a signed-in student touches: `/dashboard`,
`/problems`, `/settings`, `/editor`, `/groups/*`, and the module, problem, and
syllabus templates. Design serves the work there.

Treat these routes as **brand** instead, where design is the product:

- `/` (index)
- `/about`
- `/contact-us`

State the override explicitly when working on those surfaces. Everything else
defaults to product without asking.

## Users

Competitive math students preparing along the AMC to AIME to USAMO pathway,
typically ages 13 to 18, plus the contributors who write the content they read.

**Students** arrive with a specific goal and limited time: qualify for the next
round. They are already capable of sustained abstract reasoning, so they do not
need an interface that explains itself. Their sessions are long and focused,
often late at night, frequently interleaving reading a module, attempting a
problem, checking a solution, and returning. They compare this against scattered
tabs of AoPS threads, PDFs of past papers, and their own notes. The job to be
done: know what to study next, study it, and get honest feedback on whether it
worked.

**Contributors** are usually former or current students writing modules,
problems, and solutions in MDX. They move between reading the site and editing
it. For them the job is: understand the existing content structure well enough
to add to it without a maintainer rewriting their work.

The two audiences overlap heavily. A student who finishes a module is a
plausible author of the next one, and the product should make that path visible.

## Product Purpose

A single free, open-source platform that replaces the scattered set of resources
olympiad students currently stitch together: structured study modules across
algebra, number theory, geometry, and combinatorics; curated problems ordered by
difficulty with full solutions; recurring contests with rankings; and a
contributor pipeline that keeps the content growing.

Success is a student who stops keeping fifteen tabs open, and a contributor who
ships their first module without needing to ask how.

## Brand Personality

**Warm, communal, open.**

The critical constraint: warmth is carried by voice, attribution, and
transparency, never by visual decoration. The interface itself should have the
density, speed, and restraint of Linear or Raycast. Keyboard-reachable, opinionated,
close to zero ornament, comfortable showing a lot of information at once.

That pairing is the whole identity. Most educational products signal friendliness
through soft shapes, bright color, mascots, and celebration animation. This one
signals it by crediting the person who wrote the page, writing like a human
instead of an institution, showing its own seams (the PR, the Discord, the open
repo), and then getting out of the way. A student should feel the product was
made by people slightly ahead of them who respect how hard the material is.

Voice: direct, unpadded, occasionally dry. Never cheerful at the user. Never
congratulatory for ordinary actions. Never apologetic. It is fine to be plain.

## Anti-references

All four of these are explicitly rejected. If output resembles any of them,
rebuild it.

**AoPS and legacy math-web.** Dense forum-era chrome, cramped tables, nested
bordered boxes, 2000s-web visual language, information architecture that assumes
the user already knows the folklore. Density is welcome; that specific kind of
clutter is not.

**Generic SaaS dashboard.** Identical rounded card grids, hero-metric templates
(big number, small label, supporting stats), gradient accents, everything wrapped
in a container, Stripe-clone marketing sections. This is the failure mode the
`/dashboard` and `/` routes drift toward by default.

**Khan Academy and cheerful edtech.** Bright primaries, mascots, illustrated
empty states, badge-and-confetti gamification, kid-facing warmth, encouragement
copy. Contests, streaks, and rankings must be presented soberly as instruments,
not as rewards. (Note: a `Confetti` component exists in the codebase. Its
continued use should be argued for, not assumed.)

**Anything that reads as AI-generated.** Glassmorphism, glow, gradient text,
drop-shadow stacks, repeated icon-heading-paragraph card rows, decorative blur.
The `ui-overhaul` branch already set `--shadow: none` and `--hero-glow: none`;
hold that line.

Second-order trap, stated so it is not walked into: with all four of the above
ruled out, the predictable next answer for a math-olympiad product is the
academic-manuscript lane, serif type, paper texture, LaTeX-preprint styling,
wide margins. That is also a reflex. Rejecting it is not mandatory, but choosing
it requires a real argument beyond "it suits math."

## Design Principles

**1. Density is respect.**
The audience handles AIME geometry. They can handle an information-dense screen.
Never reduce the interface below the complexity of the material, never pad with
explanation the user did not need, never split across steps what fits on one
screen. Show more, say less.

**2. Warmth comes from people, not from decoration.**
Every impulse to make the product feel friendlier must be spent on attribution,
plain language, visible community, and honesty about state. None of it may be
spent on softer shapes, brighter color, illustration, or celebration animation.

**3. Speed is a feature of studying, not just of engineering.**
A student mid-practice must never wait on the UI or hunt for the next action.
Keyboard paths for the repeated actions, immediate navigation, no loading
theater, no modal where an inline affordance works.

**4. Reading and building are one product.**
Contribution is not a separate site behind a "Contribute" link. The path from
reading a module to editing it should be short and visible, because the
contributor pipeline is what keeps the content alive.

**5. Honest feedback over encouragement.**
Progress, rankings, and results are shown as they are. No inflation, no softened
failure states, no praise for trivial actions. Students are here to find out
where they actually stand.

## Accessibility & Inclusion

Target: **WCAG 2.1 AA.**

- Body text at 4.5:1 contrast minimum, large text at 3:1. The cream-on-violet and
  violet-on-cream pairings in the current theme must be verified against this,
  not assumed.
- Full keyboard navigability, with visible focus on every interactive element.
  This is doubly load-bearing given principle 3.
- `prefers-reduced-motion` respected for all motion, including any confetti or
  progress animation.
- Difficulty levels, heatmap intensity, and contest status must never rely on
  color alone. Pair with label, shape, or position.
- The Storybook a11y addon is already installed; treat it as part of the
  component workflow rather than an audit afterthought.
- Math content is central: LaTeX and rendered math must expose accessible text,
  not ship as unlabeled images or bare glyph soup.
