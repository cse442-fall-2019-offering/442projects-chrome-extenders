/**
* Gets the HTML of the user's selection
*/

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  //console.log(request);
  if (request.action === "getText") {
    let highlightedText = window.getSelection().toString();
    sendResponse({
      text: highlightedText
    });
  }
});