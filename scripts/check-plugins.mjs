import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
export const assistants = ["codex", "claude", "cursor"];

function files(root, prefix = "") {
  // Match pathlib's component ordering used by marketplace-sync's tree_digest.
  return readdirSync(join(root, prefix), { withFileTypes: true })
    .sort((left, right) => left.name < right.name ? -1 : left.name > right.name ? 1 : 0).flatMap((entry) => {
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
    assert(!entry.isSymbolicLink(), `Plugin contains a symlink: ${relative}`);
    return entry.isDirectory() ? files(root, relative) : [relative];
  });
}

export function treeDigest(root) {
  const digest = createHash("sha256");
  for (const relative of files(root)) {
    digest.update(`${relative}\0`);
    digest.update(createHash("sha256").update(readFileSync(join(root, relative))).digest());
  }
  return `sha256:${digest.digest("hex")}`;
}

export function checkPlugins(root = repositoryRoot) {
  const json = (path) => JSON.parse(readFileSync(join(root, path), "utf8"));
  const release = json("release.json");
  let checked = 0;
  for (const assistant of assistants) {
    const marketplacePath = assistant === "codex"
      ? ".agents/plugins/marketplace.json" : `.${assistant}-plugin/marketplace.json`;
    const marketplace = json(marketplacePath);
    assert.equal(marketplace.plugins.length, release.products.length, marketplacePath);
    for (const product of release.products) {
      const relative = `plugins/${assistant}/${product.name}`;
      const plugin = join(root, relative);
      const inventory = files(plugin);
      const manifestPath = `.${assistant}-plugin/plugin.json`;
      const manifest = json(`${relative}/${manifestPath}`);
      assert.equal(manifest.name, product.name, relative);
      assert.equal(manifest.version, product.version, relative);
      assert.equal(json(`${relative}/delivery.json`).product_version, product.version, relative);
      const entry = marketplace.plugins.find((entry) => entry.name === product.name);
      const source = assistant === "codex" ? entry?.source?.path : entry?.source;
      assert.equal(source?.replace(/^\.\//, ""), relative, marketplacePath);

      const foreign = assistants.filter((name) => name !== assistant);
      for (const path of inventory) {
        assert(!foreign.some((name) => path.startsWith(`.${name}-plugin/`)), `${relative}/${path}`);
        if (path.endsWith(".md") || path.endsWith(".mjs") || path.endsWith(".json")) {
          const content = readFileSync(join(plugin, path), "utf8");
          // Case-sensitive names distinguish the Cursor assistant from pagination/ZIP cursors.
          for (const name of foreign) {
            const label = { codex: "Codex", claude: "Claude", cursor: "Cursor" }[name];
            assert(!new RegExp(`\\b${label}\\b|\\.${name}-plugin|${name.toUpperCase()}_PLUGIN_ROOT|com\\.${name === "codex" ? "openai" : name}`).test(content),
              `${relative}/${path} references ${name}`);
          }
        }
      }

      const mcpPath = assistant === "cursor" ? "mcp.json" : ".mcp.json";
      assert.equal(manifest.mcpServers, `./${mcpPath}`, relative);
      assert(!inventory.includes(assistant === "cursor" ? ".mcp.json" : "mcp.json"), relative);
      const server = json(`${relative}/${mcpPath}`).mcpServers[`algorover-${product.product}`];
      assert.equal(server.command, "node", relative);
      assert.deepEqual(server.args, [assistant === "codex" ? "./resolver.mjs"
        : `\${${assistant.toUpperCase()}_PLUGIN_ROOT}/resolver.mjs`, product.product], relative);
      if (assistant !== "codex") {
        for (const field of ["cwd", "enabled", "env_vars", "startup_timeout_sec", "tool_timeout_sec"]) {
          assert(!(field in server), `${relative}: unsupported MCP field ${field}`);
        }
      }
      assert.equal(treeDigest(plugin), product[`${assistant}_content_digest`], `${relative}: stale release digest`);
      checked++;
    }
  }
  return checked;
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  console.log(`Validated ${checkPlugins()} assistant-specific plugins.`);
}
