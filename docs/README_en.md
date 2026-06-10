# X/Twitter Keyword Blocker

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![Platform](https://img.shields.io/badge/platform-Chrome%20%7C%20Tampermonkey-orange.svg)

**Language:**
[🇨🇳 中文](../README.md) · [🇺🇸 English](README_en.md) · [🇯🇵 日本語](README_ja.md) · [🇰🇷 한국어](README_ko.md) · [🇩🇪 Deutsch](README_de.md) · [🇪🇸 Español](README_es.md)

</div>

---

## 📖 Introduction

**X/Twitter Keyword Blocker** is a lightweight browser tool that automatically hides tweets and comments on X (formerly Twitter) containing specific keywords. It supports both **Chrome Extension** and **Tampermonkey userscript** modes, giving you a clean, focused browsing experience.

> [!IMPORTANT]
> **The default keyword list is written in Chinese** and targets Chinese-language spam patterns. Before using this tool, you **must replace or add your own keywords** in your language — otherwise the blocker will have no effect on non-Chinese content. (Keyword filtering supports both **tweet text** and **user display names**).
>
> - **Chrome Extension**: Click the extension icon → add your keywords (changes are saved and applied automatically)
> - **Tampermonkey**: Edit the `BLOCKED_KEYWORDS` array in the script and set `MAX_EMOJI_COUNT` as needed

### ✨ Features

- 🚫 **Keyword Filtering** — Automatically hides tweets/comments whose text or author name contains blocked keywords
- 😶 **Emoji Flood Detection** — Blocks tweets/users whose content or display name contains more emojis than your configured threshold (default: > 2)
- ⚡ **Real-time** — Uses MutationObserver to catch dynamically loaded content on scroll
- 💾 **Persistent Storage** — Chrome Extension syncs your keyword list via Chrome storage
- 🎨 **Visual Management UI** — The Chrome Extension offers a polished popup to manage keywords and adjust the emoji threshold
- 🪶 **Zero Dependencies** — Pure vanilla JS, no performance overhead
- 🔒 **Privacy-first** — Everything runs locally; no data is ever uploaded

---

## 🚀 Two Ways to Use

> Choose either method — both have equivalent filtering functionality.

---

### Option 1: Chrome Extension (Recommended)

The Chrome Extension provides a visual keyword management interface — no code editing needed.

#### Installation

**1. Download the extension**

Clone or download this repository and locate the `chrome-extension/` folder.

```bash
git clone https://github.com/pengjinlong/x-twitter-blocker.git
```

**2. Open Chrome Extensions page**

Navigate to:

```
chrome://extensions/
```

**3. Enable Developer Mode**

Toggle on **"Developer mode"** in the top-right corner of the page.

**4. Load the extension**

Click **"Load unpacked"** in the top-left, then select the `chrome-extension/` folder from this project.

**5. Done!**

Once installed, visit [x.com](https://x.com) or [twitter.com](https://twitter.com) and click the extension icon in your browser toolbar to manage keywords.

#### Usage

| Action | Description |
|--------|-------------|
| Click extension icon | Opens the settings popup |
| Type keyword + click "Add" | Adds a new blocked keyword (Enter key works; saves automatically) |
| Click `×` next to a keyword | Removes that keyword (saves automatically) |
| Click "Clear All" | Clears all keywords |
| Click `−` / `+` on the Emoji limit | Adjusts the emoji flood threshold (saves automatically; default 2; 0 to disable) |

> **About Emoji Flood Detection**: Spam accounts on X/Twitter often pack their display names or posts with large numbers of emoji (e.g. 🌸🔥💋✨🎀…). This feature counts both Twitter's rendered emoji `<img>` tags and raw Unicode emoji characters, hiding content that exceeds the threshold.

---

### Option 2: Tampermonkey Userscript

Best for users who already have Tampermonkey installed and prefer editing code directly.

#### Installation

**1. Install Tampermonkey**

Install [Tampermonkey](https://www.tampermonkey.net/) from your browser's extension store.

**2. Install the script**

- Open the Tampermonkey dashboard
- Click **"+"** to create a new script
- Paste the entire contents of [`index.js`](../index.js)
- Press `Ctrl + S` to save

**3. Configure keywords & emoji threshold**

Find the configuration section at the top of the script and edit the following:

```javascript
// Blocked keyword list
const BLOCKED_KEYWORDS = [
    'spam word',
    'another word',
    // Add your own keywords here
];

// Emoji flood threshold — hide content with more emojis than this number
// Set to 0 to disable this feature
const MAX_EMOJI_COUNT = 2;
```

**4. Done!**

Refresh your X/Twitter tab and the script takes effect immediately.

---

## 📁 Project Structure

```
x-twitter-blocker/
├── index.js                    # Tampermonkey userscript
├── chrome-extension/           # Chrome Extension
│   ├── manifest.json           # Extension manifest (v3)
│   ├── content.js              # Content script (core filtering logic)
│   ├── popup.html              # Popup UI
│   ├── popup.js                # Popup interaction logic
│   └── icons/                  # Extension icons
├── docs/                       # Multilingual documentation
├── LICENSE                     # MIT License
└── README.md                   # Default README (Chinese)
```

---

## 🛠 How It Works

1. **DOM Observation** — Uses `MutationObserver` to detect when X loads new tweets dynamically
2. **Keyword Matching** — Inspects both `div[data-testid="tweetText"]` (post body) and `div[data-testid="User-Name"] span[dir="ltr"]` (display name) against the keyword list
3. **Emoji Counting** — Twitter renders most emoji as `<img draggable="false">` tags; remaining Unicode emoji are caught via `\p{Extended_Pictographic}` regex — both are summed for the threshold check
4. **Instant Hiding** — Any element matching a keyword or exceeding the emoji limit is hidden via `display: none`
5. **Performance** — Elements are tagged with `data-filtered` to avoid redundant re-processing

---

## 🤝 Contributing

Issues and Pull Requests are welcome!

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add: my feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

See [CONTRIBUTING.md](../CONTRIBUTING.md) for details.

---

## 📄 License

This project is licensed under the [MIT License](../LICENSE).

---

<div align="center">

⭐ If you find this useful, please give it a Star!

</div>
