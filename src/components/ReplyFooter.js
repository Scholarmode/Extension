/* global chrome */
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import ForwardIcon from '@material-ui/icons/Forward'
import SmsIcon from '@material-ui/icons/Sms'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import React from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import FlagIcon from '@material-ui/icons/Flag'
import '../styles/reply-footer.css'
import { Mixpanel } from "./Mixpanel";

// const host = 'http://localhost:8080'
const host = 'https://scholarmode.herokuapp.com'

const CustomDiv = styled.div`
    display: flex;
    flex-direction: row;
    background: #ececec;
    flex: 1;
    padding: 10px;
    align-items: center;
`

const CustomVotesText = styled.p`
    font-size: 16px;
    padding-left: 5px;
    padding-right: 5px;
`

const ReplyIcon = styled(SmsIcon)`
    color: #c4c4c4;
    margin-left: 15px;
    align-items: center;
    cursor: pointer;
`

const ReplyClickText = styled.p`
    color: #626262;
    font-size: 16px;
    margin-left: 2px;
    cursor: pointer;
    text-align: center;
`

const OptionsMenu = styled(MoreHorizIcon)`
    color: #909090;
    margin-left: 15px;
    cursor: pointer;
`

const UpArrowNew = styled.div`
    transform: rotate(-90deg);
    cursor: pointer;
`
const DownArrow = styled.div`
    transform: rotate(90deg);
    cursor: pointer;
`

const CustomPopup = styled(Popup)`
    width: 50px !important;
    background-color: red !important;
`

const ReportDiv = styled.div`
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    cursor: pointer;
`

/*
    Breakdown of upvote and downvote logic
    Votes can go into negative values
    if already upvoted reply is clicked again, it should be downvoted by 1
    if already downvoted reply is clicked again, it should be upvoted by 1

*/

