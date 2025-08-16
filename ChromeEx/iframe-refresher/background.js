// Handle tab updates for iframe refresher functionality
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status !== "complete") return; // Wait for page to finish loading

  const processTab = (tabInfo) => {
    const url = tabInfo.url;

    // Skip chrome:// and extension:// URLs
    if (
      url &&
      (url.startsWith("chrome://") ||
        url.startsWith("extension://") ||
        url.startsWith("moz-extension://"))
    ) {
      return;
    }

    if (url) {
      const domain = new URL(url).hostname;

      chrome.tabs
        .sendMessage(tabId, {
          type: "TAB_UPDATED",
          domain: domain,
          url: url,
        })
        .catch(() => {
          // Ignore errors - content script might not be ready yet
        });
    }
  };

  if (tab && tab.url) {
    processTab(tab);
  } else {
    chrome.tabs.get(tabId, processTab).catch(() => {
      // Ignore errors
    });
  }
});

// Handle extension installation
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    console.log("Iframe Refresher extension installed");
  } else if (details.reason === "update") {
    console.log("Iframe Refresher extension updated");
  }
});

// Handle messages from content scripts and popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { type, domain, data } = message;

  switch (type) {
    case "GET_DOMAIN_SETTINGS":
      // Get settings for a specific domain
      chrome.storage.sync.get([`domain_${domain}`], (result) => {
        sendResponse({ settings: result[`domain_${domain}`] || {} });
      });
      return true; // Keep the message channel open

    case "SAVE_DOMAIN_SETTINGS":
      // Save settings for a specific domain
      chrome.storage.sync.set(
        {
          [`domain_${domain}`]: data,
        },
        () => {
          sendResponse({ success: true });
        }
      );
      return true;

    case "GET_ALL_DOMAIN_SETTINGS":
      // Get all domain settings (for management/export)
      chrome.storage.sync.get(null, (result) => {
        const domainSettings = {};
        Object.keys(result).forEach((key) => {
          if (key.startsWith("domain_")) {
            const domain = key.replace("domain_", "");
            domainSettings[domain] = result[key];
          }
        });
        sendResponse({ domainSettings });
      });
      return true;

    default:
      console.log("Unknown background message type:", type);
  }
});

// Context menu support (optional future enhancement)
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "refreshIframes",
    title: "Refresh all iframes",
    contexts: ["page"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "refreshIframes") {
    chrome.tabs
      .sendMessage(tab.id, {
        type: "REFRESH_ALL_IFRAMES",
      })
      .catch(() => {
        console.log("Could not send refresh message to tab");
      });
  }
});
