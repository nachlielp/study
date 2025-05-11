import { getActiveTabURL } from "./utils.js";

const addNewBookmark = (bookmarksEl, bookmark) => {
  const bookmarkTitleEl = document.createElement("div");
  const newBookmarkEl = document.createElement("div");
  const controlsEl = document.createElement("div");

  controlsEl.className = "bookmark-controls";

  bookmarkTitleEl.textContent = bookmark.desc;
  bookmarkTitleEl.className = "bookmark-title";

  newBookmarkEl.id = "bookmark-" + bookmark.time;
  newBookmarkEl.className = "bookmark";
  newBookmarkEl.setAttribute("timestamp", bookmark.time);

  setBookmarkAttributes("play", onPlay, controlsEl);
  setBookmarkAttributes("delete", onDelete, controlsEl);

  newBookmarkEl.appendChild(bookmarkTitleEl);
  newBookmarkEl.appendChild(controlsEl);
  bookmarksEl.appendChild(newBookmarkEl);
};

const viewBookmarks = (currentBookmarks = []) => {
  const bookmarksEl = document.getElementById("bookmarks");
  bookmarksEl.innerHTML = "";

  if (currentBookmarks.length > 0) {
    for (let bookmark of currentBookmarks) {
      addNewBookmark(bookmarksEl, bookmark);
    }
  } else {
    bookmarksEl.innerHTML = '<i class="row">No bookmarks to show</i>';
  }
};

const onPlay = async (e) => {
  const bookmarkTime = e.target.parentNode.parentNode.getAttribute("timestamp");
  const activeTab = await getActiveTabURL();

  chrome.tabs.sendMessage(activeTab.id, {
    type: "PLAY",
    value: bookmarkTime,
  });
};

const onDelete = async (e) => {
  const bookmarkTime = e.target.parentNode.parentNode.getAttribute("timestamp");
  const activeTab = await getActiveTabURL();
  const bookmarElToDelete = document.getElementById("bookmark-" + bookmarkTime);

  bookmarElToDelete.parentNode.removeChild(bookmarElToDelete);

  chrome.tabs.sendMessage(
    activeTab.id,
    {
      type: "DELETE",
      value: bookmarkTime,
    },
    viewBookmarks
  );
};

const setBookmarkAttributes = (src, eventListener, controlParentEl) => {
  const controlEl = document.createElement("img");

  controlEl.src = "assets/" + src + ".png";
  controlEl.title = src;
  controlEl.addEventListener("click", eventListener);
  controlParentEl.appendChild(controlEl);
};

//"https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/sync"
document.addEventListener("DOMContentLoaded", async () => {
  const activeTag = await getActiveTabURL();
  const queryParameters = activeTag.url.split("?")[1];
  const urlParameters = new URLSearchParams(queryParameters);

  let currentVideoId = urlParameters.get("v");
  if (activeTag.url.includes("youtube.com/watch") && currentVideoId) {
    chrome.storage.sync.get([currentVideoId], (data) => {
      const currentVideoBookmarks = data[currentVideoId]
        ? JSON.parse(data[currentVideoId])
        : [];

      viewBookmarks(currentVideoBookmarks);
    });
  } else {
    const container = document.getElementsByClassName("container")[0];
    container.innerHTML =
      '<div class="title">This is not a youtube video page.</div>';
  }
});
