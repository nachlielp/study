import { getActiveTabURL } from "./utils.js";

let currentDomain = "";
let currentTab = null;
let isRecordingKeystroke = false;

// Initialize popup when DOM loads
document.addEventListener("DOMContentLoaded", async () => {
  currentTab = await getActiveTabURL();
  currentDomain = new URL(currentTab.url).hostname;

  document.getElementById("domain-name").textContent = currentDomain;

  // Check if we can communicate with content script
  await checkContentScriptConnection();

  // Load existing settings for this domain
  await loadDomainSettings();

  // Detect iframes on the current page
  await detectIframes();

  // Set up event listeners
  setupEventListeners();
});

// Check if content script is loaded and communicating
async function checkContentScriptConnection() {
  const url = currentTab.url;

  // Check if we're on a restricted page
  if (
    url.startsWith("chrome://") ||
    url.startsWith("chrome-extension://") ||
    url.startsWith("moz-extension://") ||
    url.startsWith("about:") ||
    url.startsWith("edge://") ||
    url.startsWith("safari-extension://")
  ) {
    showNotification("Extension cannot run on this type of page", "error");
    disableControls();
    return false;
  }

  // Try to ping the content script
  try {
    const response = await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("Content script timeout"));
      }, 2000);

      chrome.tabs.sendMessage(currentTab.id, { type: "PING" }, (response) => {
        clearTimeout(timeout);
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else {
          resolve(response);
        }
      });
    });

    console.log("Content script is responding");
    return true;
  } catch (error) {
    console.log(
      "Content script not responding, attempting to inject:",
      error.message
    );

    // Try to inject the content script manually
    try {
      await chrome.scripting.executeScript({
        target: { tabId: currentTab.id },
        files: ["content.js"],
      });

      // Wait a bit for initialization
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Try ping again
      const response = await new Promise((resolve, reject) => {
        chrome.tabs.sendMessage(currentTab.id, { type: "PING" }, (response) => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
          } else {
            resolve(response);
          }
        });
      });

      console.log("Content script successfully injected and responding");
      return true;
    } catch (injectionError) {
      console.error("Failed to inject content script:", injectionError);
      showNotification(
        "Cannot communicate with page. Try refreshing the page.",
        "error"
      );
      disableControls();
      return false;
    }
  }
}

// Disable controls when content script is not available
function disableControls() {
  document.getElementById("refresh-iframes").disabled = true;
  document.getElementById("test-shortcut").disabled = true;
  document.getElementById("record-keystroke").disabled = true;

  const iframeList = document.getElementById("iframe-list");
  iframeList.innerHTML =
    '<div class="no-iframes error">Cannot access page content. Extension may not work on this type of page.</div>';
}

// Load existing settings for the current domain
async function loadDomainSettings() {
  const storageKey = `domain_${currentDomain}`;

  chrome.storage.sync.get([storageKey], (data) => {
    const domainSettings = data[storageKey];

    if (domainSettings) {
      // Populate UI with stored settings (fallback keeps backward compatibility)
      document.getElementById("iframe-attribute").value =
        domainSettings.iframeAttribute || "name";

      document.getElementById("iframe-name").value =
        domainSettings.iframeValue || domainSettings.iframeName || "";
      document.getElementById("keystroke-display").value =
        domainSettings.keystroke || "";
    }
  });
}

// Save domain settings
async function saveDomainSettings(settings) {
  const storageKey = `domain_${currentDomain}`;

  chrome.storage.sync.get([storageKey], (data) => {
    const existingSettings = data[storageKey] || {};
    const updatedSettings = { ...existingSettings, ...settings };

    chrome.storage.sync.set({
      [storageKey]: updatedSettings,
    });
  });
}

// Detect iframes on the current page
async function detectIframes() {
  try {
    chrome.tabs.sendMessage(
      currentTab.id,
      {
        type: "GET_IFRAMES",
      },
      (response) => {
        if (chrome.runtime.lastError) {
          console.log(
            "Could not detect iframes:",
            chrome.runtime.lastError.message
          );
          return;
        }

        displayIframes(response?.iframes || []);
      }
    );
  } catch (error) {
    console.log("Error detecting iframes:", error);
  }
}

// Display detected iframes in the popup
function displayIframes(iframes) {
  const iframeList = document.getElementById("iframe-list");

  if (iframes.length === 0) {
    iframeList.innerHTML =
      '<div class="no-iframes">No iframes detected on this page</div>';
    return;
  }

  iframeList.innerHTML = "";

  iframes.forEach((iframe, index) => {
    const iframeItem = document.createElement("div");
    iframeItem.className = "iframe-item";
    iframeItem.title = iframe.title || iframe.name || iframe.src || "No src";
    console.log(iframe);
    // Determine what to show in the list:
    // 1) title  2) name  3) src  4) fallback text
    const displayTextRaw =
      iframe.title || iframe.name || iframe.src || "No src";
    const displayText =
      displayTextRaw.length > 50
        ? displayTextRaw.substring(0, 50) + "..."
        : displayTextRaw;

    iframeItem.innerHTML = `
      <div class="iframe-src">${displayText}</div>
      <div class="iframe-controls">
        <img src="assets/play.png" title="Refresh iframe" data-index="${index}">
        <img src="assets/edit.png" title="Edit iframe" data-index="${index}">
      </div>
    `;

    iframeList.appendChild(iframeItem);
  });

  // Add event listeners to iframe controls
  document.querySelectorAll(".iframe-controls img").forEach((img) => {
    img.addEventListener("click", handleIframeControl);
  });
}

