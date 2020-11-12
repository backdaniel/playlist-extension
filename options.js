var channels = ['foobar', 'foo', 'bar', 'baz', 'qux', 'quux'];
var playlists = ['foobar', 'foo', 'bar', 'baz', 'qux', 'quux'];

for (var channel of channels) {
	document.getElementById("div").innerHTML += `
	<tr><td><label id="${channel}" for="${channel}Playlist">${channel}</label></td>
	<td><select id="${channel}Playlist">
		<option value="Selecione">Selecione</option>
	</select></td></tr>
	`;
	for (var playlist of playlists) {
		document.getElementById(`${channel}Playlist`).innerHTML += `
		<option value="${playlist}">${playlist}</option>
		`;
	}
}
