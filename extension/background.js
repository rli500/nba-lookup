function search (info, tab) {
  return function (info, tab) {
    var selection = info.selectionText;
    var ar = getNames(selection);
    firstname = ar[0];
    lastname = ar[1];
    var url = "https://www.basketball-reference.com/players/" + lastname[0] + "/" + lastname.slice(0, 5) + firstname.slice(0, 2) + "01.html"
    chrome.tabs.create ({index: tab.index + 1, url: url, selected: true});
  }
}

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

const gcp = "GCP_API_URL"

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

function showPopUp (data) {
	alert(data["points"]);
}

chrome.contextMenus.create ({
	"title": "Get quick stats",
	"type": "normal",
	"contexts": ["selection"],
	"onclick": getStats ()
});

chrome.contextMenus.create ({
  "title": "Search for full stats",
  "type": "normal",
  "contexts": ["selection"],
  "onclick": search ()
});
