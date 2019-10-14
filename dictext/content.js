// content.js
let contentPort = chrome.runtime.connect({
   name: 'background-content'
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "clicked_browser_action") {
    var firstHref = $("a[href^='http']")
      .eq(0)
      .attr("href");

    console.log(firstHref);

    // This line is new!
    chrome.runtime.sendMessage({ message: "open_popup", url: firstHref });
  }

  if(message.action === 'GET_DIMENSION') {
      contentPort.postMessage({
         type: 'DIMENSION', 
         payload: {
            dimension: document.body.offsetHeight     
         }
      });
   }

});

