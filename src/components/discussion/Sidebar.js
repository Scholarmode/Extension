/* global chrome */
import ArrowDown from '@material-ui/icons/ArrowDropDown'
import ArrowUp from '@material-ui/icons/ArrowDropUp'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Mixpanel } from '../Mixpanel'

// const host = 'http://localhost:8080'
const host = 'https://scholarmode.herokuapp.com'

const SidebarBackground = styled.div`
    background: #dadada;
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    font-size: 14px;
    max-width: 30px;
`

export const Sidebar = ({ question }) => {
    // const {question} =  useContext(QuestionContext)

    const [totalVotes, setTotalVotes] = useState(question.votes)
    const [upvoted, setUpvoted] = useState(true)
    const [downvoted, setDownvoted] = useState(true)
    let raw = ''

    let requestOptions = {
        method: 'PUT',
        body: raw,
        redirect: 'follow',
    }

    useEffect(() => {
        upvotedOrNot()
        downvotedOrNot()
    }, [])

    const updateUpvotes = () => {
        Mixpanel.track('Upvote clicked', {
            'unvote': !upvoted,
        })
        
        if (upvoted) {
            if (downvoted) {
                setUpvoted(false)
                setTotalVotes((v) => v + 1)
                upvotePutRequest()
            } else {
                setDownvoted(true)
                setUpvoted(false)
                setTotalVotes((v) => v + 2)
                upvotePutRequest()
            }
        } else {
            removeVotes()
            setTotalVotes((v) => v - 1)
        }
    }

    const removeVotes = () => {
        chrome.storage.sync.get(['token'], async (result) => {
            await getProfileInfo(result.token).then(async (info) => {
                await fetch(
                    `${host}/questions/${question._id}/${info._id}/unvote?token=${result.token}`,
                    requestOptions
                )
                    .then((response) => response.text())
                    .then((result) => {
                        setUpvoted(true)
                        setDownvoted(true)
                    })
                    .catch((error) => console.log('error', error))
            })
        })
    }

    const updateDownvotes = () => {
        Mixpanel.track('Downvote clicked', {
            'unvote': !downvoted,
        })

        if (downvoted) {
            if (upvoted) {
                setDownvoted(false)
                setTotalVotes((v) => v - 1)
                downvotePutRequest()
            } else {
                setUpvoted(true)
                setDownvoted(false)
                setTotalVotes((v) => v - 2)
                downvotePutRequest()
            }
        } else {
            removeVotes()
            setTotalVotes((v) => v + 1)
        }
    }

    const getProfileInfo = (token) => {
        const url = `${host}/auth/chrome?access_token=${token}`
        return fetch(url).then((response) => response.json())
    }

    const upvotePutRequest = () => {
        chrome.storage.sync.get(['token'], async (result) => {
            getProfileInfo(result.token).then((info) => {
                fetch(
                    `${host}/questions/${question._id}/${info._id}/upvote?token=${result.token}`,
                    requestOptions
                )
                    .then((response) => response.text())
                    .catch((error) => console.log('error', error))
            })
        })
    }

    const downvotePutRequest = () => {
        chrome.storage.sync.get(['token'], async (result) => {
            getProfileInfo(result.token).then((info) => {
                fetch(
                    `${host}/questions/${question._id}/${info._id}/downvote?token=${result.token}`,
                    requestOptions
                )
                    .then((response) => response.text())
                    .catch((error) => console.log('error', error))
            })
        })
    }

    const upvotedOrNot = () => {
        // This function is responsible for checking if the user has already upvoted the reply or not,
        // If , yes then it would be rendered accordingly
        chrome.storage.sync.get(['token'], async (result) => {
            getProfileInfo(result.token).then((info) => {
                question.upvoters.map((id) => {
                    if (id == info._id) {
                        setUpvoted(false)
                    }
                })
            })
        })
    }

    const downvotedOrNot = () => {
        chrome.storage.sync.get(['token'], async (result) => {
            getProfileInfo(result.token).then((info) => {
                question.downvoters.map((id) => {
                    if (id == info._id) {
                        setDownvoted(false)
                    }
                })
            })
        })
    }

    return (
        <SidebarBackground>
            {upvoted ? (
                <ArrowUp
                    style={{
                        marginBottom: -10,
                        width: 50,
                        height: 50,
                        color: '#909090',
                        cursor: 'pointer',
                    }}
                    onClick={updateUpvotes}
                />
            ) : (
                <ArrowUp
                    style={{
                        marginBottom: -10,
                        width: 50,
                        height: 50,
                        color: '#3aa1f2',
                        cursor: 'pointer',
                    }}
                    onClick={updateUpvotes}
                />
            )}
            {totalVotes}
            {downvoted ? (
                <ArrowDown
                    style={{
                        marginTop: -10,
                        width: 50,
                        height: 50,
                        color: '#909090',
                        cursor: 'pointer',
                    }}
                    onClick={updateDownvotes}
                />
            ) : (
                <ArrowDown
                    style={{
                        marginTop: -10,
                        width: 50,
                        height: 50,
                        color: 'red',
                        cursor: 'pointer',
                    }}
                    onClick={updateDownvotes}
                />
            )}
        </SidebarBackground>
    )
}
