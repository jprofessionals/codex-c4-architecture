workspace "System Name" "C4 architecture model for System Name." {
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
