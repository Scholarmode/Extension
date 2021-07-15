/* global chrome */
let header = document.getElementsByTagName('header')[0];
let main = document.getElementById('main');

chrome.storage.sync.get(['token'], async (result) => {
	if (result.token === 'undefined') {
		renderLogin();
	} else {
		getProfileInfo(result.token).then((info) => renderProfile(info));
	}
});

const renderLogin = () => {
	let button = document.createElement('button');
	button.innerHTML = 'Sign In';
	main.appendChild(button);
};

const getProfileInfo = (token) => {
  const url = `http://localhost:8080/auth/chrome?access_token=${token}`;
	return fetch(url).then((response) => response.json());
};

const renderProfile = (info) => {
	console.log(info);
	// Add total votes to header
	let votesDiv = document.createElement('div');
	votesDiv.id = 'votes';
	let votes = document.createElement('span');
	votes.id = 'votes-num';
	votes.innerHTML = '+236 ';
	votesDiv.appendChild(votes);
	let text = document.createTextNode('VOTES');
	votesDiv.appendChild(text);
	header.appendChild(votesDiv);

	// Render welcome message
	let welcome = document.createElement('div');
	let h1 = document.createElement('h1');
	h1.innerHTML = 'Welcome ' + info.given_name + '.';
	let message = document.createElement('p');
	message.innerHTML = "Here's a summary of what you've been up to lately...";
	welcome.appendChild(h1);
	welcome.appendChild(message);
	main.appendChild(welcome);

	// Render user's stats
	let stats = document.createElement('div');
	stats.id = 'stats';
	let asked = createStatDiv(43, 'QUESTIONS ASKED');
	stats.appendChild(asked);
	let replies = createStatDiv(75, 'TOTAL REPLIES');
	stats.appendChild(replies);
	main.appendChild(stats);
};

const createStatDiv = (stat, label) => {
	let div = document.createElement('div');
	div.className = 'stat';
	let statDiv = document.createElement('div');
	statDiv.innerHTML = stat;
	statDiv.className = 'stat-display';
	div.append(statDiv);
	let labelDiv = document.createElement('div');
	labelDiv.innerHTML = label;
	labelDiv.className = 'stat-label';
	div.appendChild(labelDiv);
	return div;
};
