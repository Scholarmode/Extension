/* global chrome */
import styled from 'styled-components'
import TextEditor from './TextEditor'
import { useState } from 'react'
import { Node } from 'slate'
import PostRequestError from './PostRequestError'
import { QuestionContext } from './QuestionContext'
import { useContext } from 'react'
import { Mixpanel } from './Mixpanel'

// const host = 'http://localhost:8080'
const host = 'https://scholarmode.herokuapp.com'

const CustomDiv = styled.div`
    min-height: 100px;
    border: 1px solid gray;
    border-radius: 5px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 5px;
    background-color: white;
    width: 411.25px;
`

const SmallDiv = styled.div`
    min-height: 100px;
    border: 1px solid gray;
    border-radius: 5px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 5px;
    background-color: white;
`

const SubmitButton = styled.button`
    color: white;
    background-color: #da0000;
    border-radius: 10px;
    font-size: 1em;
    text-align: center;
    height: 25px;
    width: 80px;
    border: 1px;
    cursor: pointer;
`

const CancelButton = styled.button`
    border: 0px;
    font-size: 1em;
    color: #626262;
    margin-left: 10px;
    cursor: pointer;
    background: none;
`

const ButtonDiv = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 10px;
`

export const getProfileInfo = (token) => {
    const url = `${host}/auth/chrome?access_token=${token}`
    return fetch(url).then((response) => response.json())
}

const linkifyYouTubeURLs = (text) => {
    const re =
        /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gi
    return text.replace(re, '$1')
}

const getTimestamp = () => {
    const htmlVideoPlayer = document.getElementsByTagName('video')[0]
    const formatTime = (s) => {
        return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + ~~s
    }

    return formatTime(htmlVideoPlayer.currentTime)
}


const ReplyBox = ({
    increaseSize,
    setTotalReplies,
    setNestedComments,
    replyId,
    allQuestions,
    postToReplies,
    askButtonState,
    askButtonStateFunc,
    titleInput,
    allQuestion,
    setPostReqError,
    setReplyBoxStateNew,
    replyBoxStateNew,
    setReplyBoxOpenNew,
    isReplyBoxOpenNew,
}) => {
    const [textValue, setTextValue] = useState(initialValue)
    
    const { setQuestions } = useContext(QuestionContext)
    
    const insertObject = (array, index, arrayToInsert) => {
        Array.prototype.splice.apply(array, [index, 0].concat(arrayToInsert))
        return array
    }
    
    const [codeLanguage, setCodeLanguage] = useState('html')
    
    const postToRepliesDB = (content) => {
        chrome.storage.sync.get(['token'], async (result) => {
            getProfileInfo(result.token).then((info) => {
                const reqBody = {
                    author: info._id,
                    content: content,
                    dateCreated: new Date(),
                    flagged: false,
                    replies: [],
                    reports: [],
                    timestamp: getTimestamp(),
                    parentQuestion: allQuestion._id,
                    parentReply: replyId != null ? replyId : null,
                    votes: 0,
                    slateLang: codeLanguage,
                }

                fetch(`${host}/replies?token=${result.token}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(reqBody),
                    redirect: 'follow',
                })
                    .then((response) => {
                        Mixpanel.track('POST Reply triggered')
                        response.text()
                    })
                    .then((result) => {
                        if (JSON.parse(result).length == 1) {
                            setTotalReplies(1)
                        }
                        setNestedComments(JSON.parse(result))
                        if (replyBoxStateNew) {
                            setReplyBoxStateNew(false)
                        }
                        if (isReplyBoxOpenNew) {
                            setReplyBoxOpenNew(false)
                        }
                    })
                    .catch((error) => {
                        Mixpanel.track('POST Reply failed')
                        console.log('error-reply', error)
                        }
                    )
            })
        })    
    }

    const postToQuestionsDB = (content) => {
        chrome.storage.sync.get(['token'], async (result) => {
            getProfileInfo(result.token).then((info) => {
                const reqBody = {
                    author: info._id,
                    content: content,
                    dateCreated: new Date(),
                    flagged: false,
                    replies: [],
                    reports: [],
                    timestamp: getTimestamp(),
                    title: titleInput,
                    video: linkifyYouTubeURLs(window.location.href),
                    votes: 0,
                    slateLang: codeLanguage,
                }

                fetch(`${host}/questions?token=${result.token}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(reqBody),
                    redirect: 'follow',
                })
                    .then(async (response) => {
                        Mixpanel.track('POST Question triggered')
                        let data = await response.json()
                        if (response.status != 200) {
                            console.log('Error', response.status)
                        } else {
                            let newObj = insertObject(allQuestions, 0, data)
                            setQuestions(null)
                            setQuestions(newObj)
                            askButtonStateFunc(false)
                            Mixpanel.track('POST Question success')
                        }
                    })
                    .catch((err) => {
                        console.log('Error: ' + err)
                        setPostReqError(true)
                        Mixpanel.track('POST Question error')
                    })
            })
        })
    }
    
    const submitValue = () => {
        const newValue = JSON.stringify(textValue)
        
        if (postToReplies) {
            postToRepliesDB(newValue)
        } else {
            postToQuestionsDB(newValue)
        }
    }

    const serialize = (value) => {
        return (
            value
                // Return the string content of each paragraph in the value's children.
                .map((n) => Node.string(n))
                // Join them all with line breaks denoting paragraphs.
                .join('\n')
        )
    }

    const closeBox = () => {
        if (replyBoxStateNew) {
            setReplyBoxStateNew(false)
        }
        if (isReplyBoxOpenNew) {
            setReplyBoxOpenNew(false)
        }
        if (askButtonState) {
            askButtonStateFunc(false)
        }
    }

    return (
        <div>
            {increaseSize ? (
                <CustomDiv>
                    <TextEditor
                        value={textValue}
                        setValue={setTextValue}
                        setCodeLanguage={setCodeLanguage}
                    />
                    <ButtonDiv>
                        <SubmitButton onClick={submitValue}>Submit</SubmitButton>
                        <CancelButton onClick={closeBox}>Cancel</CancelButton>
                    </ButtonDiv>
                </CustomDiv>
            ) : (
                <SmallDiv>
                    <TextEditor
                        value={textValue}
                        setValue={setTextValue}
                        setCodeLanguage={setCodeLanguage}
                    />
                    <ButtonDiv>
                        <SubmitButton onClick={submitValue}>Submit</SubmitButton>
                        <CancelButton onClick={closeBox}>Cancel</CancelButton>
                    </ButtonDiv>
                </SmallDiv>
            )}
        </div>
    )
}


const initialValue = [
    {
        type: 'paragraph',
        children: [
            {
                text: '',
            },
        ],
    },
]

export default ReplyBox
