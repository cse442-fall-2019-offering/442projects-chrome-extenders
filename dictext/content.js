// Get the highlighted text on the page and return it directly to the message sender
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getText") {
    let highlightedText = window.getSelection().toString();
    sendResponse({
      text: highlightedText
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "print command heard") {
    console.log("Command heard");
  }
});