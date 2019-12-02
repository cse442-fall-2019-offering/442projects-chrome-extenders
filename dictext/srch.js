const Http = new XMLHttpRequest();
const url = "http://35.174.105.25/api/";
// const url = "http://127.0.0.1:5000/api/";

// const QUERY_BOX = document.getElementById("query");
const DEF_LIST = document.getElementById("definitions");
const SYN_LIST = document.getElementById("synonyms");
const ANT_LIST = document.getElementById("antonyms");
const EXAMPLE = document.getElementById("example");
const TRANSLATION = document.getElementById("languages");
const ERROR = document.getElementById("errorBox");

// /api/translation for translations

function queryForHighlighted() {
    return new Promise((resolve, reject) => {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(
          tabs[0].id,
          {
            action: "getText"
          },
          response => {
            resolve(response);
          }
        );
      });
    });
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

    const langSelect = document.getElementById("langSelect");
    const dropDownValue = langSelect.value;
    selectedLanguage = document.createElement("li");

    selectedLanguage.appendChild(
      document.createTextNode(response.languages[dropDownValue])
    );
    TRANSLATION.appendChild(selectedLanguage);
    langSelect.addEventListener("change", function() {
      selectedLanguage.innerHTML = response.languages[langSelect.value];
    });
  }
}

function queried() {
//   e.preventDefault();
  //let loading = document.getElementById("loader");
  //loading.style.display = loading.style.display == "none" ? "block" : "none";

  DEF_LIST.innerHTML = "";
  SYN_LIST.innerHTML = "";
  ANT_LIST.innerHTML = "";
  EXAMPLE.innerHTML = "";
  ERROR.innerHTML = "";
  TRANSLATION.innerHTML = "";

  searchText = document.getElementById("search").value;
  if(searchText == ""){
    queryForHighlighted().then(response => {
        get_request(response.text).then(gotten => {
          fill_fields(gotten);
        });
      });
  }else{
    get_request(searchText).then(gotten => {
        fill_fields(gotten);
    });
  }
}

function openPage(page) {
  // Hide all elements with class="tabcontent" by default */
  var i, tabcontent;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  document.getElementById(page).style.display = "inline";
}

document.addEventListener("DOMContentLoaded", function() {

  defaultButt = document.getElementById("default");
  nonDefaultButt = document.getElementById("nonDefault");

  nonDefaultButt.addEventListener("click", function() {
    openPage("infoTab");
  });
  defaultButt.addEventListener("click", function() {
    openPage("searchTab");
  });
  
  openPage("searchTab");

  queryForHighlighted().then(response => {
    if (response.text != "") {
      queried();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.code == "Enter"){
        queried();
    }
  });
    //document.getElementById("search").addEventListener("oninput", queried);
});
