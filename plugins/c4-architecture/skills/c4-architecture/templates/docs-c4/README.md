# C4 Architecture

This directory contains the C4 architecture model for this project.

## File Structure

```text
docs/c4/
├── README.md
├── Makefile
├── src/
│   ├── workspace.dsl
│   ├── model.dsl
│   ├── components.dsl
│   ├── views.dsl
│   └── styles.dsl
└── rendered/
    ├── structurizr-SystemContext.svg
    ├── structurizr-Containers.svg
    └── structurizr-Components.svg
```

The DSL files under `src/` are the single source of truth. SVG files under
`rendered/` are generated and should not be edited directly.

## Change Diagrams

1. Edit the relevant file under `src/`.
2. Run `make render` from this directory.
3. Commit DSL changes and updated `rendered/*.svg` files together.

## Render Pipeline

```bash
make -C docs/c4 render
```

The pipeline uses two containers:

1. `structurizr/structurizr` exports Structurizr DSL to PlantUML using
   `plantuml/structurizr`, which respects the `styles` block.
2. `plantuml/plantuml` renders the PlantUML files to SVG.

The first render may require network access to download container images.

## Targets

```text
make render   # full pipeline: DSL -> PlantUML -> SVG
make clean    # remove generated files
make help     # list targets
```

Podman with a `docker` alias works as a drop-in replacement for Docker. The
Makefile detects Podman and Docker user-mapping requirements automatically.

## DSL Quick Reference

```dsl
user = person "User" "Description"
system = softwareSystem "System" "Description"
api = container "API" "Description" "Technology"
user -> system "Uses"
```

Tags drive colors and shapes via `src/styles.dsl`. `Database` gives a cylinder,
`WebBrowser` gives a browser frame, and `External` gives neutral external-system
styling.

Full reference: https://docs.structurizr.com/dsl/language

## Why Structurizr DSL

- Single source of truth: one model, many views.
- Model validation: undefined elements and invalid relationships fail at render.
- Canonical C4 tooling: Structurizr is built around the C4 Model.
- Export flexibility: the same model can be exported to other formats or opened
  in Structurizr tooling.

## Why `plantuml/structurizr`

Structurizr CLI can export to multiple PlantUML formats. This project uses
`plantuml/structurizr` because it applies Structurizr's styling model and
respects `styles.dsl`.

## Assumptions And Unknowns

Record modeling assumptions here. Keep diagrams focused on confirmed architecture
and mark uncertain items clearly.

- Confirmed:
- Inferred:
- Unknown:
