const Http = new XMLHttpRequest();
// const url = "http://35.174.105.25/api/";
const url = "http://127.0.0.1:5000/api/";

const QUERY_BOX = document.getElementById("query");
const DEF_LIST = document.getElementById("definitions");
const SYN_LIST = document.getElementById("synonyms");
const ANT_LIST = document.getElementById("antonyms");
const EXAMPLE = document.getElementById("example");
const TRANSLATION = document.getElementById("languages")
const ERROR = document.getElementById("errorBox");

// /api/translation for translations

var Initial_Value = 1;

function queryForHighlighted() {
    if (Initial_Value) {
        return new Promise((resolve, reject) => {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: "getText"
                }, (response) => {
                    resolve(response);
                });
            });
        });
    } else {
        return document.getElementsByTagName("input")[0].value;
    }
}

function get_request(wrd) {
    return new Promise((resolve, reject) => {
        Http.open("GET", url + wrd, false);
        Http.send();
        resolve(JSON.parse(Http.responseText));
    });
}

function fill_fields(response) {
    if (!Object.keys(response).length) {
        let entry = document.createElement("h3");
        entry.appendChild(document.createTextNode("Word not found"));
        ERROR.appendChild(entry);
    } else {
        let entry = document.createElement("li");

        for (i = 0; i < response.defintions.length; i++) {
            entry = document.createElement("li");
            entry.appendChild(document.createTextNode(response.defintions[i]));
            DEF_LIST.appendChild(entry);
        }
        for (i = 0; i < response.synonyms.length; i++) {
            entry = document.createElement("li");
            entry.appendChild(document.createTextNode(response.synonyms[i]));
            SYN_LIST.appendChild(entry);
        }
        for (i = 0; i < response.antonyms.length; i++) {
            entry = document.createElement("li");
            entry.appendChild(document.createTextNode(response.antonyms[i]));
            ANT_LIST.appendChild(entry);
        }
        entry = document.createElement("p");
        entry.appendChild(document.createTextNode(response.example[0]));
        EXAMPLE.appendChild(entry);

        entry2 = document.createElement("q")
        entry2.appendChild(document.createTextNode(response.languages[0]));
        TRANSLATION.appendChild(entry2);
        console.log(TRANSLATION)
    }
}

function queried(e) {
    e.preventDefault();
    DEF_LIST.innerHTML = "";
    SYN_LIST.innerHTML = "";
    ANT_LIST.innerHTML = "";
    EXAMPLE.innerHTML = "";
    ERROR.innerHTML = "";
    TRANSLATION.innerHTML = ""

    queryForHighlighted().then(response => {
        get_request(response.text).then(gotten => {
            fill_fields(gotten);
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {

    QUERY_BOX.addEventListener("submit", queried);
});