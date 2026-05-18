#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pluginRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(pluginRoot, "..", "..");

const errors = [];
const missing = new Set();

function rel(file) {
  return path.relative(repoRoot, file) || ".";
}

function exists(file) {
  return fs.existsSync(file);
}

function requireFile(file) {
  if (!exists(file)) {
    const key = rel(file);
    if (!missing.has(key)) {
      missing.add(key);
      errors.push(`Missing required file: ${key}`);
    }
    return false;
  }
  return true;
}

function readJson(file, label) {
  if (!requireFile(file)) return null;
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    errors.push(`${label} is not valid JSON: ${error.message}`);
    return null;
  }
}

function readText(file) {
  if (!requireFile(file)) return "";
  return fs.readFileSync(file, "utf8");
}

function readFrontmatter(file) {
  const text = readText(file);
  if (!text) return null;

  const match = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) {
    errors.push(`Skill lacks YAML frontmatter: ${rel(file)}`);
    return null;
  }

  const fm = match[1];
  const name = fm.match(/^name:\s*(.+)$/m)?.[1]?.trim();
  const description = fm.match(/^description:\s*(.+)$/m)?.[1]?.trim();

  if (!name) errors.push(`Skill frontmatter missing name: ${rel(file)}`);
  if (!description) {
    errors.push(`Skill frontmatter missing description: ${rel(file)}`);
  }

  return { name, description };
}

const skillRoot = path.join(pluginRoot, "skills", "c4-architecture");
const templateRoot = path.join(skillRoot, "templates", "docs-c4");

const requiredFiles = [
  path.join(repoRoot, ".agents", "plugins", "marketplace.json"),
  path.join(repoRoot, "README.md"),
  path.join(repoRoot, "LICENSE"),
  path.join(pluginRoot, ".codex-plugin", "plugin.json"),
  path.join(pluginRoot, ".mcp.json"),
  path.join(pluginRoot, "LICENSE"),
  path.join(pluginRoot, "NOTICE.md"),
  path.join(pluginRoot, "scripts", "validate-plugin.mjs"),
  path.join(skillRoot, "SKILL.md"),
  path.join(skillRoot, "references", "workflow.md"),
  path.join(skillRoot, "references", "documentation-output.md"),
  path.join(skillRoot, "references", "modeling-guardrails.md"),
  path.join(skillRoot, "references", "security-overlay.md"),
  path.join(skillRoot, "references", "structurizr-dsl.md"),
  path.join(skillRoot, "references", "provenance.md"),
  path.join(templateRoot, "Makefile"),
  path.join(templateRoot, "README.md"),
  path.join(templateRoot, "src", "workspace.dsl"),
  path.join(templateRoot, "src", "model.dsl"),
  path.join(templateRoot, "src", "components.dsl"),
  path.join(templateRoot, "src", "views.dsl"),
  path.join(templateRoot, "src", "styles.dsl")
];

for (const file of requiredFiles) {
  requireFile(file);
}

const manifestPath = path.join(pluginRoot, ".codex-plugin", "plugin.json");
const manifest = readJson(manifestPath, "plugin manifest");
if (manifest) {
  if (manifest.name !== "c4-architecture") {
    errors.push(`plugin manifest name must be "c4-architecture", got "${manifest.name}"`);
  }
  if (manifest.skills !== "./skills/") {
    errors.push('plugin manifest must reference skills as "./skills/"');
  }
  if (manifest.mcpServers !== "./.mcp.json") {
    errors.push('plugin manifest must reference MCP config as "./.mcp.json"');
  }
}

readJson(path.join(pluginRoot, ".mcp.json"), "plugin MCP config");

const marketplacePath = path.join(repoRoot, ".agents", "plugins", "marketplace.json");
const marketplace = readJson(marketplacePath, "marketplace");
if (marketplace) {
  const entry = marketplace.plugins?.find((plugin) => plugin.name === "c4-architecture");
  if (!entry) {
    errors.push("marketplace is missing a c4-architecture plugin entry");
  } else {
    if (entry.source?.source !== "local") {
      errors.push('marketplace c4-architecture source.source must be "local"');
    }
    if (entry.source?.path !== "./plugins/c4-architecture") {
      errors.push('marketplace c4-architecture source.path must be "./plugins/c4-architecture"');
    }
    if (!entry.policy?.installation) {
      errors.push("marketplace c4-architecture policy.installation is required");
    }
    if (!entry.policy?.authentication) {
      errors.push("marketplace c4-architecture policy.authentication is required");
    }
    if (!entry.category) {
      errors.push("marketplace c4-architecture category is required");
    }
  }
}

const fm = readFrontmatter(path.join(skillRoot, "SKILL.md"));
if (fm?.name && fm.name !== "c4-architecture") {
  errors.push(`Skill name must be "c4-architecture", got "${fm.name}"`);
}

const skillText = readText(path.join(skillRoot, "SKILL.md"));
if (skillText.includes("skills/c4-architecture/templates")) {
  errors.push("Skill text still references the old top-level skills/c4-architecture path");
}
if (!skillText.includes("Structurizr DSL")) {
  errors.push("Skill text should require Structurizr DSL");
}
if (!skillText.includes("make -C docs/c4 render")) {
  errors.push("Skill text should require the docs/c4 render command");
}
if (!skillText.includes("references/workflow.md")) {
  errors.push("Skill text should lazy-load references/workflow.md");
}
if (!skillText.includes("references/documentation-output.md")) {
  errors.push("Skill text should lazy-load references/documentation-output.md");
}
if (skillText.split(/\r?\n/).length > 60) {
  errors.push("Skill entry point should stay compact at 60 lines or fewer");
}

const makefile = readText(path.join(templateRoot, "Makefile"));
for (const target of ["render", "export-puml", "render-svg", "clean", "help"]) {
  if (!makefile.match(new RegExp(`^${target}:`, "m"))) {
    errors.push(`Template Makefile is missing target: ${target}`);
  }
}
if (!makefile.includes("plantuml/structurizr")) {
  errors.push("Template Makefile should export using plantuml/structurizr");
}

const workspace = readText(path.join(templateRoot, "src", "workspace.dsl"));
for (const include of ["model.dsl", "components.dsl", "views.dsl", "styles.dsl"]) {
  if (!workspace.includes(`!include ${include}`)) {
    errors.push(`workspace.dsl should include ${include}`);
  }
}

if (errors.length > 0) {
  console.error("Validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Validation passed: c4-architecture plugin structure is complete.");
