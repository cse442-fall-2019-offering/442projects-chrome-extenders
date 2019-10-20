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

document.addEventListener("DOMContentLoaded", function(){

    const QUERY_BOX = document.getElementById("query");
    const DEF_LIST = document.getElementById("definitions");
    const SYN_LIST = document.getElementById("synonyms")
  
    function queried(e) {
        e.preventDefault();
        let queryValue = document.getElementsByTagName("input")[0].value;

        let entry = document.createElement("li");
        console.log("1");
        let response = get_request(queryValue);
        console.log(response.defintions[0]);
        entry.appendChild(document.createTextNode(response.defintions[0]));
        DEF_LIST.appendChild(entry);

        entry = document.createElement("li");
        console.log("2");
        entry.appendChild(document.createTextNode(response.synonyms[0]));
        SYN_LIST.appendChild(entry);
    }
  
    QUERY_BOX.addEventListener("submit", queried);
});