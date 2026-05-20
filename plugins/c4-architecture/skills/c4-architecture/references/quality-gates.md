# Quality Gates

Use these gates before calling C4 work complete.

## Model Gates

- No placeholder names such as `System Name`, `Backend API`, or `Technology`
  remain unless they are the real project terms.
- Each element has a clear responsibility and belongs at the diagram level where
  it appears.
- External systems are black boxes; their internals are not modeled.
- Containers are deployable/runnable units or data stores, not source folders.
- Components are logical responsibilities inside exactly one container.
- Relationship labels describe meaningful behavior or data flow.
- Technology labels are present for containers when known.
- Sensitive data stores, identity flows, admin paths, public entry points, and
  external dependencies are visible or documented as unknown.

## Documentation Gates

`docs/c4/README.md` should answer:

- What system is modeled?
- Who is the intended reader?
- Which diagram should be read first?
- What are the key responsibilities and boundaries?
- What are the main data/security flows?
- What facts are confirmed, inferred, or unknown?
- How does a maintainer edit and render the model?

Do not leave instruction text such as "Describe..." or empty `Confirmed:`,
`Inferred:`, and `Unknown:` placeholders in final docs.

## Render Gates

- `make -C docs/c4 render` succeeds.
- Every view listed in `docs/c4/README.md` has a matching SVG.
- Generated SVGs are committed with DSL changes when the repository tracks
  rendered diagrams.
- Each SVG is readable in Markdown/code review.
- Any SVG wider than about 4500px is reviewed for layout, label length, wrong
  abstraction level, or view splitting.

## Final Response Gates

Summarize:

- DSL files changed.
- SVGs generated.
- Important assumptions or unknowns.
- Render command result.
- Any deliberately omitted diagram level or view.
