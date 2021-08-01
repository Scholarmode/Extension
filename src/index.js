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


const createDiv = async() => {
    //create div for discussion
    const beforeVideos = document.createElement('div')
    beforeVideos.id = 'prevideos'
    beforeVideos.style.display = 'none'

    return beforeVideos
}

const placeDiv = async(beforeVideos) => {
    //check for recommended videos and place div before videos
    const secondary = document.querySelector('#secondary')
    secondary.insertAdjacentElement('afterbegin', beforeVideos)

    return beforeVideos
}

const renderDiscussion = async() => {
    // render discussion into hidden div
    ReactDOM.render(
        <React.StrictMode>
            <Discussion />
        </React.StrictMode>,
        document.getElementById('prevideos')
    )
}

const toggleVideos = async(beforeVideos) => {
    //find recommended videos
    const videos = document.getElementById('secondary-inner')

    //find toggle to know the state
    const toggle = document.querySelector('.sc-bdnxRM')

    //observe when toggle changes
    const toggleObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.target.classList[2] === 'active') {
                beforeVideos.style.display = 'block'
                videos.style.display = 'none'
            } else {
                beforeVideos.style.display = 'none'
                videos.style.display = 'block'
            }
        })
    })

    toggleObserver.observe(toggle, {
        childList: false,
        attributes: true,
    })
}



const showDiscussion = async() => {
    try{
        if(window.location.pathname === '/watch'){
            
            
            let beforeVideos = await createDiv()
            let div = await placeDiv(beforeVideos)
            await renderDiscussion()
            await toggleVideos(div)
        }
    }
    catch(err){
        console.log(err)
    }
}

if(document.body){
    showDiscussion()
}else{
    document.addEventListener('DOMContentLoaded', showDiscussion )
}


const discussionFromHomepage = () => {
    if(window.location.pathname === '/watch'){
        window.location.reload()
        document.removeEventListener('yt-navigate-finish', discussionFromHomepage)
    }
}


//if YouTube homepage then track render disccusion on navigate
if(window.location.pathname === '/'){
document.addEventListener('yt-navigate-finish', discussionFromHomepage)
}