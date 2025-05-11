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
    } else if (type === "MAIN") {
      setTimeout(() => removeShortsElements(), 2000);
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

  function removeShortsElements() {
    console.log("removeShortsElements");
    //Test remove shorts button
    const shortsLink = document.querySelector('a#endpoint[title="Shorts"]');

    if (shortsLink) {
      console.log("Removing Shorts Btn");
      shortsLink.style.display = "none";
    }

    const shortsContiner = document.querySelector("ytd-rich-section-renderer");
    if (shortsContiner) {
      console.log("Removing Shorts Continer");
      shortsContiner.style.display = "none";
    }
  }

  function handleNewElements(mutationsList, observer) {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach((node) => {
          // Example: Check if the node is a video or comment element
          if (node.nodeType === 1) {
            // Element node
            // Replace with your selector or logic
            if (node.matches && node.matches(".your-target-selector")) {
              // Handle the new element
              console.log("New element detected:", node);
              node.style.display = "none";
            }
          }
        });
      }
    }
  }

  // Start observing the body for added nodes
  const observer = new MutationObserver(handleNewElements);
  observer.observe(document.body, { childList: true, subtree: true });

  // Optionally, handle elements already present on initial load
  document.querySelectorAll(".your-target-selector").forEach((node) => {
    console.log("New element detected, first run:", node);
    node.style.display = "none";
  });
})();

const getTime = (t) => {
  const hours = Math.floor(t / 3600);
  const minutes = Math.floor((t % 3600) / 60);
  const seconds = Math.floor(t % 60);

  const pad = (num) => num.toString().padStart(2, "0");

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};
