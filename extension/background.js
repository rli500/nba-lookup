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
	  .catch(error => console.log('didnt work'));
	}
}

var myID = null;
var myurl = null;

function showPopUp (data) {
	// window.open("playerPop.html", "extension_popup", "width=300,height=400,status=no,scrollbars=yes,resizable=no");
	chrome.notifications.create('', {
  		title: data["name"] + "'s stats for 2019-20 season:",
  		message: "Points: " + data["points"].toString() + "\n"
  			   + "Assists: " + data["assists"].toString() + "\n" 
  			   + "Blocks: " + data["blocks"].toString() + "\n",
  		iconUrl: '/icon.png',
  		type: 'basic',
  		buttons: [{
  			title: "Click here for full stats!",
  		}]
	}, function(id){
		myID = id;
		myurl = data["url"];
	});
}

chrome.notifications.onButtonClicked.addListener(function(notifId, tab) {
    if (notifId === myID) {
    	window.open(myurl);
    }
});

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
