(() => {
  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, url } = obj;

    console.log("url: ", url);

    function findVideoElement() {
      console.log("finding video element");

      const musePlayer = document.querySelector("#muse-player");
      if (!musePlayer) {
        console.log("musePlayer not found");
        return;
      }

      console.log("musePlayer found:", musePlayer);

      const shadowRoot = musePlayer.shadowRoot;
      if (!shadowRoot) {
        console.log("No shadow root found");
        return;
      }

      console.log("shadowRoot found:", shadowRoot);
    }
    setTimeout(findVideoElement, 2000);
  });
})();
