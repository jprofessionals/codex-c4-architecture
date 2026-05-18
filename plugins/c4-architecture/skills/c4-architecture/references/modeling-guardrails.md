# C4 Modeling Guardrails

## Default Diagram Set

Start with:

- System Context: people and external software systems around the system of
  interest.
- Container: deployable/runnable units, data stores, and major communication
  paths inside the system of interest.

Add only when useful:

- Component: internals of one container, scoped to that container only.
- Code: selected important classes/functions for a complex component, usually
  short-lived or generated from source.
- Dynamic: runtime sequence for an important scenario.
- Deployment: nodes, infrastructure, regions, networks, and runtime instances.
- System Landscape: multiple systems across an organization or bounded domain.

## Level Rules

System Context:

- Include people, the system of interest, and external software systems.
- Exclude containers, databases, frameworks, and implementation technologies.
- Relationships should describe business or user intent, not transport details.

Container:

- Include applications, services, data stores, queues, server-side web apps,
  browser/mobile apps, CLIs, jobs, and integrations owned by the system.
- Include technologies where they clarify runtime responsibility.
- Exclude classes, packages, functions, and deployment nodes.

Component:

- Scope exactly one container.
- Components are logical responsibilities, not automatically folders or classes.
- Show component-to-component and component-to-container dependencies only when
  they explain a meaningful architectural behavior.

Code:

- Use sparingly and only for selected complex components.
- Prefer source-linked docs or generated API docs when class/function inventory
  is the real need.
- Do not create a code diagram for every directory as a default workflow.

Supplementary Views:

- Dynamic views explain one scenario or workflow.
- Deployment views explain runtime topology and infrastructure.
- These are not replacements for the four core C4 levels.

## Evidence Discipline

Every material element and relationship should be one of:

- `confirmed`: supported by code, config, docs, tests, or user input
- `inferred`: likely but not directly proven
- `unknown`: relevant but unavailable

Prefer adding a short `docs/c4/README.md` note over encoding uncertainty into
the diagram label itself. Use comments in DSL sparingly for important decisions
or unknowns.

## Common Mistakes

- Mixing containers and components in the same view.
- Showing external system internals.
- Labeling relationships with vague verbs such as "uses" when a concrete
  business or data flow is known.
- Showing every dependency manager package as a component.
- Treating deployment details as containers.
- Modeling source folders as components without checking responsibility.
- Leaving security-relevant external boundaries invisible.
