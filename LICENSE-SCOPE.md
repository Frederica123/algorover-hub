# License scope

Copyright (c) 2026 AlgoRover.

## Files covered by the MIT License

The permission granted in [LICENSE](LICENSE) applies only to the following
AlgoRover-authored plugin manifests, configuration files, and documentation in
this repository:

- `.agents/plugins/marketplace.json`
- `.claude-plugin/marketplace.json`
- `.cursor-plugin/marketplace.json`
- `release.json` and `.prettierignore`
- `plugins/*/algorover/.codex-plugin/plugin.json`
- `plugins/*/algorover/.claude-plugin/plugin.json`
- `plugins/*/algorover/.cursor-plugin/plugin.json`
- `plugins/*/algorover/.mcp.json` and `plugins/*/algorover/mcp.json`
- `plugins/*/algorover/delivery.json`
- `plugins/*/algorover/strategy-discover-input.json`
- `plugins/*/algorover/strategy-discover-output.json`
- `plugins/*/algorover/.gitattributes`
- `plugins/*/algorover/skills/**/*.md`
- `README.md`, `README.zh-CN.md`, `README.ko.md`, and this scope document
- `.github/workflows/*.yml` and `.github/workflows/*.yaml`

In these paths, `*` matches a single directory component and `**` matches any
number of directory components. Keep both LICENSE and LICENSE-SCOPE.md with
copies of covered files so that the grant and its scope remain clear.

## Proprietary Runtime and integration code

The AlgoRover Runtime is proprietary. Runtime source code, downloadable Runtime
packages and binaries, trading and backtest engines, services, and separately
distributed strategy packages are not covered by this MIT grant. Downloading or
launching them through a plugin does not license them under MIT.

The `resolver.mjs` and `bootstrap.mjs` files distributed with the plugins are
integration and delivery code and are also excluded from this MIT grant. Files
not listed in the MIT coverage above remain all rights reserved unless a
separate license or notice expressly grants rights.

Runtime use is governed by the terms supplied with the Runtime and the
[AlgoRover Terms of Service](https://algorover.ai/terms/). This document does not
grant permission to copy, modify, sublicense, or redistribute the proprietary
components.

## Third-party assets and trademarks

Third-party icons and other assets retain their own licenses and notices. See
[Exchange icon sources](readme-assets/exchanges/SOURCES.md) for attribution and
license details. The MIT grant does not grant trademark rights in AlgoRover or
third-party names, logos, and marks.
