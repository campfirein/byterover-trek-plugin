import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");

async function readJson(path) {
  return JSON.parse(await readFile(resolve(root, path), "utf8"));
}

async function readText(path) {
  return readFile(resolve(root, path), "utf8");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const plugin = await readJson("byterover/plugin.json");
const packageManifest = await readJson("package.json");
const claudePlugin = await readJson("byterover/.claude-plugin/plugin.json");
const codexMarketplace = await readJson(".agents/plugins/marketplace.json");
const claudeMarketplace = await readJson(".claude-plugin/marketplace.json");
const source = await readJson("SOURCE.json");
const installer = await readText("byterover/INSTALL_AGENT.md");
const pluginReadme = await readText("byterover/README.md");
const repositoryReadme = await readText("README.md");

const version = plugin.version;

assert(plugin.name === "byterover", "Portable plugin name must be byterover");
assert(/^\d+\.\d+\.\d+$/.test(version), "Portable plugin version must use semantic versioning");
assert(packageManifest.version === plugin.version, "Distribution package version must match portable plugin version");
assert(claudePlugin.version === plugin.version, "Claude plugin version must match portable plugin version");
assert(codexMarketplace.name === "byterover-trek", "Codex marketplace name must be byterover-trek");
assert(codexMarketplace.interface?.displayName === "ByteRover Trek", "Codex marketplace must define its display name");
assert(codexMarketplace.plugins[0]?.source?.path === "./byterover", "Codex marketplace must use ./byterover");
assert(codexMarketplace.plugins[0]?.category === "Productivity", "Codex marketplace must define a category");
assert(codexMarketplace.plugins[0]?.policy?.installation === "AVAILABLE", "Codex marketplace must allow installation");
assert(codexMarketplace.plugins[0]?.policy?.authentication === "ON_INSTALL", "Codex marketplace must request authentication on install");
assert(claudeMarketplace.name === "byterover-trek", "Claude marketplace name must be byterover-trek");
assert(claudeMarketplace.plugins[0]?.source === "./byterover", "Claude marketplace must use ./byterover");
assert(claudeMarketplace.plugins[0]?.version === plugin.version, "Claude marketplace version must match plugin version");
assert(source.environment === "dev", "SOURCE.json must identify the dev environment");
assert(/^[a-f0-9]{40}$/.test(source.commit), "SOURCE.json must identify a full Trek source commit");
assert(installer.includes("distribution-channel: development"), "Installer must identify the development channel");
assert(installer.includes("mcp-server-url: https://dev-mcp.byterover.ai/mcp"), "Installer must use the development MCP endpoint");
assert(installer.includes("stop and report the conflict"), "Installer must preserve conflicting user configuration");
const isLegacyRelease =
  plugin.version === "0.1.2" &&
  source.commit === "f118ab552d1fc29cc235a5a9181b8709e63394b4" &&
  source.version === undefined &&
  source.tag === undefined;

if (!isLegacyRelease) {
  assert(source.version === plugin.version, "SOURCE.json version must match the plugin version");
  assert(source.tag === `plugin-v${plugin.version}`, "SOURCE.json tag must match the source release");
  assert(!installer.includes("marketplace-ref:"), "Installer must follow the marketplace release stream");
  assert(installer.includes("Migrate the marketplace at most once."), "Installer must bound marketplace migration");
  assert(pluginReadme.includes("https://github.com/campfirein/byterover-trek-plugin"), "Plugin README must identify the marketplace repository");
  assert(repositoryReadme.includes("[packaged installation contract](byterover/INSTALL_AGENT.md)"), "Repository README must route agents through the packaged installation contract");
  assert(repositoryReadme.includes("https://github.com/campfirein/byterover-trek-plugin"), "Repository README must identify the marketplace repository");
  for (const text of [installer, pluginReadme, repositoryReadme]) {
    assert(!text.includes("--ref "), "Generated installation documentation must not pin a marketplace ref");
    assert(!text.includes(".git#"), "Generated installation documentation must not pin a marketplace ref");
    assert(!text.includes("/blob/"), "Generated installation documentation must not expose an internal release path");
    assert(!text.includes("require a release tag or full commit in the file URL"), "Generated installation documentation must not require a pinned file URL");
  }
}

const mcpFiles = [
  "byterover/mcp.json",
  "byterover/.mcp.json",
  "byterover/.cursor/mcp.json"
];

for (const file of mcpFiles) {
  const text = await readText(file);
  assert(text.includes("https://dev-mcp.byterover.ai/mcp"), `${file} must use the development MCP endpoint`);
  assert(!text.includes("https://mcp.byterover.ai"), `${file} must not use the production MCP endpoint`);
}

const portableMcp = await readJson("byterover/mcp.json");
const portableServer = portableMcp.mcpServers?.byterover;
assert(portableServer?.type === "streamable-http", "Portable MCP manifest must use streamable-http");
assert(portableServer?.url === "https://dev-mcp.byterover.ai/mcp", "Portable MCP manifest must use the development endpoint");
assert(portableServer?.extensions === undefined, "Portable MCP manifest must use host OAuth discovery");

const documentedTools = [
  "byterover_search",
  "byterover_answer",
  "byterover_read_document",
  "byterover_get_operation",
  "byterover_put_document",
  "byterover_delete_drive"
];

const cursorRule = await readText("byterover/.cursor/rules/byterover.mdc");
for (const tool of documentedTools) {
  assert(cursorRule.includes(tool), `Cursor rule must include ${tool}`);
}

const mainSkill = (await readText("byterover/skills/byterover/SKILL.md"))
  .replace(/^---\n[\s\S]*?\n---\n/u, "")
  .trim();
const referencePaths = [
  "byterover/skills/byterover/references/search-and-answer.md",
  "byterover/skills/byterover/references/content-management.md",
  "byterover/skills/byterover/references/drive-administration.md",
  "byterover/skills/byterover/references/errors-and-operations.md"
];
const references = await Promise.all(referencePaths.map(async (path) => (await readText(path)).trim()));
const renderedSkill = [mainSkill, ...references].join("\n\n");
const hash = createHash("sha256").update(renderedSkill).digest("hex");
const sourceHash = cursorRule.match(/source-sha256:\s*([a-f0-9]{64})/)?.[1];
assert(sourceHash === hash, "Cursor rule source hash must match the portable skill files");
assert(cursorRule.includes(renderedSkill), "Cursor rule must contain the rendered portable skill");

console.log("ByteRover Trek plugin distribution is valid.");
