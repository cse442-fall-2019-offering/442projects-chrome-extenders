const Http = new XMLHttpRequest();
const url = "http://127.0.0.1:5000/api/";

function get_request(wrd) {
  Http.open("GET", url + wrd, false);
  Http.send();
  /*
    Http.onreadystatechange = function() {
        if (Http.readyState == 4 && Http.status == 200) {
            console.log("ready");
            return JSON.parse(Http.responseText);
        } else {
            console.log("not ready yet");
        }
    }
    */
  return JSON.parse(Http.responseText);
}

document.addEventListener("DOMContentLoaded", function() {
  const QUERY_BOX = document.getElementById("query");
  const DEF_LIST = document.getElementById("definitions");
  const SYN_LIST = document.getElementById("synonyms");
  const ERROR = document.getElementById("errorBox");

  function queried(e) {
    e.preventDefault();
    DEF_LIST.innerHTML = "";
    SYN_LIST.innerHTML = "";
    ERROR.innerHTML = "";

    let queryValue = document.getElementsByTagName("input")[0].value;
    let response = get_request(queryValue);

    if (!Object.keys(response).length) {
        let entry = document.createElement("h3");
        entry.appendChild(document.createTextNode("Word not found"));
        ERROR.appendChild(entry);
    }
    else {
        let entry = document.createElement("li");
        
        for (i=0;i<response.defintions.length;i++) {
            entry = document.createElement("li");
            entry.appendChild(document.createTextNode(response.defintions[i]));
            DEF_LIST.appendChild(entry);
        }
        for (i=0;i<response.synonyms.length;i++) {
            entry = document.createElement("li");
            entry.appendChild(document.createTextNode(response.synonyms[i]));
            SYN_LIST.appendChild(entry);
        }
    }
  }

  QUERY_BOX.addEventListener("submit", queried);
});
