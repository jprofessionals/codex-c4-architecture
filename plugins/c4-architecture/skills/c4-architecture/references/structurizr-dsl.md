# Structurizr DSL Notes

Use Structurizr DSL as the canonical model. The DSL defines one model and many
views over that model, which prevents context, container, and component diagrams
from drifting apart.

## Recommended Layout

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
```

## Entry Point

`workspace.dsl` should include the other DSL files:

```dsl
workspace "System Name" "Architecture model for System Name." {
    !identifiers hierarchical

    model {
        !include model.dsl
        !include components.dsl
    }

    views {
        !include views.dsl
        !include styles.dsl
    }
}
```

## Minimal Syntax

```dsl
user = person "User" "Uses the system."
system = softwareSystem "System" "System of interest." {
    web = container "Web App" "Serves the user interface." "TypeScript/React" "WebBrowser"
    api = container "API" "Handles business operations." "Java/Spring Boot"
    db = container "Database" "Stores application data." "PostgreSQL" "Database,SensitiveData"
}

user -> system "Uses"
system.web -> system.api "Calls" "HTTPS/JSON"
system.api -> system.db "Reads and writes" "JDBC/TLS"
```

## View Syntax

```dsl
systemContext system "SystemContext" {
    include *
    autoLayout lr
}

container system "Containers" {
    include *
    autoLayout lr
}

component system.api "ApiComponents" {
    include *
    autoLayout lr
}
```

## Rendering

The local Makefile should run:

```bash
make -C docs/c4 render
```

The pipeline is:

1. Structurizr DSL to PlantUML using `plantuml/structurizr`.
2. PlantUML to SVG.

Generated `rendered/*.puml`, `rendered/.java`, and intermediate files are
temporary. Generated `rendered/*.svg` are the Markdown-embeddable output.
