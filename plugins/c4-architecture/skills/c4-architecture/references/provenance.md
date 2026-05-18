# Provenance

This local skill was created after reviewing community C4 architecture skills,
including:

- https://github.com/softaworks/agent-toolkit/tree/main/skills/c4-architecture
- https://github.com/sickn33/antigravity-awesome-skills/tree/main/skills/c4-context
- https://github.com/sickn33/antigravity-awesome-skills/tree/main/skills/c4-container
- https://github.com/sickn33/antigravity-awesome-skills/tree/main/skills/c4-component
- https://github.com/sickn33/antigravity-awesome-skills/tree/main/skills/c4-code
- https://github.com/Consiliency/treesitter-chunker/tree/main/.ai-dev-kit/skills/c4-modeling

The local skill is not installed from those repositories and should not be
auto-updated from them.

## Deliberate Adaptations

- Structurizr DSL is the canonical model source.
- Mermaid and hand-written PlantUML are disallowed as source-of-truth formats.
- SVG rendering is performed through the local Makefile pipeline.
- Context and Container diagrams are the default useful output.
- Component diagrams are scoped to one container.
- Code diagrams are opt-in and limited to important complex components.
- Dynamic and Deployment diagrams are supplementary views, not C4 Level 4.
- Modeling output must distinguish confirmed, inferred, and unknown facts.
- Security-relevant boundaries and flows are part of the modeling workflow.
