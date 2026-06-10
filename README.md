# X/Twitter Keyword Blocker

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![Platform](https://img.shields.io/badge/platform-Chrome%20%7C%20Tampermonkey-orange.svg)

**语言 / Language:**
[🇨🇳 中文](README.md) · [🇺🇸 English](docs/README_en.md) · [🇯🇵 日本語](docs/README_ja.md) · [🇰🇷 한국어](docs/README_ko.md) · [🇩🇪 Deutsch](docs/README_de.md) · [🇪🇸 Español](docs/README_es.md)

</div>

---

## 📖 简介

**X/Twitter Keyword Blocker** 是一款轻量级的浏览器工具，可自动隐藏 X（原 Twitter）上包含特定关键词的推文和评论。支持 **Chrome 扩展** 和 **Tampermonkey 油猴脚本** 两种使用方式，帮助你打造干净、清爽的浏览体验。

### ✨ 功能特点

- 🚫 **关键词过滤** — 自动隐藏推文正文或用户昵称包含指定关键词的内容
- 😶 **Emoji 超限屏蔽** — 自动屏蔽正文或昵称中 emoji 数量超过阈值的账号（默认 > 2 个）
- ⚡ **实时生效** — 动态监听页面内容变化，滚动加载的内容也会被过滤
- 💾 **关键词持久化** — 自动在浏览器本地保存您的关键词配置，无需重复输入
- 🎨 **可视化管理界面** — Chrome 扩展提供精美的弹窗 UI，支持增删关键词与调整 emoji 阈值
- 🪶 **轻量无依赖** — 纯原生 JS 实现，不影响页面性能
- 🔒 **隐私安全** — 所有处理均在本地完成，不上传任何数据

---

## 🚀 两种使用方式

> 根据你的喜好选择其中一种，两者功能等效。

---

### 方式一：Chrome 扩展（推荐）

Chrome 扩展提供可视化的关键词管理界面，无需修改任何代码。

#### 安装步骤

**1. 下载扩展文件**

下载或克隆本仓库，找到 `chrome-extension/` 文件夹。

```bash
git clone https://github.com/pengjinlong/x-twitter-blocker.git
```

**2. 打开 Chrome 扩展管理页**

在地址栏输入并访问：

```
chrome://extensions/
```

**3. 开启开发者模式**

点击页面右上角的 **「开发者模式」** 开关，将其打开。

**4. 加载扩展**

点击左上角的 **「加载已解压的扩展程序」** 按钮，选择本项目的 `chrome-extension/` 文件夹。

**5. 完成！**

扩展安装成功后，访问 [x.com](https://x.com) 或 [twitter.com](https://twitter.com)，点击浏览器右上角的扩展图标即可管理关键词。

#### 使用说明

| 操作 | 说明 |
|------|------|
| 点击扩展图标 | 打开设置弹窗 |
| 输入关键词 + 点击「添加」 | 添加新屏蔽关键词（支持回车键，自动保存生效） |
| 点击关键词旁边的 `×` | 删除该关键词（自动保存生效） |
| 点击「清空全部」 | 清除所有关键词 |
| 点击 Emoji 阈值的 `−` / `+` | 调整 emoji 超限屏蔽阈值（自动保存，默认 2，设为 0 则关闭） |

> **Emoji 超限说明**：X/Twitter 上部分垃圾账号昵称或内容中会堆砌大量 emoji（如 🌸🔥💋✨🎀…）。本功能会同时统计 Twitter 渲染的 emoji 图片和 Unicode emoji 字符，总数超过阈值时自动隐藏，有效过滤此类内容。

---

### 方式二：Tampermonkey 油猴脚本

油猴脚本方式适合已安装 Tampermonkey 的用户，通过直接修改代码配置关键词。

#### 安装步骤

**1. 安装 Tampermonkey**

前往浏览器扩展商店搜索并安装 [Tampermonkey](https://www.tampermonkey.net/)。

**2. 安装脚本**

- 打开 Tampermonkey 管理面板
- 点击 **「+」** 新建脚本
- 将 [`index.js`](index.js) 的全部内容粘贴进去
- 按 `Ctrl + S` 保存

**3. 修改关键词 & emoji 阈值**

打开脚本，找到配置区，编辑以下两项：

```javascript
// 屏蔽关键词列表
const BLOCKED_KEYWORDS = [
    'sao货',
    '加微',
    // 在这里添加你想屏蔽的词
    '你的关键词'
];

// Emoji 超限阈值（正文或昵称中 emoji 数量超过此值则屏蔽）
// 设为 0 可关闭此功能
const MAX_EMOJI_COUNT = 2;
```

**4. 完成！**

刷新 X/Twitter 页面，脚本即刻生效。

---

## 📁 项目结构

```
x-twitter-blocker/
├── index.js                    # Tampermonkey 油猴脚本
├── chrome-extension/           # Chrome 扩展
│   ├── manifest.json           # 扩展配置文件
│   ├── content.js              # 内容脚本（核心过滤逻辑）
│   ├── popup.html              # 弹窗界面
│   ├── popup.js                # 弹窗交互逻辑
│   └── icons/                  # 扩展图标
│       ├── icon16.png
│       ├── icon32.png
│       ├── icon48.png
│       └── icon128.png
├── docs/                       # 多语言文档
│   ├── README_en.md
│   ├── README_ja.md
│   ├── README_ko.md
│   ├── README_de.md
│   └── README_es.md
├── LICENSE                     # MIT 开源协议
└── README.md                   # 本文件（中文）
```

---

## 🛠 技术原理

1. **DOM 监听**：使用 `MutationObserver` 监听 X/Twitter 页面的动态内容变化
2. **关键词匹配**：遍历 `div[data-testid="cellInnerDiv"]` 元素，同时检测 `div[data-testid="tweetText"]`（正文）和 `div[data-testid="User-Name"] span[dir="ltr"]`（昵称）
3. **Emoji 计数**：Twitter 将 emoji 渲染为 `<img draggable="false">` 标签，同时文本节点中也可能存在 Unicode emoji（`\p{Extended_Pictographic}`），两种均纳入统计
4. **即时隐藏**：命中任一规则的元素通过 `display: none` 立即隐藏
5. **性能优化**：已处理的元素添加 `data-filtered` 标记，避免重复扫描

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/新功能`)
3. 提交更改 (`git commit -m 'Add: 新功能描述'`)
4. 推送到分支 (`git push origin feature/新功能`)
5. 发起 Pull Request

详情请查看 [CONTRIBUTING.md](CONTRIBUTING.md)。

---

## 📄 开源协议

本项目遵循 [MIT License](LICENSE) 开源协议，可自由使用、修改和分发。

---

<div align="center">

⭐ 如果觉得有用，请给个 Star！

</div>
