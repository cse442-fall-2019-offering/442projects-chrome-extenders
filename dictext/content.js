function hasText() {
  var highlightedText = window.getSelection().toString();
  console.log(highlightedText)
}

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.action === "getText") {
    hasText();
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log(request);
	if (request.message === "clicked_browser_action") {
    var firstHref = $("a[href^='http']")
      .eq(0)
      .attr("href");
    chrome.runtime.sendMessage({ message: "open_popup", url: firstHref });  
  }
});

