# Codex C4 Architecture

A local-first Codex plugin for creating and maintaining architecture
documentation based on the C4 Model.

The plugin provides one skill:

- `c4-architecture`

The skill requires Structurizr DSL as the source of truth and renders diagrams
to SVG through a project-local Makefile pipeline. Mermaid and hand-written
PlantUML are intentionally not used as canonical model formats.

## What It Provides

- C4 modeling workflow focused on Context and Container diagrams by default.
- Component diagrams for selected containers when useful.
- Code diagrams only when explicitly needed for complex components.
- Structurizr DSL template under `docs/c4`.
- Makefile pipeline: Structurizr DSL -> PlantUML -> SVG.
- Evidence discipline: confirmed, inferred, and unknown facts.
- Security overlay guidance for trust boundaries, sensitive data, identity,
  admin paths, external systems, and protocols.

## Requirements

- Codex CLI with plugin marketplace support.
- Docker or Podman with a `docker` alias in target projects that render C4 docs.
- Access to `docker.io/structurizr/structurizr:latest` and
  `docker.io/plantuml/plantuml:latest`, unless those images are already cached.

## Marketplace File

Codex discovers this plugin through a marketplace root containing:

```text
.agents/plugins/marketplace.json
plugins/c4-architecture/
```

The marketplace file contains:

```json
{
  "name": "codex-c4-architecture",
  "interface": {
    "displayName": "Codex C4 Architecture"
  },
  "plugins": [
    {
      "name": "c4-architecture",
      "source": {
        "source": "local",
        "path": "./plugins/c4-architecture"
      },
      "policy": {
        "installation": "INSTALLED_BY_DEFAULT",
        "authentication": "ON_INSTALL"
      },
      "category": "Productivity"
    }
  ]
}
```

## Local Install For One Project

Use this when you want the plugin vendored into one target project.

Clone the public repository:

```bash
git clone https://github.com/jprofessionals/codex-c4-architecture.git
cd codex-c4-architecture
```

Then copy the plugin into your target project:

```bash
TARGET=/path/to/your/project

mkdir -p "$TARGET/.agents/plugins" "$TARGET/plugins"
cp -R plugins/c4-architecture "$TARGET/plugins/c4-architecture"
```

Create `$TARGET/.agents/plugins/marketplace.json` with the marketplace JSON from
the previous section.

Validate the copied plugin:

```bash
cd "$TARGET"
node plugins/c4-architecture/scripts/validate-plugin.mjs
```

Register that project as a local Codex marketplace:

```bash
codex plugin marketplace add "$TARGET"
```

Then start a new Codex session in the target project:

```bash
cd "$TARGET"
codex
```

Do not use `codex resume` for the first test after adding or upgrading the
marketplace. Resumed sessions keep the skill/plugin list they were started with.

Invoke the skill by name:

```text
Use c4-architecture to create C4 docs for this repo.
```

## Global Install

Use this when you want the C4 skill available from any project.

```bash
git clone https://github.com/jprofessionals/codex-c4-architecture.git
cd codex-c4-architecture
node plugins/c4-architecture/scripts/validate-plugin.mjs
codex plugin marketplace add "$PWD"
```

Codex also supports marketplace sources such as GitHub owner/repo names and Git
URLs:

```bash
codex plugin marketplace add jprofessionals/codex-c4-architecture
codex plugin marketplace add https://github.com/jprofessionals/codex-c4-architecture.git
```

Use global install only when you want this skill available in most sessions. For
minimum skill catalog noise, prefer the local project install.

## Context Footprint

Installed skills expose catalog metadata so the agent can decide when to use
them. This plugin keeps `SKILL.md` intentionally small. The detailed workflow,
C4 guardrails, Structurizr notes, security overlay, provenance, and templates
live in referenced files that are read only when the skill is activated or when a
new `docs/c4` workspace is being created.

## Validation

Run this from the marketplace root:

```bash
node plugins/c4-architecture/scripts/validate-plugin.mjs
```

The validator checks:

- Required files exist.
- JSON manifests parse.
- The skill has YAML frontmatter with `name` and `description`.
- The plugin manifest references `./skills/`.
- The marketplace references `./plugins/c4-architecture`.
- The Structurizr template Makefile exposes expected targets.

## Provenance

This plugin is local work derived from a review of public C4 skill examples. It
does not install or auto-update from those repositories. See
`plugins/c4-architecture/skills/c4-architecture/references/provenance.md`.
