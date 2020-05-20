function search (info, tab) {
  return function (info, tab) {
    var selection = info.selectionText;
    var name = selection.split(' ');
    var firstname = name[0].toLowerCase();
    firstname = trimAll(firstname);
    var lastname = name.slice(1).toString().toLowerCase();
    lastname = trimAll(lastname)
    var url = "https://www.basketball-reference.com/players/" + lastname[0] + "/" + lastname.slice(0, 5) + firstname.slice(0, 2) + "01.html"
    chrome.tabs.create ({index: tab.index + 1, url: url, selected: true});
  }
}
function trimAll(myString) {
	return myString.replace(/[^a-z]/g,'');
}
chrome.contextMenus.create ({
  "title": "Search for full stats",
  "type": "normal",
  "contexts": ["selection"],
  "onclick": search ()
});