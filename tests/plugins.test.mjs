import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";
import { assistants, checkPlugins, repositoryRoot } from "../scripts/check-plugins.mjs";

const release = JSON.parse(readFileSync(join(repositoryRoot, "release.json"), "utf8"));
const request = JSON.stringify({ jsonrpc: "2.0", id: 1, method: "initialize", params: {
  protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "plugin-test", version: "1" },
} });

function runResolver(plugin, product, stateRoot) {
  const result = spawnSync(process.execPath, [join(plugin, "resolver.mjs"), product.product], {
    input: `${request}\n`, encoding: "utf8", timeout: 10_000,
    env: { ...process.env, ALGOROVER_PLUGIN_STATE_ROOT: stateRoot },
  });
  assert.ifError(result.error);
  assert.equal(result.status, 0, result.stderr);
  const response = JSON.parse(result.stdout.trim());
  assert.equal(response.id, 1);
  assert.equal(response.result.serverInfo.version, product.version);
  assert.equal(response.result.serverInfo.name, `algorover-ready-bridge-${product.product}`);
}

test("all marketplace paths, host bindings, skills and release digests are consistent", () => {
  assert.equal(checkPlugins(), assistants.length * release.products.length);
});

for (const assistant of assistants) {
  for (const product of release.products) {
    test(`${assistant}/${product.name} initializes using only its own manifest`, () => {
      const temporary = mkdtempSync(join(tmpdir(), "algorover-plugin-test-"));
      try {
        runResolver(join(repositoryRoot, "plugins", assistant, product.name), product, join(temporary, "state"));
      } finally {
        rmSync(temporary, { recursive: true, force: true });
      }
    });
    const live = release.products.find((product) => product.product === "live");
    if (product !== live) continue;
    test(`${assistant} VPS bundle contains a working assistant-specific resolver`, () => {
      const temporary = mkdtempSync(join(tmpdir(), "algorover-vps-bundle-test-"));
      try {
        const plugin = join(temporary, "plugin");
        cpSync(join(repositoryRoot, "plugins", assistant, product.name), plugin, { recursive: true });
        const resolverPath = join(plugin, "resolver.mjs");
        const source = readFileSync(resolverPath, "utf8");
        const boundary = source.indexOf("const input = createInterface({ input: process.stdin");
        assert(boundary > 0, "Resolver stdio entry point not found");
        // Exercise the actual bundle builder without SSH, network or Runtime startup.
        const harness = join(plugin, "bundle-test.mjs");
        writeFileSync(harness, `${source.slice(0, boundary)}\nconsole.log(JSON.stringify(remoteBundle()));\n`);
        const built = spawnSync(process.execPath, [harness, "live"], {
          encoding: "utf8", timeout: 10_000,
          env: { ...process.env, ALGOROVER_PLUGIN_STATE_ROOT: join(temporary, "state") },
        });
        assert.ifError(built.error);
        assert.equal(built.status, 0, built.stderr);
        const bundle = JSON.parse(built.stdout);
        assert(bundle.files.some((file) => file.path === `.${assistant}-plugin/plugin.json`));
        const vps = join(temporary, "vps");
        for (const file of bundle.files) {
          assert(!assistants.filter((name) => name !== assistant)
            .some((name) => file.path.startsWith(`.${name}-plugin/`)));
          const bytes = Buffer.from(file.data, "base64");
          assert.equal(createHash("sha256").update(bytes).digest("hex"), file.sha256);
          const destination = join(vps, file.path);
          mkdirSync(dirname(destination), { recursive: true });
          writeFileSync(destination, bytes);
        }
        runResolver(vps, product, join(temporary, "vps-state"));
      } finally {
        rmSync(temporary, { recursive: true, force: true });
      }
    });
  }
}
