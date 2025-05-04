(() => {
  let youtubeLeftControls, youtubePlayer;
  let currentVideo = "";
  let currentVideoBookmarks = [];

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value, videoId } = obj;

    if (type === "NEW") {
      currentVideo = videoId;
      newVideoLoaded();
    } else if (type === "PLAY") {
      youtubePlayer.currentTime = value;
    } else if (type === "DELETE") {
      currentVideoBookmarks = currentVideoBookmarks.filter(
        (b) => b.time != value
      );
      chrome.storage.sync.set({
        [currentVideo]: JSON.stringify(currentVideoBookmarks),
      });
      response(currentVideoBookmarks);
    }
  });

  const fetchBookmarks = () => {
    return new Promise((resolve) => {
      chrome.storage.sync.get([currentVideo], (obj) =>
        resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]) : [])
      );
    });
  };

  const newVideoLoaded = async () => {
    const bookmarkBtnExists =
      document.getElementsByClassName("bookmark-btn")[0];

    currentVideoBookmarks = await fetchBookmarks();

    if (!bookmarkBtnExists) {
      const bookmarkBtn = document.createElement("img");

      bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
      bookmarkBtn.className = "ytp-button " + "bookmark-btn";
      bookmarkBtn.title = "Click to bookmark current timestamp";

      youtubeLeftControls =
        document.getElementsByClassName("ytp-left-controls")[0];
      youtubePlayer = document.getElementsByClassName("video-stream")[0];

      youtubeLeftControls.append(bookmarkBtn);
      bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
    }
  };

  const addNewBookmarkEventHandler = async () => {
    injectPulseCSS();
    const currentTime = youtubePlayer.currentTime;

    const newBookmark = {
      time: currentTime,
      desc: "Bookmark at " + getTime(currentTime),
    };

    currentVideoBookmarks = await fetchBookmarks();

    chrome.storage.sync.set({
      [currentVideo]: JSON.stringify(
        [...currentVideoBookmarks, newBookmark].sort((a, b) => a.time - b.time)
      ),
    });
  };

  function injectPulseCSS() {
    if (!document.getElementById("pulse-bounce-style")) {
      const style = document.createElement("style");
      style.id = "pulse-bounce-style";
      style.innerHTML = `
        @keyframes bounce {
          0%   { transform: scale(1); }
          20%  { transform: scale(1.2); }
          40%  { transform: scale(0.9); }
          60%  { transform: scale(1.05); }
          80%  { transform: scale(0.95); }
          100% { transform: scale(1); }
        }
        .pulse-bounce {
          animation: bounce 0.5s;
        }
      `;
      document.head.appendChild(style);
    }

    const addBookmarkBtn = document.getElementsByClassName("bookmark-btn")[0];
    if (addBookmarkBtn) {
      addBookmarkBtn.classList.remove("pulse-bounce");
      void addBookmarkBtn.offsetWidth;
      addBookmarkBtn.classList.add("pulse-bounce");
      addBookmarkBtn.addEventListener(
        "animationend",
        () => {
          addBookmarkBtn.classList.remove("pulse-bounce");
        },
        { once: true }
      );
    }
  }
})();

const getTime = (t) => {
  const hours = Math.floor(t / 3600);
  const minutes = Math.floor((t % 3600) / 60);
  const seconds = Math.floor(t % 60);

  const pad = (num) => num.toString().padStart(2, "0");

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};
