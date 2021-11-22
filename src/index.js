/* global chrome */
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import ScholarModeButton from './components/ScholarModeButton'
import Discussion from './components/discussion/Discussion'
import { InviteComments } from './components/InviteComments'
import { Mixpanel } from './components/Mixpanel'
import { Viewport } from './components/Viewport'
import faunadb from 'faunadb'
export var q = faunadb.query
export var client = new faunadb.Client({ secret: "fnAEYYpf4vACQgnotQRfs-JhAKqLnjtmyOuoYO1y" })

// chrome.runtime.onInstalled.addListener(function(details){
//     if(details.reason === "install"){
//         Mixpanel.track('Extension installed')
//         //call a function to handle an install 
//     }else if(details.reason === "update"){
//         Mixpanel.track('Extension updated')
//         //call a function to handle an update
//     }
// });

const renderScholarmode = async() => {
    try{
        if(!document.getElementById('center')){
            renderScholarmode()
        }else{
        const insertionPoint = document.createElement('div')
        insertionPoint.id = 'insertion-point'

        const searchDiv = await document.querySelector('#center');
        await searchDiv.appendChild(insertionPoint)


        const renderToggle = ReactDOM.render(
            <React.StrictMode>
                <ScholarModeButton />
            </React.StrictMode>,
            document.getElementById('insertion-point')
            )
        }
    } 
    catch(err){
        console.log(err)
    }
} 


const createDiscussionDiv = async() => {
    //create div for discussion
    const beforeVideos = document.createElement('div')
    beforeVideos.id = 'prevideos'
    beforeVideos.style.display = 'none'

    return beforeVideos
}

const placeDiscussionDiv = async(beforeVideos) => {
    //check for recommended videos and place div before videos
    const secondary = document.querySelector('#secondary')
    secondary.insertAdjacentElement('afterbegin', beforeVideos)

    return beforeVideos
}

const renderDiscussion = async() => {
    // render discussion into hidden div
    ReactDOM.render(
        <React.StrictMode>
            <Viewport />
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
            
            if(!document.getElementById('secondary')){
                showDiscussion()
            }else{
                let beforeVideos = await createDiscussionDiv()
                let div = await placeDiscussionDiv(beforeVideos)
                await renderDiscussion()
                await toggleVideos(div)
            }
        }
    }
    catch(err){
        console.log(err)
    }
}


// nothing loads if the page navigates from home-page to video
// a refresh solves that problem in the short-term 
const refreshPageFromYTNavigateEvent = () => {
    if(window.location.pathname === '/watch'){
        window.location.reload()
        document.removeEventListener('yt-navigate-finish', refreshPageFromYTNavigateEvent)
    }
}


//if User is on the YouTube homepage then trigger a refresh on navigate
if(window.location.pathname === '/'){
    document.addEventListener('yt-navigate-finish', refreshPageFromYTNavigateEvent)
}


const showInviteComments = () => {
    try{
        if(window.location.pathname === '/watch'){
            const CommentsHeader = document.querySelector('#title.ytd-comments-header-renderer');
            if(CommentsHeader){
                const CommentsDiv = document.createElement('div');
                CommentsDiv.id = 'CommentsDiv';
                CommentsDiv.style.marginLeft = 'auto';
                CommentsHeader.appendChild(CommentsDiv);

                const renderInvite = ReactDOM.render(
                    <React.StrictMode>
                        <InviteComments />
                    </React.StrictMode>,
                    document.getElementById('CommentsDiv')
                    )
                document.removeEventListener('scroll', scrollEventListener)
                document.removeEventListener('scroll', showInviteComments)
            }
        }
    } 
    catch(err){
        console.log(err)
    }
} 


const renderApp = async() =>{
    await renderScholarmode()
    showDiscussion()
}

if(document.body){
    renderApp()
}else{
    document.addEventListener('DOMContentLoaded', renderApp )
}

const scrollEventListener = () => {
    document.addEventListener('scroll', showInviteComments())

}

document.addEventListener('scroll', scrollEventListener)
document.addEventListener('yt-navigate-finish', scrollEventListener)

