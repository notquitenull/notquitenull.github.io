const searchlist = document.getElementById("content-container");
const searchbutton = document.getElementById("searchbutton");
const searchinput = document.getElementById("searchinput");

const marketJSONSource = "Test.json";

const ListOfMarkets = [];

searchbutton.addEventListener("click",search);

const market = class market {
    constructor(marketid,avg_slope,std_deviation,topics){
        this.marketid = marketid;
        this.avg_slope = avg_slope;
        this.std_deviation = std_deviation;
        this.topics = topics;
    }
    getmarketid(){
        return this.marketid;
    }
    getslope(){
        return this.avg_slope;
    }
    getdeviation(){
        return this.std_deviation;
    }
    gettopics(){
        return this.topics;
    }
}


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

    var MarketJSON = null;
    fetch(marketJSONSource, {
            method: 'POST',
            mode: 'cors',
        }
    ).then(response => response.json()).then(value => console.log( value)).catch(error => console.log(error));
    console.log(MarketJSON);

    for(let i = 0; i < MarketJSON.length(); i++){

        console.log(MarketJSON[i].marketid);
        let newmarket = market(MarketJSON[i].marketid,MarketJSON[i].avg_slope,MarketJSON[i].std_deviation,MarketJSON[i].topics);
        

        ListOfMarkets.push();

    }
}

    


loadMarketsFromJSON();
buildresults();