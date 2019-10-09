document.addEventListener("DOMContentLoaded", function(){

    const QUERY_BOX = document.getElementById("query");
    const DEF_LIST = document.getElementById("definitions");
  
    function queried(e) {
        e.preventDefault();
        var queryValue = document.getElementsByTagName("input")[0].value
        let entry = document.createElement("li");
        entry.appendChild(document.createTextNode(queryValue));
        DEF_LIST.appendChild(entry);
    }
  
    QUERY_BOX.addEventListener("submit", queried);
});