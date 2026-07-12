const searchlist = document.getElementById("content-container");
const searchbutton = document.getElementById("searchbutton");
const searchinput = document.getElementById("searchinput");

const JSONURL = "https://raw.githubusercontent.com/notquitenull/notquitenull.github.io/refs/heads/main/data/Test.json"

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
        let divtext = document.createTextNode("This is a test result "+ ListOfMarkets[i].getmarketid() +" "+  ListOfMarkets[i].getslope() +" " +ListOfMarkets[i].getdeviation() +" "+ ListOfMarkets[i].gettopics() );
        divcontent.appendChild(divtext);

        let newitem = document.createElement("div");
        newitem.classList.add("searchresult");

        newitem.appendChild(divcontent);
    
        searchlist.appendChild(newitem);
    }

    
}

async function loadMarketsFromJSON(){
    console.log("TODO: loading Markets from JSON")

    let MarketJSON = null;
    
    try{
        const response = await fetch(JSONURL);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();

        MarketJSON = result;


    }catch (error) {
        console.error("error during fetch" + error.message);
    }


    for(let i = 0; i < MarketJSON.length; i++){

        let newmarket = new market(MarketJSON[i].markt_id,MarketJSON[i].avg_slope,MarketJSON[i].std_deviation,MarketJSON[i].topics);
        
        ListOfMarkets.push(newmarket);
    }
}

loadMarketsFromJSON().then(buildresults);


