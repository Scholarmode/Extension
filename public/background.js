/* global chrome */

chrome.identity.getAuthToken({ interactive: true }, function (token) {
  chrome.storage.sync.set({ token: token }, () => {
    console.log('Token set to ' + token)
  })
})
