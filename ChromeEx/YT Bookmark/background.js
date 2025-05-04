// chrome.tabs.onUpdated.addListener((tabId, tab) => {
//   //on open new tab - not on refresh
//   // view in  chrome://extensions/ -> service worker
//   if (tab.url && tab.url.includes("youtube.com/watch")) {
//     const queryParameters = tab.url.split("?")[1];
//     const urlParameters = new URLSearchParams(queryParameters);

//     chrome.tabs.sendMessage(tabId, {
//       type: "NEW",
//       videoId: urlParameters.get("v"), //get the unieq YT video identefier
//     });
//   }
// });

//To handle reloads where the tab is undefined, reach out and get it
chrome.tabs.onUpdated.addListener((tabId, tab) => {
  const processTab = (tabInfo) => {
    const url = tabInfo.url;

    if (url && url.includes("youtube.com/watch")) {
      const queryParameters = url.split("?")[1];
      const urlParameters = new URLSearchParams(queryParameters);

      chrome.tabs.sendMessage(tabId, {
        type: "NEW",
        videoId: urlParameters.get("v"),
      });
    }
  };

  if (tab && tab.url) {
    processTab(tab);
  } else {
    chrome.tabs.get(tabId, processTab);
  }
});
