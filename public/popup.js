/* global chrome */
let popup = document.getElementById('popup')

chrome.storage.sync.get(['token'], async (result) => {
  if (result.token === 'undefined') {
    renderLogin()
  } else {
    getProfileInfo(result.token).then((info) => renderProfile(info))
  }
})

const renderLogin = () => {
  let button = document.createElement('button')
  button.innerHTML = 'Sign In'
  popup.appendChild(button)
}

const getProfileInfo = (token) => {
  const url = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`
  return fetch(url).then((response) => response.json())
}

const renderProfile = (info) => {
  console.log(info)
  let name = document.createElement('div')
  name.innerHTML = info.name
  popup.appendChild(name)
}
