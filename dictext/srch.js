const Http = new XMLHttpRequest();
const url = "http://35.174.105.25/api/";

// /api/translation for translations

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
    const QUERY_BOX = document.getElementById("query");
    const DEF_LIST = document.getElementById("definitions");
    const SYN_LIST = document.getElementById("synonyms");
    //const ANT_LIST = document.getElementByID("antonyms");

    function queried(e) {
        e.preventDefault();
        let queryValue = document.getElementsByTagName("input")[0].value;

        // definitions
        let entry = document.createElement("li");
        console.log("1");
        let response = get_request(queryValue);
        console.log(response.defintions[0]);
        entry.appendChild(document.createTextNode(response.defintions[0]));
        DEF_LIST.appendChild(entry);

        // synonyms
        entry = document.createElement("li");
        console.log("2");
        entry.appendChild(document.createTextNode(response.synonyms[0]));
        SYN_LIST.appendChild(entry);

        // // antonyms
        // entry = document.createElement("li");
        // console.log("3");
        // entry.appendChild(document.createTextNode(response.antonyms[0]));
        // ANT_LIST.appendChild(entry);
    }

    QUERY_BOX.addEventListener("submit", queried);
});
