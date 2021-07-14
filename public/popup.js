/* global chrome */
let main = document.getElementById('main')

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
  main.appendChild(button)
}

const getProfileInfo = (token) => {
  const url = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`
  return fetch(url).then((response) => response.json())
}

const renderProfile = (info) => {
  console.log(info)
  let welcome = document.createElement('div')
  let header = document.createElement('h1')
  header.innerHTML = 'Welcome ' + info.given_name + '.'
  let message = document.createElement('p')
  message.innerHTML = "Here's a summary of what you've been up to lately..."
  welcome.appendChild(header)
  welcome.appendChild(message)
  main.appendChild(welcome)

  // Retrieve user information from DB and render
  let stats = document.createElement('div')
  stats.id = 'stats'
  let asked = createStatDiv(43, 'QUESTIONS ASKED')
  stats.appendChild(asked)
  let replies = createStatDiv(75, 'TOTAL REPLIES')
  stats.appendChild(replies)
  main.appendChild(stats)
}

const createStatDiv = (stat, label) => {
  let div = document.createElement('div')
  div.className = 'stat'
  let statDiv = document.createElement('div')
  statDiv.innerHTML = stat
  statDiv.className = 'stat-display'
  div.append(statDiv)
  let labelDiv = document.createElement('div')
  labelDiv.innerHTML = label
  labelDiv.className = 'stat-label'
  div.appendChild(labelDiv)
  return div
}
