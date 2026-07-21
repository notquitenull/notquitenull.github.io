const searchlist = document.getElementById("content-container");
const searchbutton = document.getElementById("searchbutton");
const searchinput = document.getElementById("search");
const mainbox = document.getElementById("sizesource");
const searchheader = document.getElementById("DataExploration");
const searchtype = document.getElementById("searchtype");
const topiclist = document.getElementById("topiclist");
const errorbox = document.getElementById("errorbox");


const JSONURL = "https://raw.githubusercontent.com/notquitenull/notquitenull.github.io/refs/heads/main/data/Test.json"

const ListOfMarkets = [];

const ListOfTopics = [];

var ListDisplay = [];

searchbutton.addEventListener("click",search);
searchtype.addEventListener("change", buildDropdown);


const market = class market {
	constructor(marketid,avg_slope,std_deviation,topics,postIDs){
		this.marketid = marketid;
		this.avg_slope = avg_slope;
		this.std_deviation = std_deviation;
		this.topics = topics;
		this.postIDs = postIDs;
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
	getpostids(){
		return this.postIDs;
	}
}

function buildDropdown(){
	//console.log("buildDropdown() wurde aufgerufen");

	searchinput.innerHTML = "";
	if (tom) {
		tom.clear();
		tom.clearOptions();
	}

	switch(searchtype.value){
		case "Topic":
			//console.log("Topic");

			for (const topic of ListOfTopics) {
				let option = document.createElement("option");
				option.value = topic;
				option.textContent = topic;
				searchinput.appendChild(option);
			}
			break;
		case "MID":
			//console.log("MID");

			for (const market of ListOfMarkets) {
				let option = document.createElement("option");
				option.value = market.getmarketid();
				option.textContent = market.getmarketid();
				searchinput.appendChild(option);
			}
			break;
		case "PID":
			let postIDs = [];

			for (const market of ListOfMarkets) {
				for (const postID of market.getpostids()) {
					if (!postIDs.includes(postID)) {
						postIDs.push(postID);
					}
				}
			}

			for (const postID of postIDs) {
				let option = document.createElement("option");
				option.value = postID;
				option.textContent = postID;
				searchinput.appendChild(option);
			}

			break;
	}
	if (tom) {
		tom.clearOptions();
		tom.sync();
	}
}

/*
function buildTopicList(){
	let stringoftopics = ListOfTopics[0];
	for(let i = 1; i < ListOfTopics.length;i++){
		stringoftopics = stringoftopics + ", " + ListOfTopics[i];
	}
	let topicenumstring = document.createTextNode(stringoftopics);
	topiclist.append(topicenumstring)
}
*/

function search(){
	searchlist.innerHTML = "";
	errorbox.innerHTML = "";
	let value = searchinput.value;
	if(value != ""){
		switch(searchtype.value){
			case "Topic":
				searchtopic(value);
				break;
			case "MID":
				searchMarket(value);
				break;
			case "PID":
				searchPost(value);
				break;
			default:
				ListDisplay = [];
		}
	}else{
		ListDisplay = ListOfMarkets;
	}
	buildresults();
}

function searchtopic(topicstring){
	let foundlist = [];
	for(let i = 0; i < ListOfMarkets.length; i++){
		if(ListOfMarkets[i].gettopics() == topicstring){
			foundlist.push(ListOfMarkets[i]);
		}
	}
	ListDisplay = foundlist;
}

function searchPost(id){
	let foundlist = [];
	for(let i = 0; i < ListOfMarkets.length; i++){
		//console.log(ListOfMarkets[i].getpostids());
		for(let j = 0; j < ListOfMarkets[i].getpostids().length; j++){
			if(ListOfMarkets[i].getpostids()[j] == Number(id)){
				foundlist.push(ListOfMarkets[i]);
				break;
			}
		}
	}
	ListDisplay = foundlist;
	console.log(id);
}

function searchMarket(id){
	let foundlist = [];

	for(let i = 0; i < ListOfMarkets.length; i++){
		//console.log("List id"+ListOfMarkets[i].getmarketid());
		if(ListOfMarkets[i].getmarketid() == Number(id)){
			//console.log(ListOfMarkets[i].getmarketid());
			foundlist.push(ListOfMarkets[i]);
		}
	}
	ListDisplay = foundlist;
	//console.log(id);
}

function buildresults(){
	//console.log("buildresults() wurde aufgerufen");
	if(ListDisplay.length == 0){
		let errortext = document.createTextNode("No elements found");
		errorbox.append(errortext);
		return;
	}

	for(let i = 0; i< ListDisplay.length; i++ ){

		let divcontent = document.createElement("p");

		divcontent.classList.add("searchresultheader");
	
		let markettext = document.createTextNode("Market id: "+ ListDisplay[i].getmarketid()  );
		let topictext = document.createTextNode("Topic of the market: "+ ListDisplay[i].gettopics());
		let marketstats = document.createTextNode("Average slope of the market: "+ ListDisplay[i].getslope() + " Computed standard deviation: "+ ListDisplay[i].getdeviation());
	
		divcontent.appendChild(markettext);
		divcontent.appendChild(document.createElement("br"));
		divcontent.appendChild(topictext);
		divcontent.appendChild(document.createElement("br"));
		divcontent.appendChild(marketstats);

		let iframe = document.createElement("iframe");
		iframe.setAttribute("src","plots/plots/"+ListDisplay[i].getmarketid()+"_price_history.html");
		
		iframe.classList.add("iframestyle");
	

		let newitem = document.createElement("div");
		if(ListDisplay.length == 1){
			newitem.classList.add("singlesearchresult");
		}else{
			newitem.classList.add("searchresult");
		}
		
		

		newitem.appendChild(divcontent);
		newitem.appendChild(iframe);
	
		searchlist.appendChild(newitem);
	}
	
}

async function loadMarketsFromJSON(){

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

	for(let i = 0; i < MarketJSON.length; i++){

		let postidlist = []

		for(let j = 0; j < MarketJSON[i].twt.length; j++){
			postidlist.push(MarketJSON[i].twt[j].id);
		}

		let newmarket = new market(MarketJSON[i].id,MarketJSON[i].avg,MarketJSON[i].std,MarketJSON[i].top,postidlist);

        if(!(ListOfTopics.includes(MarketJSON[i].top[0]))){
            ListOfTopics.push(MarketJSON[i].top[0]);
        }

        

		ListOfMarkets.push(newmarket);

		ListDisplay = ListOfMarkets;
	}
    //console.log(ListOfTopics);
}
/*
buildDropdown();
new TomSelect("#search", {
	create: false,
	allowEmptyOption: true
});
//buildTopicList();
loadMarketsFromJSON().then(buildresults);
*/

let tom;

loadMarketsFromJSON().then(() => {
	buildDropdown();

	tom = new TomSelect("#search", {
		create: false,
		allowEmptyOption: true
	});
	
	tom.control_input.addEventListener("keydown", function (event) {
		if (event.key === "Enter") {
			event.preventDefault();
			search();
		}
	});

	buildresults();
});

