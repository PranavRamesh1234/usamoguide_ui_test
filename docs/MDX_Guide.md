# MDX Guide

This document explains how to write MDX in this repo, with examples for common tasks like headings, emphasis, images, math, and problems.

## What is MDX?

MDX is Markdown with JSX. You can use normal Markdown syntax and also embed React components like <Problems />.

## Frontmatter (required)

Every MDX file in content/ starts with frontmatter. Example:

---
id: algebra-basics
title: Algebra Basics
author: USAMO Guide Team
description: Linear equations, factoring, and manipulating expressions with confidence.
prerequisites: []
---

Notes:
- id must be unique.
- title is the page title.
- description is used in previews/SEO.
- prerequisites is a list of topic ids.

## Headings and structure

Use # only for the page title in frontmatter. Use ## and below for sections:

## Overview
### Key Ideas
#### Common Pitfalls

## Bold, italics, and inline code

**Bold text**
*Italic text*
`inline code`

## Lists

- Bullet item
- Another item

1. Numbered item
2. Another numbered item

## Links

[USAMO Guide](https://usamoguide.com)

## Images

Markdown image:

![Alt text](https://picsum.photos/200/300)

JSX image (MDX):

<img src="https://picsum.photos/200/300" alt="Alt text" />

If the image is stored in the repo (recommended), use a site-relative path like:

![Alt text](/images/example.png)

## Math (KaTeX)

Inline math uses single $:

Let $a^2 + b^2 = c^2$.

Block math uses $$:

$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$

Common math commands used in olympiad writing, such as `\begin{align}`, `\boxed{}`, `\text{}`, `\mathbb{}`, and `\operatorname{}`, are supported in normal KaTeX math blocks.

If you need more structure in displayed math, prefer `align`, `aligned`, or `cases` rather than raw `\usepackage` lines.

## Asymptote diagrams

Use `[asy]...[/asy]` blocks to include Asymptote source in MDX. The block is preserved as a labeled, copyable source block so you can paste in geometry diagrams and diagram setup code directly.

Example:

[asy]
import geometry;
size(200);
pair A = (-1.66, 0.33);
pair B = (-9.61277, 1.19799);
pair C = (-7.83974, 3.61798);
pair D = (-4.88713, 4.14911);
draw(circumcircle(A, B, C));
draw(A--C);
draw(A--D);
draw(C--D);
draw(B--C);
draw(A--B);
label("$A$", A, E);
label("$B$", B, W);
label("$C$", C, NW);
label("$D$", D, N);
label("$7$", midpoint(A--C), SW);
label("$5$", midpoint(A--D), NE);
label("$3$", midpoint(C--D)+ dir(135)*0.3, N);
label("$3$", midpoint(B--C)+dir(180)*0.3, NW);
label("$8$", midpoint(A--B), S);
markangle(Label("$60^\circ$", Relative(0.5)), A, B, C, radius=10);
markangle(Label("$120^\circ$", Relative(0.5)), C, D, A, radius=10);
[/asy]

Common Asymptote imports such as `import geometry;`, `import graph;`, `import markers;`, `import fontsize;`, `import olympiad;`, and `import math;` are fine inside the block and will be preserved as source.

You can also keep other setup lines like `size(...)`, `unitsize(...)`, and `pen` definitions in the block.

## Adding problems

Use the Problems component to add practice sets. Example:

<Problems problems="practice" />

Common values for problems are typically "practice" or other predefined groups for the module.

## Embedding other components

MDX supports React components used by the site. Example patterns:

<ComponentName prop1="value" />

For centered image callouts, use `FigureBox`:

<FigureBox image="/images/example.png" alt="Example diagram" title="Key idea">
	Put your supporting text here.
</FigureBox>

Only components supported by the site will render properly.

## Tips

- Keep lines reasonably short for readability in reviews.
- Prefer images stored in the repo over hotlinking.
- Use math for formulas instead of inline ASCII.
