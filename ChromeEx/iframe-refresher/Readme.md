# Iframe Refresher

A lightweight Chrome/Chromium browser extension that lets you instantly reload selected iframes on any webpage. It supports per-domain rules, custom keyboard shortcuts and a convenient popup UI built with Manifest V3.

---

## ✨ Features

• Detects and lists every iframe present on the active tab.
• Choose the **attribute** (`name`, `id`, `data-*`, …) and **value** that identifies the iframe(s) you want to target.
• One-click manual refresh of individual iframes from the popup.
• Record a custom multi-key shortcut (e.g. `Cmd + Shift + R`) to refresh matching iframes without opening the popup.
• Per-domain settings are stored with `chrome.storage.sync` so they follow you across devices.
• Written in plain JavaScript & CSS—no build step required.

---

## 🚀 Getting Started

### Load the extension locally

1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (toggle in the top-right corner).
4. Click **Load unpacked** and select the `iframe-refresher` directory.
5. A blue icon will appear in the toolbar—pin it for quick access.

---

## 🛠 Usage

1. Navigate to a page that contains one or more iframes.
2. Click the Iframe Refresher icon to open the popup.
3. The popup shows:

   - **Current domain** you are configuring.
   - **Iframe Selector Settings** — choose attribute & value.
   - **Keyboard Shortcut** recorder.
   - **Detected iframes** (hover to view the full `src`).

4. Enter an attribute (defaults to `name`) and its value that uniquely matches the target iframe(s), then press **Save**.
5. Press **Refresh Iframes** or use your recorded shortcut to reload those iframe(s) at any time.

ℹ️ Hint: Use **Test Shortcut** to verify the shortcut was saved correctly.

---

## 📁 Project Structure

```text
assets/             Icons & images used in the popup
background.js       Service-worker, context menu, messaging
content.js          Injected into web pages, locates & refreshes iframes
popup.html          Popup UI markup
popup.css           Popup styling
popup.js            Popup logic and Chrome API interactions
utils.js            Shared helper functions
manifest.json       Chrome extension manifest (v3)
Readme.md           This file
```
