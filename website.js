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

        let iframe = document.createElement("iframe");
        iframe.setAttribute("src","plots/plots/"+ListOfMarkets[i].getmarketid()+"_price_history.html");
        iframe.style.width = "640px";
        iframe.style.height = "480px";

        

        let newitem = document.createElement("div");
        newitem.classList.add("searchresult");
        

        newitem.appendChild(divcontent);
        newitem.appendChild(iframe);
    
        searchlist.appendChild(newitem);
    }

    
}

async function loadMarketsFromJSON(){
    console.log("TODO: loading Markets from JSON")

    let MarketJSON = [];
    
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
    console.log(MarketJSON);

    for(let i = 0; i < MarketJSON.length; i++){

        let newmarket = new market(MarketJSON[i].id,MarketJSON[i].avg,MarketJSON[i].std,MarketJSON[i].top);
        console.log(MarketJSON[i].id);
        ListOfMarkets.push(newmarket);
    }
}

loadMarketsFromJSON().then(buildresults);


