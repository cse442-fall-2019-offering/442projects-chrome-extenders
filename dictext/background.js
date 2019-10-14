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

chrome.runtime.onConnect.addListener(function(portFrom) {
   if(portFrom.name === 'background-content') {
      //This is how you add listener to a port.
      portFrom.onMessage.addListener(function(message) {
         //Do something to this message(offsetheight and width)
      });
   }
});

//testing to get DOM data
chrome.tabs.sendMessage(YOUR_TARGET_TAB_ID, {action: 'GET_DIMENSION'})

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
