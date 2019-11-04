chrome.browserAction.onClicked.addListener(function(tab) {
	sendMessage();
});

function sendMessage() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		chrome.tabs.sendMessage(tabs[0].id, {action: "getText"}, function(response) {});
	});
}