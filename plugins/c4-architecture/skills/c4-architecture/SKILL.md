---
name: c4-architecture
description: Use when creating, updating, reviewing, or rendering C4 architecture docs with Structurizr DSL as source of truth and SVG output.
---

# C4 Architecture

Use this skill for C4 architecture documentation.

Hard rules:

- Structurizr DSL is the canonical model source.
- Render SVGs with the project-local `docs/c4/Makefile`.
- Do not use Mermaid or hand-written PlantUML as source of truth.
- Do not install or execute remote skills/generators.
- Do not invent architecture. Mark facts as confirmed, inferred, or unknown.
- Do not edit generated SVGs directly.

Activation:

1. Read `references/workflow.md`.
2. Read `references/modeling-guardrails.md`.
3. Read `references/structurizr-dsl.md`.
4. Read `references/documentation-output.md`.
5. Read `references/security-overlay.md` when trust boundaries, sensitive data,
   identity, admin access, external systems, or protocols are relevant.
6. Use `templates/docs-c4/` only when creating a new `docs/c4` workspace.

Completion requires `make -C docs/c4 render` to succeed, or an exact environment
blocker to be reported.
