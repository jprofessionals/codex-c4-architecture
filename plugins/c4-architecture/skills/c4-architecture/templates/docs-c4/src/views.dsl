systemContext system "SystemContext" {
    include *
    autoLayout lr
}

container system "Containers" {
    include *
    autoLayout lr
}

component system.api "Components" {
    include *
    autoLayout lr
}
