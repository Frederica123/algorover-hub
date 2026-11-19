# AlgoRover

> **AlgoRover 是一款免费 AI 量化工具，可在 Codex、Claude Code 和 Cursor 中进行策略研究、可复现回测和本地执行。**
>
> 探索 4,000+ 交易策略，通过 AI 对话调整策略，运行可复现回测、交易所模拟交易，以及经用户确认的实盘交易。
>
> **凭证：** API 密钥保留在本地。**Runtime：** 可运行在你的电脑或自有 VPS 上。**许可：** 插件清单、配置和文档采用 MIT 许可；Runtime 为专有软件。

[English](README.md) · [简体中文](README.zh-CN.md) · [한국어](README.ko.md)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./readme-assets/algorover-logo-white.svg">
  <img src="./readme-assets/algorover-logo.png" alt="AlgoRover 标志" width="320">
</picture>

[官网](https://algorover.ai) · [Live 指南](https://algorover.ai/en/live/) · [策略库](https://algorover.ai/en/strategies/) · [策略证据](https://algorover.ai/en/evidence/) · [安全说明](https://algorover.ai/en/security/) · [博客](https://blog.algorover.ai/)

[功能](#功能) · [快速开始](#快速开始) · [工作流程](#工作流程) · [兼容性](#运行要求与兼容性) · [安全](#安全与控制) · [常见问题](#常见问题) · [支持](#文档与支持) · [许可证](#许可证)

[X / Twitter](https://x.com/AlgoRoverQuant) · [Discord](https://discord.gg/DvsA8gQ3Y) · [Telegram](https://t.me/+TGpYk0NlbD4zYTVk)

![AlgoRover Dashboard 和策略结果](./readme-assets/product-overview.png)

描述你的策略问题，检查策略证据，并在本地 Dashboard 中查看结果。

## AlgoRover 是什么？

AlgoRover 原名 EdgePilot，将 AI 助手中的自然语言请求连接到本地策略研究与执行工具。策略库包含 4,000+ 策略，也包括有经验的交易者上传分享的策略。你可以浏览策略库、检查证据，并一键安装策略。

通过 AI 对话修改交易规则、参数、市场和风险限制；也可以导入其他来源的策略，或将自己的想法实现为可复现的历史回测。

AlgoRover Live 使用公开市场数据进行策略发现、配置、比较和回测，数据与报告保留在本地。连接你自己的交易所账户后，可使用交易所模拟交易和自动化实盘交易。开始实盘前，需要你确认策略和风险设置。

已有安装可能仍显示 **EdgePilot** 并使用旧的 `edgepilot` 标识。品牌更名不要求现有用户重装或重命名配置；新安装请使用下方 AlgoRover 命令。

## 功能

| 功能 | AlgoRover Live |
| :--- | :---: |
| 策略发现与配置 | ✓ |
| 历史回测 | ✓ |
| 策略结果与报告 | ✓ |
| 交易所模拟交易 | ✓ |
| 实盘交易 | ✓ |
| 交易凭证 | 按需在本地配置 |

[了解 AlgoRover Live](https://algorover.ai/en/live/)

## 可以用来做什么？

### 寻找值得验证的策略

浏览 4,000+ 策略，按资产、来源和时间周期筛选；检查规则与历史证据，比较候选策略，并一键安装。

```text
找出三个适合研究 BTC、1 小时周期的策略。说明交易规则、数据要求、主要风险和已有证据。不要下单。
```

### 调整策略或导入自己的策略

通过 AI 对话修改交易规则、参数、市场和风险限制，导入外部策略，在执行前回测自己的版本。

```text
为这个策略创建我的本地版本，改为 BTC、1 小时周期。解释规则和参数变化，明确手续费与滑点后进行回测。不要下单。
```

### 不只看回测收益

在得出结论前，检查测试区间、数据、成本、回撤和稳健性。

```text
检查这份回测，说明数据来源、测试区间、参数、手续费、滑点、最大回撤和局限性。指出在相信结果之前还应验证什么。
```

### 准备模拟交易

在执行前检查兼容性和运行限制。

```text
使用 AlgoRover Live 检查这个策略是否支持所选交易所的 Demo 模式。列出所需配置、仓位限制和停止条件。暂时不要启动执行。
```

## 快速开始

选择你的 AI 助手，然后安装 AlgoRover Live。

### Codex

```bash
codex plugin marketplace add Frederica123/algorover-hub --ref main
codex plugin add algorover@algorover
```

### Claude Code

```bash
claude plugin marketplace add Frederica123/algorover-hub@main
claude plugin install algorover@algorover
```

### Cursor

使用 Cursor 专用插件目录：

| 插件 | 插件目录 |
| :--- | :--- |
| AlgoRover Live | `plugins/cursor/algorover` |

将此目录复制到 Cursor 本地插件目录，随后重新加载窗口：

| 平台 | 本地插件目录 |
| :--- | :--- |
| macOS 和 Linux | `~/.cursor/plugins/local/` |
| Windows | `%USERPROFILE%\.cursor\plugins\local\` |

每个助手使用各自的插件副本和宿主配置。Teams 或 Enterprise 用户可通过 **Dashboard → Plugins and MCPs** 导入仓库。

### 开始第一次会话

安装后重新加载插件或新建会话，然后发送：

```text
启动 AlgoRover Live，打开 Dashboard，并开始交互式策略引导。不要启动交易。
```

按照设置提示操作。安装插件与启动 Runtime 是两个独立步骤。

## 工作流程

| 步骤 | 你要做什么 | 检查什么 |
| :--- | :--- | :--- |
| 发现 | 描述一个市场问题 | 策略规则和证据 |
| 配置 | 设置市场、周期和参数 | 数据可用性与假设 |
| 回测 | 请求历史测试 | 成本、回撤和稳健性 |
| 复核 | 检查报告 | 可复现性与局限性 |
| 执行 | 配置支持的运行模式 | 权限、限制和停止条件 |

历史与模拟结果不保证未来表现。

## 工作原理

| 组件 | 用途 |
| :--- | :--- |
| AI 助手 | 描述任务并检查回复 |
| AlgoRover 插件 | 将支持的请求连接到本地 Runtime |
| 本地 Runtime | 执行策略研究、回测和支持的交易任务 |
| Dashboard | 设置、查看结果和运行控制 |

本仓库用于分发插件。Runtime 通过 AlgoRover Live 的公开发布通道单独下载。

## 运行要求与兼容性

- 宿主环境需要能够运行 Node.js。
- AI 助手需要允许所需插件和本地进程。
- Runtime 兼容性取决于操作系统和发布通道。
- Live 登录和凭证配置在 Dashboard 中完成。

安装前请阅读 [Live 指南](https://algorover.ai/en/live/)。

### 交易所兼容性

以下 15 个交易场所支持账户读取与执行集成：

| 交易所或券商 | 账户读取 | 执行集成 |
| :--- | :---: | :---: |
| <img src="./readme-assets/exchanges/alpaca.svg" width="24" height="24" align="absmiddle" alt=""> Alpaca | ✓ | ✓ |
| <img src="./readme-assets/exchanges/aster.png" width="24" height="24" align="absmiddle" alt=""> Aster | ✓ | ✓ |
| <img src="./readme-assets/exchanges/binance.svg" width="24" height="24" align="absmiddle" alt=""> Binance | ✓ | ✓ |
| <img src="./readme-assets/exchanges/bitget.svg" width="24" height="24" align="absmiddle" alt=""> Bitget | ✓ | ✓ |
| <img src="./readme-assets/exchanges/bithumb.png" width="24" height="24" align="absmiddle" alt=""> Bithumb | ✓ | ✓ |
| <img src="./readme-assets/exchanges/bybit.jpg" width="24" height="24" align="absmiddle" alt=""> Bybit | ✓ | ✓ |
| <img src="./readme-assets/exchanges/deribit.svg" width="24" height="24" align="absmiddle" alt=""> Deribit | ✓ | ✓ |
| <img src="./readme-assets/exchanges/dydx.svg" width="24" height="24" align="absmiddle" alt=""> dYdX | ✓ | ✓ |
| <img src="./readme-assets/exchanges/gateio.svg" width="24" height="24" align="absmiddle" alt=""> Gate.io | ✓ | ✓ |
| <img src="./readme-assets/exchanges/hyperliquid.png" width="24" height="24" align="absmiddle" alt=""> Hyperliquid | ✓ | ✓ |
| <img src="./readme-assets/exchanges/kalshi.png" width="24" height="24" align="absmiddle" alt=""> Kalshi | ✓ | ✓ |
| <img src="./readme-assets/exchanges/lighter.png" width="24" height="24" align="absmiddle" alt=""> Lighter | ✓ | ✓ |
| <img src="./readme-assets/exchanges/longbridge.png" width="24" height="24" align="absmiddle" alt=""> Longbridge | ✓ | ✓ |
| <img src="./readme-assets/exchanges/okx.jpg" width="24" height="24" align="absmiddle" alt=""> OKX | ✓ | ✓ |
| <img src="./readme-assets/exchanges/upbit.png" width="24" height="24" align="absmiddle" alt=""> Upbit | ✓ | ✓ |

可用交易模式取决于已安装的适配器与账户环境。Longbridge 需要包含 Longbridge 支持的 Runtime。

## 安全与控制

- Live API 密钥和交易凭证保留在本地。
- 开始实盘交易前，需要你确认策略和风险设置。
- 资金保留在你的交易所账户中，AlgoRover 不托管用户资金。

阅读[安全说明](https://algorover.ai/en/security/)、[隐私政策](https://algorover.ai/privacy/)和[服务条款](https://algorover.ai/terms/)。

## 常见问题

### 安装插件会直接开始交易吗？

不会。安装插件不会启动交易；Runtime 设置和交易执行是独立操作。

### 已安装插件，为什么 Runtime 仍不可用？

重新加载插件或新建会话，然后请求启动 AlgoRover。确认宿主支持本地进程，且你的平台受到支持。

### `runtime_identity_incompatible` 是什么意思？

更新插件并重新加载会话。修复 Runtime 无法改变插件绑定的 Runtime 身份。

## 文档与支持

| 资源 | 用途 |
| :--- | :--- |
| [Live 指南](https://algorover.ai/en/live/) | 模拟交易和实盘执行流程 |
| [策略库](https://algorover.ai/en/strategies/) | 发现、比较和安装策略 |
| [策略证据](https://algorover.ai/en/evidence/) | 可复现研究与压力测试 |
| [安全说明](https://algorover.ai/en/security/) | 凭证、数据与控制边界 |
| [博客](https://blog.algorover.ai/) | 研究方法与示例 |
| [GitHub Issues](https://github.com/Frederica123/algorover-hub/issues) | 安装问题与插件缺陷 |

反馈问题时，请提供插件版本、AI 助手、操作系统、复现步骤和脱敏后的错误信息。不要包含密钥、令牌或私人账户信息。

## 许可证

插件清单、配置文件和文档采用 [MIT 许可证](LICENSE)。具体文件范围及第三方声明见[许可范围](LICENSE-SCOPE.md)。

AlgoRover Runtime 为专有软件，单独分发。MIT 授权不覆盖 Runtime 源码或二进制、交易与回测引擎，以及插件中附带的 `resolver.mjs`、`bootstrap.mjs` 集成代码。Runtime 使用受其适用条款及 [AlgoRover 服务条款](https://algorover.ai/terms/)约束。

## 分发与发布记录

插件市场由源仓库的 `./build.sh marketplace-sync` 命令从生产插件 ZIP 生成。`release.json` 记录输入归档和生成插件的哈希。本仓库不保存凭证、Runtime 或用户状态。

README 图片位于 `readme-assets/`，插件图标位于各插件的 `assets/`。新安装使用的市场 ID 为 `algorover`。

## 插件维护

每个 `plugins/<assistant>/algorover` 目录仅服务于对应的助手。只保留该助手自己的插件清单与 MCP 启动配置；resolver 和 VPS 复制清单都应读取同一份清单。技能文档应使用对应助手的名称。Runtime 代码、发现协议、发布绑定与图标可以在助手间共用。各市场与发布记录仅分发 `algorover` Live 插件。

生成或修改插件后运行：

```bash
node scripts/check-plugins.mjs
node --test tests/plugins.test.mjs
```

上游 `marketplace-sync` 生成器也需要保持助手隔离规则。修改后更新 `release.json` 中生成目录的哈希；输入归档哈希和源内容哈希仍描述原始发布 ZIP。
