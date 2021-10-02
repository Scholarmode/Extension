/* global chrome */
import { useState } from 'react'
import Question from './Question'
import { QuestionContext } from './QuestionContext'
import { useEffect } from 'react'
import AskQuestionButton from './AskQuestionButton'
import styled from 'styled-components'
import ReplyBox from './ReplyBox'
import TitleInput from './TitleInput'
import { CircularProgress } from '@material-ui/core'
import EmptyScreen from './EmptyScreen'
import { Mixpanel } from './Mixpanel';
import { getProfileInfo } from "./ReplyBox";

Mixpanel.track('Discussion rendered');

// const host = 'http://localhost:8080'
const host = 'https://scholarmode.herokuapp.com'

const CustomDiv = styled.div`
    margin: 10px;
    margin-top: 0px;
    margin-left: 0px;
`

const MyCircularProgress = styled(CircularProgress)`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
    margin-left: 200px;
`

const linkifyYouTubeURLs = (text) => {
    const re =
        /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gi
    return text.replace(re, '$1')
}

const Discussion = () => {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [questions, setQuestions] = useState(null)

    const refreshDiscussion = (event) => {
        if(window.location.pathname === '/watch'){
            setQuestions(null)
            setUrl(
                `${host}/questions/video/${linkifyYouTubeURLs(window.location.href)}`
            )
            Mixpanel.track('Discussion refresh')
        }   
    }

    window.addEventListener('yt-navigate-finish', refreshDiscussion)

    const [url, setUrl] = useState(
        `${host}/questions/video/${linkifyYouTubeURLs(window.location.href)}`
    )
    useEffect(() => {
        chrome.storage.sync.get(['token'], (result) => {
            getProfileInfo(result.token).then((info) => {
                console.log(info)
                // Mixpanel.alias(info.email)
                Mixpanel.identify(info.email)
                Mixpanel.people.set({
                    "$email":info.email,
                    "$name":info.name,
                    "$avatar":info.picture,
                    "OAuth_id":info._id,
                    "Google_id":info.googleId,
                    "locale":info.locale,
                })
            })
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
                        setIsLoaded(true)
                        setQuestions(data)
                    })
                })
                .catch(function (err) {
                    console.log('Fetch Error :-S', err)
                })
        })
    }, [url])

    const [askButtonState, setAskButtonState] = useState(false)

    const [title, setTitle] = useState('')

    return (
        <div>
            {questions == null && <MyCircularProgress />}
            {questions != null && (
                <AskQuestionButton
                    askButtonOpen={askButtonState}
                    setAskButtonOpen={setAskButtonState}
                />
            )}
            {questions != null && askButtonState && (
                <CustomDiv>
                    <QuestionContext.Provider
                        value={{ questions, setQuestions }}
                    >
                        <TitleInput title={title} setTitle={setTitle} />
                        <ReplyBox
                            increaseSize={true}
                            postToReplies={false}
                            allQuestions={questions}
                            titleInput={title}
                            askButtonState={askButtonState}
                            askButtonStateFunc={setAskButtonState}
                        />
                    </QuestionContext.Provider>
                </CustomDiv>
            )}
            {questions != null && questions == '' && <EmptyScreen />}
            {questions != null &&
                questions.map((question) => {
                    return (
                        <QuestionContext.Provider
                            value={{ question, setQuestions }}
                        >
                            <Question
                                question={question}
                                allQuestions={questions}
                            />
                        </QuestionContext.Provider>
                    )
                })}
        </div>
    )
}

export default Discussion

export {host}
