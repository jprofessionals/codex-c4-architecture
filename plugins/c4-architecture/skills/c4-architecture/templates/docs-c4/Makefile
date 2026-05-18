# Render Structurizr DSL -> PlantUML -> SVG.
#
# Usage:
#   make render   # generate rendered/*.svg from src/workspace.dsl
#   make clean    # remove generated files
#   make help     # show targets

SHELL := bash
SRC := src/workspace.dsl
OUT := rendered
ROOT := $(shell pwd)

STRUCTURIZR_IMG := docker.io/structurizr/structurizr:latest
PLANTUML_IMG := docker.io/plantuml/plantuml:latest

DOCKER := docker

# Podman rootless needs --userns=keep-id. Docker needs --user UID:GID so
# containers do not write root-owned files into the repository.
ifeq ($(shell $(DOCKER) --version 2>/dev/null | grep -ci podman),1)
USER_FLAGS := --userns=keep-id
else
USER_FLAGS := --user $(shell id -u):$(shell id -g)
endif

.PHONY: render export-puml render-svg clean help

render: export-puml render-svg ## Generate SVG diagrams
	@rm -rf $(OUT)/.java $(OUT)/*.puml
	@echo "Done. SVG files are in $(OUT)/"

export-puml: ## Export Structurizr DSL to PlantUML
	@mkdir -p $(OUT)
	$(DOCKER) run --rm $(USER_FLAGS) \
		-v "$(ROOT)":/work -w /work \
		$(STRUCTURIZR_IMG) \
		export -w $(SRC) -f plantuml/structurizr -o $(OUT)
	@rm -f $(OUT)/*-key.puml

render-svg: ## Render PlantUML files to SVG
	$(DOCKER) run --rm $(USER_FLAGS) \
		-v "$(ROOT)/$(OUT)":/data \
		$(PLANTUML_IMG) \
		-tsvg -nometadata /data/structurizr-*.puml

clean: ## Remove generated files
	rm -rf $(OUT)/*.svg $(OUT)/*.puml $(OUT)/.java

help: ## Show available targets
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "  %-14s %s\n", $$1, $$2}'
