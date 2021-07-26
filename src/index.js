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


//create div
const beforeVideos = document.createElement('div');
beforeVideos.id = 'prevideos';
beforeVideos.style.display = 'none';

//check for recommended videos and prepend div
if (document.querySelector('#secondary')) {
  document.querySelector('#secondary').insertAdjacentElement('afterbegin', beforeVideos)
}
else {
  console.log('discussion div not rendered')
}


ReactDOM.render(
  <React.StrictMode>
    <Discussion />
  </React.StrictMode>,
  document.getElementById('prevideos')
)

//find recommended videos
const videos = document.getElementById('secondary-inner')

//find toggle to know the state
const toggle = document.querySelector('.sc-bdnxRM')

toggle.addEventListener("click", () => {
  if(toggle.classList[toggle.classList.length - 1] === 'active'){
    beforeVideos.style.display = "block"
    videos.style.display = "none";
  }else{
    beforeVideos.style.display = "none"
    videos.style.display = "block"
  }
})


// Add chrome storage listener to render questions/recommended videos when button is toggled.
// chrome.storage.onChanged.addListener((changes, namespace) => {
  // for (let key in changes) {
    // if (key === 'active') {
    //   chrome.storage.sync.get(['active'], (response) => {
    //     if (response.active) {  
    //     beforeVideos.style.display = "block"
    //     videos.style.display = "none";


    //     } else {
    //       beforeVideos.style.display = "none"
    //       videos.style.display = "block"
    //     }
    //   })
    // }
  // }
// })
          
    
  


// update recommended videos on first YouTube load or any refresh
window.onload = () => {
    if (toggle.classList[toggle.classList.length - 1] === 'active') {
      beforeVideos.style.display = "block"
      videos.style.display = "none";
      
    } else {
      beforeVideos.style.display = "none"
      videos.style.display = "block"
    }
}