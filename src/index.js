/* global chrome */
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import ScholarModeButton from './components/ScholarModeButton'
import Discussion from './components/Discussion'

const insertionPoint = document.createElement('div')
insertionPoint.id = 'insertion-point'

//check for pc searchbar and append scholarmode
if (document.querySelector('#center')) {
  document.querySelector('#center').appendChild(insertionPoint)
}

//check for mobile searchbar and append scholarmode !doesn't work because m.youtube.com 404 error
else if (
  document.querySelector('.mobile-topbar-header-content non-search-mode cbox')
) {
  document
    .querySelector('.mobile-topbar-header-content non-search-mode cbox')
    .appendChild(insertionPoint)
} else {
  console.log('scholarmode not rendered')
}

//render ScholarMode
ReactDOM.render(
  <React.StrictMode>
    <ScholarModeButton />
  </React.StrictMode>,
  document.getElementById('insertion-point')
)

// Add chrome storage listener to render questions/recommended videos when button is toggled.
chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let key in changes) {
    if (key === 'active') {
      chrome.storage.sync.get(['active'], (response) => {
        if (response.active) {
          ReactDOM.render(
            <React.StrictMode>
              <Discussion />
            </React.StrictMode>,
            document.getElementById('secondary')
          )
        } else {
          chrome.storage.sync.get(['recommendedVideos'], (response) => {
            let secondaryInner = document.createElement('div')
            secondaryInner.id = 'secondary-inner'
            secondaryInner.className = 'style-scope ytd-watch-flexy'
            secondaryInner.innerHTML = response.recommendedVideos
            let discussion = document.getElementById('discussion')
            discussion.remove()
            let secondary = document.getElementById('secondary')
            secondary.appendChild(secondaryInner)
          })
        }
      })
    }
  }
})


window.onload = () => {
  chrome.storage.sync.get(['active'], (response) => {
    if (response.active) {
      ReactDOM.render(
        <React.StrictMode>
          <Discussion />
        </React.StrictMode>,
        document.getElementById('secondary')
      )
    } else {
      chrome.storage.sync.get(['recommendedVideos'], (response) => {
        let secondaryInner = document.createElement('div')
        secondaryInner.id = 'secondary-inner'
        secondaryInner.className = 'style-scope ytd-watch-flexy'
        secondaryInner.innerHTML = response.recommendedVideos
        let discussion = document.getElementById('discussion')
        discussion.remove()
        let secondary = document.getElementById('secondary')
        secondary.appendChild(secondaryInner)
      })
    }
  })
}




//find and store recommended videos in localStorage
if (document.getElementById('secondary-inner')) {
  chrome.storage.sync.set({
    recommendedVideos: document.getElementById('secondary-inner').innerHTML
  })
} else {
  console.log('no videos here')
}

//render Q&A section when we've retrieved the videos
// if (recommendedVideos && activated) {
//   ReactDOM.render(
//     <React.StrictMode>
//       <Discussion />
//     </React.StrictMode>,
//     document.getElementById('secondary')
//   )
// } else {
//   // render videos
// }

// // render videos
// if (recommendedVideos && !activated) {
//   var tpl = document.createElement('template')
//   tpl.innerHTML = recommendedVideos
//   document.getElementById('secondary').appendChild(tpl.content)

//   console.log(tpl)

// while(document.getElementById('secondary').firstChild){Element.appendChild(document.getElementById('secondary').firstChild)}
// }
