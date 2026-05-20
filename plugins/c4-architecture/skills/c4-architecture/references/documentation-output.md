# Documentation Output

C4 work should produce an architecture document, not only generated diagrams.
`docs/c4/README.md` is the human entry point for the model.

## Required README Sections

Include these sections unless the project already has an equivalent local
structure:

- Overview: what system is modeled, why it exists, and the audience.
- How To Read This Model: recommended reading order and what each diagram shows.
- Diagrams: links or embedded SVGs for each generated view.
- Architecture Summary: short prose explaining the most important design
  decisions, responsibilities, boundaries, and data flows.
- Security And Trust Boundaries: identity, sensitive data, admin paths, external
  systems, internet-facing surfaces, and known unknowns.
- Evidence And Assumptions: confirmed, inferred, and unknown facts.
- Maintenance: how to edit DSL, render SVGs, and review changes.

Prefer concise prose. The README should help a reader understand the model
without reading every DSL file.

## README Writing Pattern

Use concrete prose instead of generic template text:

```md
## Overview

This model describes <system>, a <short purpose>. It is written for
<audience> who need to understand <decision/support task>.

## How To Read This Model

Read the diagrams in this order:

1. System Context: <what question it answers>.
2. Containers: <what question it answers>.
3. Components: <why this container is expanded>.

## Architecture Summary

The architecture centers on <main responsibility/boundary>. The most important
data flow is <flow>. The main operational/security boundary is <boundary>.
```

Delete the scaffolding text after writing the project-specific explanation.

## Diagram Links

Prefer embedding SVGs when the target repository commonly embeds diagrams in
Markdown:

```md
![System Context](rendered/structurizr-SystemContext.svg)
```

If diagrams are too large for useful inline rendering, link them instead:

```md
- [System Context](rendered/structurizr-SystemContext.svg)
```

Keep diagram names, view keys, SVG filenames, and README links aligned.

## Layout Quality

After rendering, inspect SVG dimensions. Wide diagrams are hard to read in
Markdown and code review.

Use these responses in order:

1. Try a different `autoLayout` direction for the specific view.
2. Shorten relationship labels while keeping them meaningful.
3. Remove elements that do not belong at that C4 level.
4. Split overloaded views into focused supplementary views.

Do not apply one layout direction globally without checking the rendered result.
For example, component views often benefit from `autoLayout tb`, while context
or container views may still read better with `autoLayout lr`.

As a rough review trigger, reconsider any generated SVG wider than about
4500px, or any diagram that cannot be understood without horizontal scrolling.
