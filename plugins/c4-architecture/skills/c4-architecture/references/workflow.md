# Workflow

## Success Criteria

A task using this skill is complete only when:

- the Structurizr DSL model is updated under `docs/c4/src/`
- the model separates model, views, and styles unless the project already has a
  different established C4 layout
- generated SVGs under `docs/c4/rendered/` match the DSL views
- `docs/c4/README.md` explains the model, diagrams, assumptions, and how to
  read the architecture
- assumptions and unknowns are documented instead of invented
- security-relevant boundaries and flows are represented or explicitly called
  out as unknown
- `make -C docs/c4 render` succeeds, or the exact environment blocker is
  reported

## Steps

1. Establish scope before editing.

   Identify the system of interest, audience, desired diagram level, and whether
   the task is creation, correction, or review. Prefer Context and Container
   diagrams by default. Create Component diagrams only for specific containers
   that need deeper explanation. Create Code diagrams only for selected complex
   components when the user explicitly needs code-level architecture.

2. Gather evidence.

   Read existing documentation, configuration, entry points, deployment files,
   route definitions, dependency manifests, and tests as needed. Keep an evidence
   list while modeling:

   - `confirmed`: visible in code, config, docs, or user-provided facts
   - `inferred`: reasonable from context, but not directly proven
   - `unknown`: important but not discoverable

   Do not model external system internals unless the repository or user provides
   that information.

3. Create or update `docs/c4`.

   If no C4 workspace exists, copy this skill's `templates/docs-c4/` directory
   into `docs/c4/`, then replace the placeholders. Keep generated files out of
   `src/`; keep generated SVGs in `rendered/`.

4. Model in Structurizr DSL.

   Use `workspace.dsl` as the entry point. Split model, views, and styles into
   separate included files for maintainability:

   ```text
   docs/c4/src/workspace.dsl
   docs/c4/src/model.dsl
   docs/c4/src/components.dsl
   docs/c4/src/views.dsl
   docs/c4/src/styles.dsl
   ```

   Use stable identifiers for elements and views. Prefer concise element names,
   concrete relationship descriptions, and explicit technologies on containers.

   Do not rely on `include *` when it produces an unreadable view. Include the
   elements that belong at the current C4 level, and create supplementary views
   for crowded areas.

5. Add security-relevant architecture information.

   Capture trust boundaries, external actors, third-party systems, sensitive
   data stores, authentication/authorization components, admin paths, network
   exposure, protocols, and data classifications where known. Use tags such as
   `External`, `Boundary`, `SensitiveData`, `Database`, `Queue`, `Identity`, and
   `Admin` so styles can make the risks visible.

6. Render and verify.

   Run:

   ```bash
   make -C docs/c4 render
   ```

   If rendering fails because container images are missing and the environment
   has no network access, report that as the blocker. Do not silently switch to a
   different diagram format.

7. Inspect rendered output.

   Check generated SVG dimensions and readability. If a diagram is too wide or
   dense, adjust that view's `autoLayout` direction, shorten relationship
   labels, remove wrong-level elements, or split the diagram into focused views.
   Do not assume `lr` or `tb` is correct for every view.

8. Write explanatory docs.

   Update `docs/c4/README.md` with a human-readable explanation of the model,
   diagram reading order, architecture summary, security/trust boundaries,
   evidence, assumptions, and maintenance instructions.

9. Summarize changes.

   Tell the user which diagrams changed, which assumptions remain, and whether
   rendering was verified. Include paths to the DSL and SVG files.

## Guardrails

- Never make Mermaid or PlantUML the canonical model.
- Never treat deployment or dynamic diagrams as C4 Level 4. The core C4 levels
  are System Context, Container, Component, and Code. Deployment and Dynamic
  diagrams are supplementary views.
- Do not generate exhaustive code diagrams for every directory. That is code
  inventory, not architecture modeling.
- Do not invent relationships, protocols, databases, queues, users, or external
  systems. Mark uncertain items as inferred or unknown.
- Do not commit credentials, internal URLs, or secrets into architecture docs.
  Use descriptive names such as `Identity Provider` unless the concrete value is
  already public and appropriate to document.
- Do not use Structurizr scripts/plugins unless the user explicitly approves
  them for the project.
