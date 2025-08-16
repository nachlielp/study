(() => {
  let currentDomain = window.location.hostname;
  let registeredKeystrokes = {};
  let domainSettings = {};

  // Initialize content script
  init();

  async function init() {
    // Load domain settings from storage
    await loadDomainSettings();

    // Set up global keyboard listener
    document.addEventListener("keydown", handleGlobalKeydown, true);

    console.log(
      "Iframe Refresher content script initialized for domain:",
      currentDomain
    );
  }

  // Load domain settings from storage
  async function loadDomainSettings() {
    const storageKey = `domain_${currentDomain}`;

    chrome.storage.sync.get([storageKey], (data) => {
      domainSettings = data[storageKey] || {};

      if (domainSettings.keystroke) {
        registeredKeystrokes[domainSettings.keystroke] = {
          action: "refreshIframes",
          domain: currentDomain,
        };
        console.log("Loaded keystroke for domain:", domainSettings.keystroke);
      }
    });
  }

  // NEW: listen for storage changes so we always use the latest settings without a page reload
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== "sync") return;

    const storageKey = `domain_${currentDomain}`;
    if (!changes[storageKey]) return;

    const newSettings = changes[storageKey].newValue || {};

    // If the keystroke has changed, clean up the old one
    if (
      domainSettings.keystroke &&
      registeredKeystrokes[domainSettings.keystroke] &&
      registeredKeystrokes[domainSettings.keystroke].domain === currentDomain
    ) {
      delete registeredKeystrokes[domainSettings.keystroke];
    }

    domainSettings = newSettings;

    // Re-register the (possibly new) keystroke
    if (domainSettings.keystroke) {
      registeredKeystrokes[domainSettings.keystroke] = {
        action: "refreshIframes",
        domain: currentDomain,
      };
      console.log("Updated keystroke for domain:", domainSettings.keystroke);
    }

    console.log("Domain settings updated:", domainSettings);
  });

  // Handle messages from popup and background script
  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value, index, keystroke, domain } = obj;

    switch (type) {
      case "PING":
        response({ status: "ready", domain: currentDomain });
        break;

      case "GET_IFRAMES":
        const iframes = detectIframes();
        response({ iframes });
        break;

      case "REFRESH_IFRAME":
        refreshIframe(index);
        break;

      case "REGISTER_KEYSTROKE":
        registerKeystroke(keystroke, domain);
        break;

      case "TEST_SHORTCUT":
        const success = testShortcut(domain);
        response({ success });
        break;

      case "REFRESH_ALL_IFRAMES":
        refreshAllIframes();
        break;

      case "TAB_UPDATED":
        // Handle tab updates from background script
        console.log("Tab updated for domain:", domain);
        break;

      default:
        console.log("Unknown message type:", type);
    }

    return true; // Keep the message channel open for async responses
  });

  // Helper: recursively collect all iframes (including nested, same-origin where accessible)
  function getAllIframes(rootDoc = document, acc = []) {
    const iframes = rootDoc.querySelectorAll("iframe");
    iframes.forEach((iframe) => {
      acc.push(iframe);
      try {
        // Recurse into same-origin child documents
        const childDoc =
          iframe.contentDocument || iframe.contentWindow?.document;
        if (childDoc) {
          getAllIframes(childDoc, acc);
        }
      } catch (e) {
        // Cross-origin – cannot access, skip recursion but still counted
      }
    });
    return acc;
  }

  // Detect all iframes on the current page (now supports nested iframes)
  function detectIframes() {
    const allIframes = getAllIframes();
    const iframeData = [];

    allIframes.forEach((iframe, index) => {
      iframeData.push({
        src: iframe.src || iframe.getAttribute("data-src") || "",
        width: iframe.width || iframe.style.width || "auto",
        height: iframe.height || iframe.style.height || "auto",
        id: iframe.id || "",
        className: iframe.className || "",
        index: index,
        title: iframe.title,
        name: iframe.name,
      });
    });

    console.log(
      `Detected ${iframeData.length} (including nested) iframes on ${currentDomain}`
    );
    return iframeData;
  }

  // Refresh a specific iframe by index (supports nested iframes)
  function refreshIframe(index) {
    const allIframes = getAllIframes();

    if (index >= 0 && index < allIframes.length) {
      const iframe = allIframes[index];
      const originalSrc = iframe.src;

      // Add visual feedback
      addRefreshAnimation(iframe);

      // Refresh logic remains the same as before
      if (originalSrc) {
        iframe.src = "";
        setTimeout(() => {
          iframe.src = originalSrc;
        }, 100);
      } else if (iframe.contentWindow) {
        try {
          iframe.contentWindow.location.reload();
        } catch (e) {
          console.log(
            "Could not reload iframe due to cross-origin restrictions"
          );
          const currentSrc = iframe.getAttribute("data-src") || iframe.src;
          if (currentSrc) {
            iframe.src =
              currentSrc +
              (currentSrc.includes("?") ? "&" : "?") +
              "_refresh=" +
              Date.now();
          }
        }
      }

      console.log(`Refreshed iframe ${index} on ${currentDomain}`);
    } else {
      console.log(`Invalid iframe index: ${index}`);
    }
  }

  // Refresh all iframes on the page (including nested)
  function refreshAllIframes() {
    const allIframes = getAllIframes();

    allIframes.forEach((iframe, idx) => {
      setTimeout(() => {
        refreshIframe(idx);
      }, idx * 200);
    });

    console.log(
      `Refreshing all ${allIframes.length} (including nested) iframes on ${currentDomain}`
    );
  }

  // Refresh iframes by any attribute/value pair (e.g., name, id, data-*).
  function refreshIframesByAttribute(attribute, targetValue) {
    if (!attribute || !targetValue) {
      refreshAllIframes();
      return;
    }

    const allIframes = getAllIframes();
    let refreshedCount = 0;

    allIframes.forEach((iframe, idx) => {
      let actualValue;

      switch (attribute) {
        case "id":
          actualValue = iframe.id;
          break;
        case "class":
        case "className":
          actualValue = iframe.className;
          break;
        case "name":
          actualValue = iframe.name;
          break;
        default:
          actualValue = iframe.getAttribute(attribute);
      }

      if (actualValue === targetValue) {
        refreshIframe(idx);
        refreshedCount++;
      }
    });

    console.log(
      `Refreshed ${refreshedCount} iframe(s) where ${attribute}="${targetValue}" on ${currentDomain}`
    );
  }

  // Add visual feedback when refreshing an iframe
  function addRefreshAnimation(iframe) {
    // Inject CSS if it doesn't exist
    if (!document.getElementById("iframe-refresh-animation")) {
      const style = document.createElement("style");
      style.id = "iframe-refresh-animation";
      style.innerHTML = `
        @keyframes iframe-pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        .iframe-refreshing {
          animation: iframe-pulse 0.5s ease-in-out 2;
        }
      `;
      document.head.appendChild(style);
    }

    // Add animation class
    iframe.classList.add("iframe-refreshing");

    // Remove animation class after animation completes
    setTimeout(() => {
      iframe.classList.remove("iframe-refreshing");
    }, 1000);
  }

  // Register a keystroke for the current domain
  function registerKeystroke(keystroke, domain) {
    registeredKeystrokes[keystroke] = {
      action: "refreshIframes",
      domain: domain,
    };

    console.log(`Registered keystroke "${keystroke}" for domain ${domain}`);
  }

  // Handle global keydown events
  function handleGlobalKeydown(event) {
    const keystroke = buildKeystrokeString(event);

    if (registeredKeystrokes[keystroke]) {
      const shortcut = registeredKeystrokes[keystroke];

      // Only execute if it's for the current domain
      if (shortcut.domain === currentDomain) {
        event.preventDefault();
        event.stopPropagation();

        executeShortcutAction(shortcut.action);
        console.log(`Executed shortcut "${keystroke}" for ${currentDomain}`);
      }
    }
  }

  // Execute shortcut action
  function executeShortcutAction(action) {
    switch (action) {
      case "refreshIframes":
        if (domainSettings?.iframeAttribute && domainSettings?.iframeValue) {
          refreshIframesByAttribute(
            domainSettings.iframeAttribute,
            domainSettings.iframeValue
          );
          showShortcutFeedback(
            `Refreshing iframe with ${domainSettings.iframeAttribute}="${domainSettings.iframeValue}"...`
          );
        } else if (domainSettings?.iframeName) {
          refreshIframesByAttribute("name", domainSettings.iframeName);
          showShortcutFeedback(
            `Refreshing iframe with name="${domainSettings.iframeName}"...`
          );
        } else {
          refreshAllIframes();
          showShortcutFeedback("Refreshing all iframes...");
        }
        break;

      default:
        console.log("Unknown shortcut action:", action);
    }
  }

  // Show visual feedback for shortcut execution
  function showShortcutFeedback(message) {
    // Remove existing feedback
    const existingFeedback = document.getElementById(
      "iframe-shortcut-feedback"
    );
    if (existingFeedback) {
      existingFeedback.remove();
    }

    // Create feedback element
    const feedback = document.createElement("div");
    feedback.id = "iframe-shortcut-feedback";
    feedback.textContent = message;
    feedback.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #2c5aa0;
      color: white;
      padding: 12px 16px;
      border-radius: 6px;
      font-size: 14px;
      font-weight: bold;
      z-index: 10000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      animation: slideIn 0.3s ease-out;
    `;

    // Add slide-in animation
    if (!document.getElementById("shortcut-feedback-styles")) {
      const style = document.createElement("style");
      style.id = "shortcut-feedback-styles";
      style.innerHTML = `
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(feedback);

    // Remove feedback after 2 seconds
    setTimeout(() => {
      if (feedback.parentNode) {
        feedback.style.animation = "slideIn 0.3s ease-out reverse";
        setTimeout(() => {
          if (feedback.parentNode) {
            feedback.parentNode.removeChild(feedback);
          }
        }, 300);
      }
    }, 2000);
  }

  // Test if a shortcut is configured and working
  function testShortcut(domain) {
    const domainStorageKey = `domain_${domain}`;

    // Check if there's a keystroke configured for this domain
    let hasKeystroke = false;
    for (const keystroke in registeredKeystrokes) {
      if (registeredKeystrokes[keystroke].domain === domain) {
        hasKeystroke = true;
        showShortcutFeedback(`Test: "${keystroke}" shortcut is active`);
        break;
      }
    }

    if (!hasKeystroke) {
      showShortcutFeedback("No keyboard shortcut configured");
    }

    return hasKeystroke;
  }

  // Build keystroke string from event (same as in popup.js)
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

  // Handle page navigation and updates
  let lastUrl = location.href;

  // Watch for URL changes (for SPAs)
  new MutationObserver(() => {
    const currentUrl = location.href;
    if (currentUrl !== lastUrl) {
      lastUrl = currentUrl;
      currentDomain = window.location.hostname;
      console.log(
        "Page navigation detected, reinitializing for:",
        currentDomain
      );
      init();
    }
  }).observe(document, { subtree: true, childList: true });
})();
