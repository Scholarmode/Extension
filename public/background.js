/* global chrome */
chrome.identity.getAuthToken({ interactive: true }, function (token) {
    chrome.storage.sync.set({ token: token }, () => {})
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        if (tab.url.indexOf('youtube.com') !== -1) {
            chrome.identity.getAuthToken(
                {
                    interactive: true,
                },
                (token) => {
                    chrome.storage.sync.set({ token: token })
                }
            )
        }
    }
})
