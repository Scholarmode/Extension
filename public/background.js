/* global chrome */
chrome.identity.getAuthToken({ interactive: true }, function (token) {
	const url = `http://localhost:8080/auth/chrome?access_token=${token}`;
	fetch(url).then((response) => response.json());
});
