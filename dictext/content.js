// content.js
/**
* Gets the HTML of the user's selection
*/
	function getSelectionHTML() {
		var text = "";
	    if (window.getSelection) {
	        text = window.getSelection().toString();
	    } else if (document.selection && document.selection.type != "Control") {
	        text = document.selection.createRange().text;
	    }
    	return text;
	}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log(request);
	//DOM
    if (request.message === "getSelection"){
    	console.log("here");
		var selection = window.getSelectionHTML(); 
		sendResponse({body: selection, url: window.location.href, subject: document.title});
	}
    else
		sendResponse({}); // snub them.  

	if (request.message === "clicked_browser_action") {
    var firstHref = $("a[href^='http']")
      .eq(0)
      .attr("href");

    console.log("Hello" + firstHref);
    chrome.runtime.sendMessage({ message: "open_popup", url: firstHref });  
  }
});
