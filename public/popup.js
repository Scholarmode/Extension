/* global chrome */
const localhost = "http://localhost:8080"
const cloudhost = "https://scholarmode.herokuapp.com"

let header = document.getElementsByTagName('header')[0]
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
    const url = `${cloudhost}/auth/chrome?access_token=${token}`
    return fetch(url).then((response) => response.json())
}

const renderProfile = (info) => {
    // console.log(info)
    // // Add total votes to header
    // let votesDiv = document.createElement('div')
    // votesDiv.id = 'votes'
    // let span = document.createElement('span')
    // let votes = 236
    // span.id = votes >= 0 ? 'votes-num' : '-votes-num'
    // span.innerHTML = (votes > 0 ? '+' : '') + votes.toString() + ' '
    // votesDiv.appendChild(span)
    // let text = document.createTextNode('VOTES')
    // votesDiv.appendChild(text)
    // header.appendChild(votesDiv)

    // Render welcome message
    let welcome = document.createElement('div')
    let h1 = document.createElement('h1')
    h1.innerHTML = 'Welcome ' + info.given_name + '.'
    let message = document.createElement('p')
    message.innerHTML = "You're logged in and ready to learn, where do you want to level up today?"
    // message.innerHTML = "Here's a summary of what you've been up to lately..."
    welcome.appendChild(h1)
    welcome.appendChild(message)
    main.appendChild(welcome)

    // // Render user's stats
    // let stats = document.createElement('div')
    // stats.id = 'stats'
    // let asked = createStatDiv(43, 'QUESTIONS ASKED')
    // stats.appendChild(asked)
    // let replies = createStatDiv(75, 'TOTAL REPLIES')
    // stats.appendChild(replies)
    // main.appendChild(stats)

    // // Render user's stats during last week
    // let container = document.getElementById('week-stats-container')
    // let h2 = document.createElement('h2')
    // h2.innerHTML = 'Since last week...'
    // container.appendChild(h2)
    // let weekStats = document.createElement('div')
    // weekStats.id = 'week-stats'
    // let posted = createSmallStatDiv(1, 'QUESTIONS POSTED')
    // weekStats.appendChild(posted)
    // let votesGained = createSmallStatDiv(-7, 'VOTES GAINED')
    // weekStats.appendChild(votesGained)
    // let newReplies = createSmallStatDiv(3, 'NEW REPLIES')
    // weekStats.appendChild(newReplies)
    // container.appendChild(weekStats)
}

// const createStatDiv = (stat, label) => {
//     let div = document.createElement('div')
//     div.className = 'stat'
//     let statDiv = document.createElement('div')
//     statDiv.innerHTML = stat
//     statDiv.className = stat >= 0 ? 'stat-display' : '-stat-display'
//     div.append(statDiv)
//     let labelDiv = document.createElement('div')
//     labelDiv.innerHTML = label
//     labelDiv.className = 'stat-label'
//     div.appendChild(labelDiv)
//     return div
// }

// const createSmallStatDiv = (stat, label) => {
//     let div = document.createElement('div')
//     div.className = 'stat-sm'
//     let statDiv = document.createElement('div')
//     statDiv.innerHTML = stat
//     statDiv.className = stat >= 0 ? 'stat-display-sm' : '-stat-display-sm'
//     div.append(statDiv)
//     let labelDiv = document.createElement('div')
//     labelDiv.innerHTML = label
//     labelDiv.className = 'stat-label-sm'
//     div.appendChild(labelDiv)
//     return div
// }
