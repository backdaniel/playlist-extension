/*
const executing = chrome.tabs.executeScript({
  code: 'var channels = []; var links = document.querySelectorAll(\'.channel-link\'); for(var i = 0; i < links.length; i++){channels.push(links[i].href)} chrome.storage.local.set({"channels": "hello world"}, function() { console.log(\'set array\'); }) chrome.storage.local.get(["channels"], function(result) { console.log("Value currently is " + result.key); });'
});
*/

document.getElementById("settings").addEventListener("click", function() {
	chrome.runtime.openOptionsPage();
});

document.getElementById("syncSub").addEventListener("click", function() {
	console.log('getting page content');

	function modifyDOM() {
		console.log('inside page');
		//return document.body.innerHTML;
		var channels = [];
		var links = document.querySelectorAll('.channel-link');
		for(var i = 0; i < links.length; i++) {
			channels.push(links[i].href)
		}
		return channels;
	}

	chrome.tabs.executeScript({
		code: '(' + modifyDOM + ')();'
	}, (results) => {
		console.log('popup script');
		console.log(results[0]);
	});

});

document.getElementById("syncPlay").addEventListener("click", function() {
	function modifyDOM() {
		var playlists = [];
		var links = document.querySelectorAll("a[href*='/playlist?list='].ytcp-playlist-row");
		for(var i = 0; i < links.length; i++) {
			if (!playlists.includes(links[i].href)) {
				playlists.push(links[i].href)
			}
		}
		return playlists;
	}
	chrome.tabs.executeScript({
		code: '(' + modifyDOM + ')();'
	}, (results) => {
		console.log(results[0]);
	});

});
