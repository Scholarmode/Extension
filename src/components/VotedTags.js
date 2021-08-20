/* global chrome */
import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {linkifyYouTubeURLs, host} from './Discussion'

const Tag = styled.div`
    width: 100px;
    height: 50px;
    background-color: black;
`

// const linkifyYouTubeURLs = (text) => {
//     const re =
//         /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gi
//     return text.replace(re, '$1')
// }

const getProfileInfo = (token) => {
    const url = `${host}/auth/chrome?access_token=${token}`
    return fetch(url).then((response) => response.json())
}

const VotedTags = () => {

    const [isLoaded, setIsLoaded] = useState(false)
    const [questions, setQuestions] = useState(null)
    const [url, setUrl] = useState(
        `${host}/questions/video/${linkifyYouTubeURLs(window.location.href)}`
    )

    useEffect(() => {
        chrome.storage.sync.get(['token'], (result) => {
            fetch(url + `?token=${result.token}`)
                .then(function (response) {
                    if (response.status !== 200) {
                        console.log(
                            'Looks like there was a problem. Status Code: ' +
                                response.status
                        )
                        return 
                    }

                    // Examine the text in the response
                    response.json().then(function (data) {
                        console.log('Response: ' + data)
                        setIsLoaded(true)
                        setQuestions(data)
                    })
                })
                .catch(function (err) {
                    console.log('Fetch Error :-S', err)
                })
        })
    }, [url])


    const [tagName, setTagName] = useState('boring')

    const createTag = () => {


        const tagTitle = JSON.stringify(tagName)

            chrome.storage.sync.get(['token'], async (result) => {
                getProfileInfo(result.token).then((info) => {
                    const reqBody = {
                        video: url,
                        title: tagTitle,
                        votes: 0,
                        dateCreated: new Date(),
                        author: info._id,
                    }

                        fetch(`${host}/votedTag?token=${result.token}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(reqBody),
                            redirect: 'follow',
                        })
                            .then((response) => response.text())
                            .then((result) => {
                                console.log(JSON.parse(result))
                                console.log(
                                    'result length: ' + JSON.parse(result).length
                                )
                                if (JSON.parse(result).length == 1) {
                                    console.log('Inside')
                                }
                            })
                            .catch((error) => console.log('error-reply', error))
                    })
                })
            // } else {
            //     console.log('Here: ' + postToReplies)
            //     // This will basically post the content to questions db
            //     chrome.storage.sync.get(['token'], async (result) => {
            //         getProfileInfo(result.token).then((info) => {
            //             const reqBody = {
            //                 author: info._id,
            //                 content: newValue,
            //                 dateCreated: new Date(),
            //                 flagged: false,
            //                 replies: [],
            //                 reports: [],
            //                 timestamp: getTimestamp(),
            //                 title: titleInput,
            //                 video: linkifyYouTubeURLs(window.location.href),
            //                 votes: 0,
            //                 slateLang: codeLanguage,
            //             }

            //             // (async () => {
            //             //     const rawResponse =
            //             // })
            //             fetch(`${host}/questions?token=${result.token}`, {
            //                 method: 'POST',
            //                 headers: {
            //                     'Content-Type': 'application/json',
            //                 },
            //                 body: JSON.stringify(reqBody),
            //                 redirect: 'follow',
            //             })
            //                 .then(async (response) => {
            //                     // if (response.status !== 200) {
            //                     //     setPostReqError(true)
            //                     // }
            //                     // else {
            //                     //     console.log("Response: " + response);
            //                     //     console.log("Questions: " + allQuestions)
            //                     //     console.log("JSON: " + response.json());
            //                     //     let jsonR = response.json()
            //                     //     let whole = { ...allQuestions, reqBody }
            //                     //     let newObj = Object.assign({}, allQuestions, reqBody)
            //                     //     console.log("NewObj: " + JSON.stringify(reqBody))
            //                     //     // setQuestions(newObj)
            //                     // }
            //                     let data = await response.json()
            //                     if (response.status != 200) {
            //                         console.log('Error')
            //                     } else {
            //                         console.log(JSON.stringify(data))
            //                         let newObj = insertObject(allQuestions, 0, data)
            //                         console.log(
            //                             'New Obj: ' + JSON.stringify(newObj)
            //                         )
            //                         setQuestions(null)
            //                         setQuestions(newObj)
            //                         askButtonStateFunc(false)
            //                         // console.log("Length of all questions: " + allQuestions.length())
            //                     }
            //                 })
            //                 .then((data) => {
            //                     console.log('Responses m: ' + data)
            //                 })
            //                 .catch((err) => {
            //                     console.log('Error: ' + err)
            //                     setPostReqError(true)
            //                 })
            //         })
            //     })
            // }
    }



    return (
        <div>
            <Tag />
        </div>
    )
}
export default VotedTags