// Handle iframe control actions
function handleIframeControl(event) {
  const action = event.target.title;
  const index = parseInt(event.target.dataset.index);

  if (action === "Refresh iframe") {
    chrome.tabs.sendMessage(currentTab.id, {
      type: "REFRESH_IFRAME",
      index: index,
    });
  } else if (action === "Edit iframe") {
    // Future enhancement: open iframe editing dialog
    console.log("Edit iframe at index:", index);
  }
}

// Set up all event listeners
function setupEventListeners() {
  // Save iframe attribute + value
  document.getElementById("save-name").addEventListener("click", () => {
    const iframeAttribute =
      document.getElementById("iframe-attribute").value.trim() || "name";
    const iframeValue = document.getElementById("iframe-name").value.trim();

    if (iframeValue) {
      const settings = { iframeAttribute, iframeValue };

      // Keep backward compatibility when attribute is "name"
      if (iframeAttribute === "name") {
        settings.iframeName = iframeValue;
      }

      saveDomainSettings(settings);
      showNotification("Iframe settings saved!");
    }
  });

  // Record keystroke
  document
    .getElementById("record-keystroke")
    .addEventListener("click", startKeystrokeRecording);

  // Refresh iframes
  document
    .getElementById("refresh-iframes")
    .addEventListener("click", detectIframes);

  // Test shortcut
  document
    .getElementById("test-shortcut")
    .addEventListener("click", testShortcut);

  // Handle Enter key in iframe name input
  document.getElementById("iframe-name").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      document.getElementById("save-name").click();
    }
  });
}

// Start keystroke recording
function startKeystrokeRecording() {
  if (isRecordingKeystroke) return;

  isRecordingKeystroke = true;
  document.getElementById("recording-status").classList.remove("hidden");
  document.getElementById("recording-status").textContent =
    "Press your key combination...";
  document.getElementById("record-keystroke").textContent = "Recording...";
  document.getElementById("record-keystroke").disabled = true;

  // Listen for keydown and keyup events
  document.addEventListener("keydown", handleKeystrokeRecording, true);
  document.addEventListener("keyup", handleKeystrokeRecordingEnd, true);

  // Auto-cancel after 10 seconds
  setTimeout(() => {
    if (isRecordingKeystroke) {
      cancelKeystrokeRecording();
    }
  }, 10000);
}

// Track pressed non-modifier keys in the order they are pressed (no duplicates)
let pressedKeys = [];
let recordingTimeout = null;
let lastRecordedEvent = null;

// Handle keystroke recording
function handleKeystrokeRecording(event) {
  if (!isRecordingKeystroke) return;

  event.preventDefault();
  event.stopPropagation();

  // Store the event for processing
  lastRecordedEvent = event;

  // Helper: convert event.key into a normalized printable representation
  function normalizeKey(rawKey) {
    const specialKeys = {
      " ": "Space",
      Escape: "Esc",
      Enter: "Enter",
      Tab: "Tab",
      Backspace: "Backspace",
      Delete: "Delete",
      ArrowUp: "Up",
      ArrowDown: "Down",
      ArrowLeft: "Left",
      ArrowRight: "Right",
      Home: "Home",
      End: "End",
      PageUp: "PageUp",
      PageDown: "PageDown",
      Insert: "Insert",
    };

    if (specialKeys[rawKey]) return specialKeys[rawKey];

    if (rawKey.length === 1 && rawKey.match(/[a-zA-Z0-9]/)) {
      return rawKey.toUpperCase();
    }

    return rawKey;
  }

  // Identify modifier vs non-modifier — only track non-modifier keys here
  const modifierKeys = ["Control", "Alt", "Shift", "Meta", "Cmd"];
  const keyName = normalizeKey(event.key);
  if (!modifierKeys.includes(event.key) && !modifierKeys.includes(keyName)) {
    if (!pressedKeys.includes(keyName)) {
      pressedKeys.push(keyName);
    }
  }

  // Build and display the current keystroke
  const keystroke = buildCombinationString(event);
  document.getElementById("keystroke-display").value = keystroke;
  document.getElementById(
    "recording-status"
  ).textContent = `Recording: ${keystroke} (release keys to save)`;

  // Clear any existing timeout
  if (recordingTimeout) {
    clearTimeout(recordingTimeout);
  }
}

