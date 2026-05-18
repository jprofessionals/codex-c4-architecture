# Security Overlay

C4 diagrams are architecture diagrams, not full threat models, but they should
make security-relevant structure visible.

## Model When Known

- Internet-facing entry points.
- Human actors and privileged/admin actors.
- External systems and third-party services.
- Identity providers, token issuers, and authentication gateways.
- Authorization decision points and policy services.
- Sensitive data stores and data classifications.
- Secrets stores and key-management boundaries.
- Queues, event buses, batch jobs, and async trust boundaries.
- Cross-network, cross-account, cross-tenant, or cross-organization traffic.
- Audit logging, monitoring, and security alert paths.

## Useful Tags

Use these tags consistently in `styles.dsl`:

- `External`
- `Boundary`
- `Internet`
- `Identity`
- `Admin`
- `SensitiveData`
- `Database`
- `Queue`
- `Monitoring`

## Review Questions

- Which elements are outside the team's control?
- Where does untrusted input enter?
- Where is sensitive data stored or transmitted?
- Which paths require authentication?
- Which paths require authorization beyond authentication?
- Which actors have admin or break-glass access?
- Which trust boundary is crossed by each external relationship?
- Are logs/metrics/audit trails part of the architecture?
- What security-relevant information is still unknown?
