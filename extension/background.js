// function search (info, tab) {
//   return function (info, tab) {
//     var selection = info.selectionText;
//     var ar = getNames(selection);
//     firstname = ar[0];
//     lastname = ar[1];
//     var url = "https://www.basketball-reference.com/players/" + lastname[0] + "/" + lastname.slice(0, 5) + firstname.slice(0, 2) + "01.html"
//     chrome.tabs.create ({index: tab.index + 1, url: myurl, selected: true});
//   }
// }

function trimAll(myString) {
	return myString.replace(/[^a-z]/g,'');
}

function getNames(myString) {
    var name = myString.split(' ');
    var firstname = name[0].toLowerCase();
    firstname = trimAll(firstname);
    var lastname = name.slice(1).toString().toLowerCase();
    lastname = trimAll(lastname)
    return [firstname, lastname]
}

const gcp = "YOUR_GCP_API_URL"

function getStats (info, tab) {
	return function (info, tab) {
	  var selection = info.selectionText;
	  var ar = getNames(selection)
	  firstname = ar[0];
	  lastname = ar[1];

	  console.log(firstname);
	  console.log(lastname);

	  data = {
	  	"firstname": firstname,
	  	"lastname": lastname
	  }

	  fetch(gcp, {
	  	method: 'POST',
	  	body: JSON.stringify(data),
	  	headers: {
	  		"Content-Type": 'application/json'
	  	}
	  })
	  .then((response) => response.json())
	  .then((responseJson) => showPopUp(responseJson))
	  .catch(error => console.error(error));
	}
}

var myID = null;
var myurl = null;

function showPopUp (data) {
	// chrome.notifications.create('', {
 //  		title: data["name"] + "'s stats for 2019-20 season:",
 //  		message: "Points: " + data["points"].toString() + "\n"
 //  			   + "Assists: " + data["assists"].toString() + "\n" 
 //  			   + "Blocks: " + data["blocks"].toString() + "\n",
 //  		iconUrl: '/icon.png',
 //  		type: 'basic',
 //  		buttons: [{
 //  			title: "Click here for full stats!",
 //  		}]
	// }, function(id){
	// 	myID = id;
	// 	myurl = data["url"];
	// });

	console.log('popup');
	chrome.windows.create({url: "popup/playerStats.html?data=" + encodeURIComponent(JSON.stringify({
		name: data["name"],
		team: data["team"],
		points: data["points"],
		assists: data["assists"],
		blocks: data["blocks"],
		FGP: data["field_goal_percentage"],
		FTP: data["free_throw_percentage"],
		TPP: data["three_point_percentage"],
		NPM: data["net_plus_minus"],
		url: data["url"]
	}))
		, type: "popup", height: 550, width: 525});
	console.log('popup done');
}

// chrome.notifications.onButtonClicked.addListener(function(notifId, tab) {
//     if (notifId === myID) {
//     	window.open(myurl);
//     }
// });

chrome.contextMenus.create ({
	"title": "Get quick stats",
	"type": "normal",
	"contexts": ["selection"],
	"onclick": getStats ()
});

// chrome.contextMenus.create ({
//   "title": "Search for full stats",
//   "type": "normal",
//   "contexts": ["selection"],
//   "onclick": search ()
// });
