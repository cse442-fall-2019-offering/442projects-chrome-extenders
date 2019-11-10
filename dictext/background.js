// Ask the active tab if theres any highlighted text
function queryForHighlighted () {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
          action: "getText"
      }, (response) => response.text);
  });
}

// Create a window for looking up dictionary definitions and displaying results
function createDictWindow () {
  chrome.windows.create(
    {
      url: chrome.extension.getURL("srch.html"),
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
    }
  );
}

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener((tab) => {
  queryForHighlighted();  // check if any text is highlighted
  createDictWindow();     // create window for dictionary items
});

// Called when the user uses the keyboard shortcut
chrome.commands.onCommand.addListener((tab) => {
  queryForHighlighted();  // check if any text is highlighted
  createDictWindow();     // create window for dictionary items
});