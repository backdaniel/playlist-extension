function generateLink() {
	document.getElementById("gerar").href = 'https://backdaniel.com/playlist' +
		'?y=' + encodeURIComponent(localStorage.getItem('youtube')) +
		'&v=' + encodeURIComponent(localStorage.getItem('vimeo')) +
		'&l=' + encodeURIComponent(localStorage.getItem('lbry'));
	document.getElementById("itens").innerHTML =
		youtube.length +
		vimeo.length +
		lbry.length;
}

document.getElementById("limpar").addEventListener("click", function() {
	localStorage.removeItem('youtube');
	localStorage.removeItem('vimeo');
	localStorage.removeItem('lbry');
	youtube = []
	vimeo = []
	lbry = []
	generateLink();
});

document.getElementById("syncYoutube").addEventListener("click", function() {
	console.log('getting page content');
	function modifyDOM() {
		console.log('inside page');
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
		youtube = [...new Set(results[0])];
		localStorage.setItem('youtube', JSON.stringify(youtube));
		generateLink();
	});
});

document.getElementById("syncVimeo").addEventListener("click", function() {
	console.log('not yet implemented');
});

document.getElementById("syncLbry").addEventListener("click", function() {
	console.log('not yet implemented');
});

var youtube = JSON.parse(localStorage.getItem('youtube')) || [];
var vimeo = JSON.parse(localStorage.getItem('vimeo')) || [];
var lbry = JSON.parse(localStorage.getItem('lbry')) || [];
generateLink();
