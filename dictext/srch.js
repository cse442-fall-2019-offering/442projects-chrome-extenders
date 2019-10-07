const QUERY = document.getElementById("query");
const DEF_LIST = document.getElementsByClassName("definitions");

function processForm(e) {
    if (e.preventDefault) e.preventDefault();
    let entry = document.createElement("li");
    entry.appendChild(document.createTextNode("definition 1"));
    DEF_LIST.appendChild(entry);
    console.log("hello");
    return false;
}
/*
window.addEventListener("load",function() {
    QUERY.onsubmit=function() {
        let entry = document.createElement("li");
        entry.appendChild(document.createTextNode("definition 1"));
        DEF_LIST.appendChild(entry);
    }
});
*/
document.addEventListener("DOMContentLoaded", function(){
    if (QUERY.attachEvent) {
        QUERY.attachEvent("submit", processForm);
    } else {
        QUERY.addEventListener("submit", processForm);
    }
});