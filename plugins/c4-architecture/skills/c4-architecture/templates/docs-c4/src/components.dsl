!element system.api {
    controller = component "Request Handlers" "Handles inbound API requests." "Framework"
    service = component "Application Services" "Coordinates business operations." "Technology"
    repository = component "Persistence Adapter" "Reads and writes application data." "Technology"
    auth = component "Authorization Component" "Checks permissions for protected operations." "Technology" "Identity"
}

system.web -> system.api.controller "Calls" "HTTPS/JSON"
system.api.controller -> system.api.auth "Checks permissions"
system.api.controller -> system.api.service "Delegates work"
system.api.service -> system.api.repository "Loads and stores data"
system.api.repository -> system.database "Reads and writes" "Encrypted connection"
system.api.auth -> identityProvider "Validates identity claims" "HTTPS/OIDC"
