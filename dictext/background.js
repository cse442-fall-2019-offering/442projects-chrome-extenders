// Create a window for looking up dictionary definitions and displaying results
function createDictWindow () {
  chrome.windows.create(
    {
      url: chrome.extension.getURL("srch.html"),
      type: "panel",
      focused: true,
      top: 60,
      left: 20,
      width: 300,
      height: 550
    },
    window => {
      window.WindowType = "app";
      window.alwaysOnTop = true;
    }
  );
}

// Called when the user clicks on the browser action.
/*
chrome.browserAction.onClicked.addListener((tab) => {
  //queryForHighlighted();  // check if any text is highlighted
  createDictWindow();     // create window for dictionary items
});
*/
// Called when the user uses the keyboard shortcut
chrome.commands.onCommand.addListener((tab) => {
  //queryForHighlighted();  // check if any text is highlighted
  createDictWindow();     // create window for dictionary items
});