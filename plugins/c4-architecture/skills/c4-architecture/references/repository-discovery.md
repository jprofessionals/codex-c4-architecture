# Repository Discovery

Use this guide to reduce prompting. The user should not need to explain the
repository structure when local evidence can answer it.

## Discovery Order

1. Read existing architecture docs first:
   `README*`, `docs/**`, `adr/**`, `architecture/**`, `infra/**`,
   `deployment/**`, and existing `docs/c4/**`.
2. Identify deployable/runtime units:
   Dockerfiles, Compose files, Kubernetes manifests, Terraform/OpenTofu,
   Helm charts, service manifests, package workspaces, binaries, server entry
   points, CLIs, workers, mobile apps, and frontend apps.
3. Identify data stores and state:
   migrations, schema files, ORM config, embedded databases, object storage,
   filesystem paths, queues, caches, search indexes, and external stateful
   services.
4. Identify external systems:
   SDKs, API clients, webhooks, OAuth/OIDC config, payment/email/push/storage
   providers, cloud services, monitoring, identity, and deployment platforms.
5. Identify security-relevant flows:
   auth, authorization, secrets, admin endpoints, public network entry points,
   sensitive data, encryption, tenancy, audit logs, and backup/restore paths.
6. Identify useful scenarios:
   setup, login/auth, primary user workflow, data ingest, sync, background jobs,
   admin/operations, and failure/recovery paths.

## Evidence Capture

Maintain a compact evidence list while modeling:

```text
confirmed:
- <fact> (<file/path or user input>)
inferred:
- <fact> (why it is plausible)
unknown:
- <question or missing fact>
```

Do not put every source file into the README. Summarize the evidence that
materially affects the model.

## Scope Decision

Choose the system of interest from evidence in this order:

1. Existing architecture docs or user-provided scope.
2. The main product/application described by the root README.
3. The deployable system represented by the repository.
4. For monorepos, the bounded domain containing the changed or requested area.

If two plausible scopes would produce materially different diagrams, ask one
short clarification question before editing.

## Diagram Selection Defaults

For first-time C4 docs:

- Always create System Context and Container views.
- Create one Component view only for the most architecturally important
  container, unless evidence shows another container needs it more.
- Add Dynamic or Deployment views only when they clarify an important workflow or
  topology that Context/Container/Component views cannot explain.

For updates:

- Update existing views before adding new ones.
- Add a new view only when an existing view would become crowded or mixed-level.
