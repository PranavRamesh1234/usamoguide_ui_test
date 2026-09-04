# USAMO Guide Topic Template

Thank you for contributing to USAMO Guide! Our platform is completely crowd-sourced and your contributions make this project possible.
In order to ensure your contributions match our style standards, please use this template for your content.
Use this template to add new math topics. Create two files:

- An MDX module in the correct content section folder
- A matching .problems.json file with problem lists

## 1) MDX Module Template

```mdx
---
id: topic-id-here
title: Topic Title Here
author: Your Name
description: One sentence summary for SEO and previews.
prerequisites: ["optional-prereq-id"]
---

 ## The Intuition Behind [Topic Name]

Start with a hook, puzzle, or motivating example before you establish the formal definition.

## Formal Definitions and Notation

Once the intuition is established, introduce the formal mathematical language. 

**Key Term**: Provide the strict mathematical definition here. Bold the term on its first introduction. For instance, the **Least Common Multiple (LCM)** is the least integer divisible by all integers in the set.

$$
\text{Use block equations for important formulas, keeping them isolated}
$$

## Scaffolded Examples

Use examples to guide the student through a natural difficulty curve - don't make it too easy or too hard! 
### Direct Application (Easy)

Provide a problem that directly uses the formula or definition just introduced. 

> **2017 AMC 8 Problem 12**
>
> The smallest positive integer greater than 1 that leaves a remainder of 1 when divided by 4, 5, and 6 lies between which of the following pairs of numbers?
>
> $\textbf{(A) }2\text{ and }19\qquad\textbf{(B) }20\text{ and }39\qquad\textbf{(C) }40\text{ and }59\qquad\textbf{(D) }60\text{ and }79\qquad\textbf{(E) }80\text{ and }124$

**Solution:**
Walk through the straightforward logic. Conclude with a boxed answer: 
$\boxed{\textbf{(D) } 60 \text{ and } 79}$

### Slightly Harder Problem (Medium)

Provide a problem that requires a logical leap, an algebraic manipulation, or combining this topic with a basic prerequisite. 

### Olympiad Application (Hard)

Provide a high-level problem (AMC 12, AIME, or Olympiad). Break the solution down using a series of sub-steps.

#### Translating the Condition
Show how to parse the dense problem statement into a workable equation.

#### Solving the System
Walk through the algebra or logic step-by-step.

## Reference Guide

Summarize the module. Don't use a generic "Conclusion" but make it specific and actionable

### Technique or Concept #1
*for example: you might put Bezout's Identity followed by its definition and explanation*

### Technique or Concept #2

### Technique or Concept #3

### When to use which technique

This part is optional - you can use it to match each technique with the specific conditions needed to implement it for better pattern recognition

| Situation | Recommended Tool |
| :--- | :--- |
| Describe a specific problem trigger here | Provide the technique |
| E.g., Constraints mixing GCD and LCM | Prime factorization + min/max |

## Practice Problems

<Problems problems="practice" />
+```

## 2) Problems JSON Template

```json
{
  "MODULE_ID": "topic-id-here",
  "practice": [
    {
      "uniqueId": "amc10-2019a-12",
      "name": "Problem 12",
      "url": "https://artofproblemsolving.com/wiki/index.php/2019_AMC_10A_Problems/Problem_12",
      "source": "AMC 10",
      "difficulty": "Normal",
      "isStarred": true,
      "tags": ["Algebra", "Functions"],
      "solutionMetadata": {
        "kind": "none"
      }
    }
  ]
}
```

Each problem gets an on-site page at `/problems/{slug(source)}-{slug(name)}/` (same as `getProblemURL`). Required and optional fields:

**Required:**
- **`statement`**: Markdown + TeX for the full problem statement displayed on the on-site page. All problems must include their complete statement so they can be viewed directly on the USAMO Guide website.
- **`answers`**: Use \boxed{} for the final answer in every worked example
- **`key terms`**: Bold only key terms neccesary and relevant to the topic - make sure not to overdo it!
- **`math notation`**: Use standard markdown for simple numbers/text and LaTeX ($ or $$) strictly for variables and equations

**Optional:**
- **`author`**: Shown next to the source line.
- **`interaction`**: `{ "type": "none" }` (default if omitted), `{ "type": "integer", "correct": "42" }`, or `{ "type": "mcq", "choices": ["A", "B"], "correctIndex": 0 }`.
- **`solutionReveal`**: Omit for default external solution using `url`. For your own write-up: `{ "mode": "inline", "markdown": "## Solution\\nWe have..." }`. For a different external write-up: `{ "mode": "external", "url": "https://..." }`.

## Notes

- The `id` in frontmatter must match `MODULE_ID` in the problems JSON.
- `source` must be one of: AMC 8, AMC 10, AMC 12, AIME, USAMO, AoPS Wiki, MAA, Custom.
- Use `solutionMetadata.kind = "none"` for AoPS-sourced contest problems.
- Keep tags consistent across modules (case-sensitive).
