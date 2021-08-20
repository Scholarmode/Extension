/* global chrome */
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import ScholarModeButton from './components/ScholarModeButton'
import Discussion from './components/Discussion'
import VotedTags from './components/VotedTags'

const renderScholarmode = async() => {
    try{
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
    catch(err){
        console.log(err)
    }
} 

// if(document.body){
//     renderScholarmode()
// }else{
//     document.addEventListener('DOMContentLoaded', renderScholarmode )
// }





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
        if(window.location.pathname === '/watch'){
            
            
            let beforeVideos = await createDiv()
            let div = await placeDiv(beforeVideos)
            await renderDiscussion()
            await toggleVideos(div)
        }
}

// if(document.body){
//     showDiscussion()
// }else{
//     document.addEventListener('DOMContentLoaded', showDiscussion )
// }


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




const renderVotedTags = async() => {
    const divNextToLikes = document.createElement('div')
    divNextToLikes.id = 'votedTags'
        console.log('created divNextToLikes in VirDOM')
        
        const videoButtons = await document.querySelector('#top-level-buttons-computed');
        await videoButtons.insertAdjacentElement('afterbegin', divNextToLikes)
        console.log('divNextToLikes inserted')
        
        ReactDOM.render(
            <React.StrictMode>
                <VotedTags />
            </React.StrictMode>,
            document.getElementById('votedTags')
            )
            console.log('rendered Tags')
        } 
        
        const showTags = () => {
    if(window.location.pathname === '/watch'){
        renderVotedTags()
    }
}


const renderApp = async() =>{
    await renderScholarmode()
    await showDiscussion()
    await showTags()
}

// const searchbar = document.querySelector('#center')

// const searchbarObserver = new MutationObserver(function (mutations) {
//     for (let mutation of mutations) {
    //       if (mutation.type === 'childList') {
        //         console.log('Mutation Detected: A child node has been added or removed.');
//         if(document.querySelector('#insertion-point')){
    //           searchbarObserver.disconnect()
    //         }
//         else{
//             renderApp()
//         }
//       }
//     }
//   });

// searchbarObserver.observe(searchbar, {
//     childList: true
//   });



if(document.body){
    renderApp()
}else{
    document.addEventListener('DOMContentLoaded', renderApp )
}