// Build a keystroke string using the currently pressed non-modifier keys plus
// modifier flags from the latest event.
function buildCombinationString(event) {
  const parts = [];

  // Preferred modifier order: Cmd, Ctrl, Alt, Shift
  if (event.metaKey) parts.push("Cmd");
  if (event.ctrlKey) parts.push("Ctrl");
  if (event.altKey) parts.push("Alt");
  if (event.shiftKey) parts.push("Shift");

  // Add non-modifier keys in the order they were pressed
  parts.push(...pressedKeys);

  return parts.join("+");
}

// Handle keyup to finalize the recording
function handleKeystrokeRecordingEnd(event) {
  if (!isRecordingKeystroke || !lastRecordedEvent) return;

  // Small delay to allow for complex combinations
  recordingTimeout = setTimeout(() => {
    if (isRecordingKeystroke && lastRecordedEvent) {
      finalizeKeystrokeRecording();
    }
  }, 200);
}

// Finalize the keystroke recording
function finalizeKeystrokeRecording() {
  if (!lastRecordedEvent) return;

  const keystroke = buildCombinationString(lastRecordedEvent);

  // Validate the keystroke (must have at least one non-modifier key or be a meaningful combination)
  if (isValidKeystroke(keystroke)) {
    // Save the keystroke
    saveDomainSettings({ keystroke });

    // Register the keystroke with content script
    chrome.tabs.sendMessage(currentTab.id, {
      type: "REGISTER_KEYSTROKE",
      keystroke: keystroke,
      domain: currentDomain,
    });

    showNotification(`Keystroke "${keystroke}" saved!`);
  } else {
    showNotification(
      "Invalid keystroke. Please use a combination with at least one non-modifier key."
    );
  }

  cancelKeystrokeRecording();
}

// Validate keystroke
function isValidKeystroke(keystroke) {
  // Must not be just modifier keys
  const modifierOnly = ["Ctrl", "Alt", "Shift", "Cmd"].every(
    (mod) => keystroke === mod || !keystroke.includes(mod)
  );

  // Must have some actual key content and not be just modifiers
  return (
    keystroke.length > 0 && !["Ctrl", "Alt", "Shift", "Cmd"].includes(keystroke)
  );
}

// Build keystroke string from event
function buildKeystrokeString(event) {
  const parts = [];

  // Preferred modifier order: Cmd, Ctrl, Alt, Shift
  if (event.metaKey) parts.push("Cmd");
  if (event.ctrlKey) parts.push("Ctrl");
  if (event.altKey) parts.push("Alt");
  if (event.shiftKey) parts.push("Shift");

  // Handle special keys and regular keys
  let key = event.key;
  const specialKeys = {
    " ": "Space",
    Escape: "Esc",
    Enter: "Enter",
    Tab: "Tab",
    Backspace: "Backspace",
    Delete: "Delete",
    ArrowUp: "Up",
    ArrowDown: "Down",
    ArrowLeft: "Left",
    ArrowRight: "Right",
    Home: "Home",
    End: "End",
    PageUp: "PageUp",
    PageDown: "PageDown",
    Insert: "Insert",
  };

  // Use special key mapping or convert to uppercase for single chars
  if (specialKeys[key]) {
    key = specialKeys[key];
  } else if (key.length === 1 && key.match(/[a-zA-Z0-9]/)) {
    key = key.toUpperCase();
  }

  // Only add the key if it's not a standalone modifier
  const modifierKeys = ["Control", "Alt", "Shift", "Meta", "Cmd"];
  if (!modifierKeys.includes(key)) {
    parts.push(key);
  }

  return parts.join("+");
}

// Cancel keystroke recording
function cancelKeystrokeRecording() {
  isRecordingKeystroke = false;
  lastRecordedEvent = null;
  pressedKeys = [];

  if (recordingTimeout) {
    clearTimeout(recordingTimeout);
    recordingTimeout = null;
  }

  document.getElementById("recording-status").classList.add("hidden");
  document.getElementById("recording-status").textContent =
    "Press any key combination...";
  document.getElementById("record-keystroke").textContent = "Record New";
  document.getElementById("record-keystroke").disabled = false;

  document.removeEventListener("keydown", handleKeystrokeRecording, true);
  document.removeEventListener("keyup", handleKeystrokeRecordingEnd, true);
}

// Test the saved shortcut
function testShortcut() {
  chrome.tabs.sendMessage(
    currentTab.id,
    {
      type: "TEST_SHORTCUT",
      domain: currentDomain,
    },
    (response) => {
      if (response?.success) {
        showNotification("Shortcut test successful!");
      } else {
        showNotification("No shortcut configured or test failed");
      }
    }
  );
}

// Show notification (simple implementation)
function showNotification(message, type = "info") {
  // Create a temporary notification element
  const notification = document.createElement("div");
  notification.textContent = message;
  const colors = {
    info: "#4CAF50",
    error: "#f44336",
    warning: "#ff9800",
  };

  notification.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    background: ${colors[type] || colors.info};
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 12px;
    z-index: 1000;
    max-width: 300px;
    word-wrap: break-word;
  `;

  document.body.appendChild(notification);

  setTimeout(
    () => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    },
    type === "error" ? 4000 : 2000
  );
}
