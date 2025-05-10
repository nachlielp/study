//To handle reloads where the tab is undefined, reach out and get it
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status !== "complete") return;

  const processTab = (tabInfo) => {
    const url = tabInfo.url;

    chrome.tabs.sendMessage(tabId, {
      type: "MAIN",
      url: url,
    });
  };

  if (tab && tab.url) {
    processTab(tab);
  } else {
    chrome.tabs.get(tabId, processTab);
  }
});
