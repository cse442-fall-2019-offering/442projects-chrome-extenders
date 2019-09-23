// https://developer.chrome.com/extensions/windows#type-CreateType

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {
      message: "clicked_browser_action"
    });
  });
});

// This block is new!
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "open_popup") {
    chrome.windows.create(
      {
        url: chrome.extension.getURL("dictwin.html"),
        type: "panel",
        focused: true,
        top: 60,
        left: 20,
        width: 200,
        height: 200
      },
      window => {
        window.WindowType = "app";
        window.alwaysOnTop = true;
        // console.log(window.focused);
      }
    );
  }
});
