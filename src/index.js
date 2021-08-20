/* global chrome */
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import ScholarModeButton from './components/ScholarModeButton'
import Discussion from './components/Discussion'
import VotedTagContainer from './components/VotedTagContainer'

const renderScholarmode = async() => {
    try{
        const insertionPoint = document.createElement('div')
        insertionPoint.id = 'insertion-point'
        console.log('created div')

        const searchDiv = await document.querySelector('#center');
        await searchDiv.appendChild(insertionPoint)
        console.log('searchDiv triggered')

        const renderToggle = ReactDOM.render(
            <React.StrictMode>
                <ScholarModeButton />
            </React.StrictMode>,
            document.getElementById('insertion-point')
        )
        console.log('rendered toggle')
    } 
    catch(err){
        console.log(err)
    }
} 


const renderDiscussion = async() => {
    //create div for discussion
    const beforeVideos = document.createElement('div')
    beforeVideos.id = 'prevideos'
    beforeVideos.style.display = 'none'
    
    //check for recommended videos and place div before videos
    const secondary = document.querySelector('#secondary')
    secondary.insertAdjacentElement('afterbegin', beforeVideos)


    // render discussion into hidden div
    const discussion = ReactDOM.render(
        <React.StrictMode>
            <Discussion />
        </React.StrictMode>,
        document.getElementById('prevideos')
    )


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
            
            
            // let beforeVideos = await createDiv()
            // let div = await placeDiv(beforeVideos)
            await renderDiscussion()
            // await toggleVideos(div)
        }
    }
    catch(err){
        console.log(err)
    }
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



const renderTagContainer = async() => {
    try{
        if(window.location.pathname === '/watch'){

            const tagContainer = document.createElement('div')
            tagContainer.id = 'tagContainer'
            console.log('created tagContainer')
            
            const videoMenu = document.getElementById('menu-container')
            videoMenu.insertAdjacentElement('beforebegin', tagContainer)
            console.log('inserted before videoMenu')
            
            const injectTagContainer = ReactDOM.render(
                <React.StrictMode>
                    <VotedTagContainer />
                </React.StrictMode>,
                document.getElementById('tagContainer')
                )
                console.log('injected tagContainer')
            }}catch(err){
            console.log(err)
        } 
} 

const renderApp = async() =>{
    await renderScholarmode()
    await showDiscussion()
    renderTagContainer()
}
    
    if(document.body){
        renderApp()
}else{
    document.addEventListener('DOMContentLoaded', renderApp )
}


// if(document.getElementById('top-level-buttons-computed')){
//     renderTagContainer()
// }else{
//     document.addEventListener('DOMContentLoaded', renderTagContainer )
// }