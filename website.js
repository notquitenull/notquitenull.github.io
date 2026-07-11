const searchlist = document.getElementById("content-container");
const searchbutton = document.getElementById("searchbutton");
const searchinput = document.getElementById("searchinput");

const ListOfMarkets = [];

searchbutton.addEventListener("click",search);


function search(){
    console.log("TODO: adding search funktion");
}

function buildresults(){

    for(let i = 0; i< ListOfMarkets.length; i++ ){
        let divcontent = document.createElement("p");
        let divtext = document.createTextNode("This is a test result "+ ListOfMarkets[i] );
        divcontent.appendChild(divtext);

        let newitem = document.createElement("div");
        newitem.classList.add("searchresult");

        newitem.appendChild(divcontent);
    
        searchlist.appendChild(newitem);
    }

    
}

function loadMarketsFromJSON(){
    console.log("TODO: loading Markets from JSON")
    ListOfMarkets.push("test 1","test 2", "Test3");
}


loadMarketsFromJSON();
buildresults();