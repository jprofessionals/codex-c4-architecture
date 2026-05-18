user = person "User" "A person who uses the system."

system = softwareSystem "System Name" "System of interest." {
    web = container "Web Application" "Provides the user interface." "Technology" "WebBrowser"
    api = container "Backend API" "Handles business capabilities and integrations." "Technology"
    database = container "Database" "Stores application data." "Technology" "Database,SensitiveData"
}

identityProvider = softwareSystem "Identity Provider" "Authenticates users." "External,Identity"

user -> system "Uses"
system.web -> system.api "Calls" "HTTPS/JSON"
system.api -> system.database "Reads and writes" "Encrypted connection"
system.api -> identityProvider "Validates tokens" "HTTPS/OIDC"
