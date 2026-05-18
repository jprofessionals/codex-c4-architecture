styles {
    element "Element" {
        color #ffffff
        stroke #2d3748
        strokeWidth 2
        shape RoundedBox
    }

    element "Person" {
        background #1f77b4
        color #ffffff
        shape Person
    }

    element "Software System" {
        background #2d3748
        color #ffffff
    }

    element "Container" {
        background #3182ce
        color #ffffff
    }

    element "Component" {
        background #63b3ed
        color #1a202c
    }

    element "External" {
        background #edf2f7
        color #1a202c
        stroke #718096
    }

    element "Database" {
        shape Cylinder
    }

    element "Queue" {
        shape Pipe
    }

    element "WebBrowser" {
        shape WebBrowser
    }

    element "Boundary" {
        stroke #dd6b20
        strokeWidth 4
    }

    element "SensitiveData" {
        background #742a2a
        color #ffffff
    }

    element "Identity" {
        background #553c9a
        color #ffffff
    }

    element "Admin" {
        background #975a16
        color #ffffff
    }

    relationship "Relationship" {
        color #4a5568
        thickness 2
    }
}
