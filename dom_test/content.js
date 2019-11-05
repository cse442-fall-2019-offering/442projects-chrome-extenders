function hasText() {
	var highlightedText = window.getSelection().toString();
	console.log(highlightedText)
}

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
	if (msg.action === "getText") {
		hasText();
	}
});