function ReplyFooter({
    reply,
    setReplyId,
    votes,
    replyBoxOpen,
    setReplyBoxOpen,
    setReplyUserName,
    userName,
    replyId,
    hideReplyIcon,
}) {
    let raw = ''
    let replyObject
    let downStatus = false
    let upStatus = false

    let requestOptions = {
        method: 'PUT',
        body: raw,
        redirect: 'follow',
    }

    let NewRequestOptions = {
        method: 'PUT',
        redirect: 'follow',
    }

    const [totalVotes, setTotalVotes] = useState(votes)
    const [upvoted, setUpvoted] = useState(true)
    const [downvoted, setDownvoted] = useState(true)

    const getProfileInfo = (token) => {
        const url = `${host}/auth/chrome?access_token=${token}`
        return fetch(url).then((response) => response.json())
    }

    const reportReplies = () => {
        //  /questions/:id/:accountId/report
        chrome.storage.sync.get(['token'], async (result) => {
            getProfileInfo(result.token).then((info) => {
                fetch(
                    `${host}/replies/${replyId}/${info._id}/report?token=${result.token}`,
                    NewRequestOptions
                )
                    .then((response) => response.text())
                    .then((result) => console.log(result))
                    .catch((error) => console.log('error', error))
            })
        })
    }

    useEffect(() => {
        upvotedOrNot()
        downvotedOrNot()
        loadReplyVotes()
    }, [])

    const loadReplyVotes = () => {
        chrome.storage.sync.get(['token'], (result) => {
            fetch(
                `${host}/replies/${replyId}?token=${result.token}`,
                requestOptions
            )
                .then((response) => response.text())
                .then((result) => {
                    setTotalVotes(JSON.parse(result).votes)
                })
                .catch((error) => console.log('error', error))
        })
    }

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
                    `${host}/replies/${replyId}/${info._id}/unvote?token=${result.token}`,
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

    const upvotedOrNot = () => {
        chrome.storage.sync.get(['token'], (result) => {
            fetch(
                `${host}/replies/${replyId}?token=${result.token}`,
                requestOptions
            )
                .then((response) => response.text())
                .then((resultReply) => {
                    console.log('Upvotes: ' + JSON.parse(resultReply).upvoters)
                    getProfileInfo(result.token).then((info) => {
                        JSON.parse(resultReply).upvoters.map((id) => {
                            if (id == info._id) {
                                setUpvoted(false) // Upvote - Blue
                            }
                        })
                    })
                })
                .catch((error) => console.log('error', error))
        })
    }

    const downvotedOrNot = () => {
        chrome.storage.sync.get(['token'], (result) => {
            fetch(
                `${host}/replies/${replyId}?token=${result.token}`,
                requestOptions
            )
                .then((response) => response.text())
                .then((resultReply) => {
                    console.log(
                        'Downvotes: ' + JSON.parse(resultReply).downvoters
                    )
                    chrome.storage.sync.get(['token'], async (result) => {
                        getProfileInfo(result.token).then((info) => {
                            JSON.parse(resultReply).downvoters.map((id) => {
                                if (id == info._id) {
                                    if (downStatus == true) {
                                        setDownvoted(true)
                                    } else {
                                        setDownvoted(false)
                                    } // This means vote icon has been clicked by the user
                                }
                            })
                        })
                    })
                })
                .catch((error) => console.log('error', error))
        })
    }


    const upvotePutRequest = () => {
        chrome.storage.sync.get(['token'], async (result) => {
            getProfileInfo(result.token).then((info) => {
                fetch(
                    `${host}/replies/${replyId}/${info._id}/upvote?token=${result.token}`,
                    requestOptions
                )
                    .then((response) => response.text())
                    .then((result) => console.log(result))
                    .catch((error) => console.log('error', error))
            })
        })
    }

    const downvotePutRequest = () => {
        chrome.storage.sync.get(['token'], async (result) => {
            getProfileInfo(result.token).then((info) => {
                fetch(
                    `${host}/replies/${replyId}/${info._id}/downvote?token=${result.token}`,
                    requestOptions
                )
                    .then((response) => response.text())
                    .then((result) => console.log(result))
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
    const changeReplyBoxState = () => {
        Mixpanel.track('Reply-to-reply clicked')
        setReplyBoxOpen(!replyBoxOpen)
        setReplyUserName(userName)
        // Set ReplyId here to manage nested replies

        if (replyId != '') {
            setReplyId(replyId)
        }
    }


    return (
        <CustomDiv>
            {upvoted ? (
                <UpArrowNew>
                    <ForwardIcon
                        style={{ width: 25, height: 25, color: '#909090' }}
                        onClick={updateUpvotes}
                    />
                </UpArrowNew>
            ) : (
                <UpArrowNew>
                    <ForwardIcon
                        style={{ width: 25, height: 25, color: '#3aa1f2' }}
                        onClick={updateUpvotes}
                    />
                </UpArrowNew>
            )}
            {/* Total votes for this reply */}
            <CustomVotesText>{totalVotes}</CustomVotesText>

            {downvoted ? (
                <DownArrow>
                    <ForwardIcon
                        style={{ width: 25, height: 25, color: '#909090' }}
                        onClick={updateDownvotes}
                    />
                </DownArrow>
            ) : (
                <DownArrow>
                    <ForwardIcon
                        style={{ width: 25, height: 25, color: 'red' }}
                        onClick={updateDownvotes}
                    />
                </DownArrow>
            )}

            {hideReplyIcon ?
                <>
                </>
                :
                <>
                    <ReplyIcon fontSize="large" onClick={changeReplyBoxState} />
                    <ReplyClickText onClick={changeReplyBoxState}>Reply</ReplyClickText>
                </>
            }
            <CustomPopup
                trigger={<OptionsMenu fontSize="large" />}
                position="top center"
                className="my-popup"
            >
                <ReportDiv onClick={reportReplies}>
                    <FlagIcon />
                    <p>Report</p>
                </ReportDiv>
            </CustomPopup>
        </CustomDiv>
    )
}

export default ReplyFooter
