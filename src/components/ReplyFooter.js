/* global chrome */
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import ForwardIcon from '@material-ui/icons/Forward';
import SmsIcon from '@material-ui/icons/Sms';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import FlagIcon from '@material-ui/icons/Flag';
import '../styles/reply-footer.css'

const CustomDiv = styled.div`
	display: flex;
	flex-direction: row;
	background: #ececec;
	flex: 1;
	padding: 10px;
	align-items: center;
`;

const CustomVotesText = styled.p`
	font-size: 16px;
	padding-left: 5px;
	padding-right: 5px;
`;

const ReplyIcon = styled(SmsIcon)`
	color: #c4c4c4;
	margin-left: 15px;
	align-items: center;
	cursor: pointer;
`;

const ReplyClickText = styled.p`
	color: #626262;
	font-size: 16px;
	margin-left: 2px;
	cursor: pointer;
	text-align: center;
`;

const OptionsMenu = styled(MoreHorizIcon)`
	color: #909090;
	margin-left: 15px;
	cursor: pointer;
`;

const UpArrowNew = styled.div`
	transform: rotate(-90deg);
`;
const DownArrow = styled.div`
    transform: rotate(90deg);
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
`;

/*
    Breakdown of upvote and downvote logic
    Votes can go into negative values
    if already upvoted reply is clicked again, it should be downvoted by 1
    if already downvoted reply is clicked again, it should be upvoted by 1

*/

function ReplyFooter({ reply, setReplyId, votes, replyBoxOpen, setReplyBoxOpen, setReplyUserName, userName, replyId }) {

    const baseUrl = "localhost:8080/"
    let raw = "";
    let replyObject;
    let downStatus = false;
    let upStatus = false;

    let requestOptions = {
        method: 'PUT',
        body: raw,
        redirect: 'follow'
    };

    let NewRequestOptions = {
        method: 'PUT',
        redirect: 'follow'
    };


    const [totalVotes, setTotalVotes] = useState(votes);
    const [clickable, setClickable] = useState(true);
    const [downClickable, setDownClickable] = useState(true);

    const getProfileInfo = (token) => {
        const url = `http://localhost:8080/auth/chrome?access_token=${token}`;
        return fetch(url).then((response) => response.json());
    };

    const reportReplies = () => {
        //  /questions/:id/:accountId/report
        chrome.storage.sync.get(['token'], async (result) => {
            getProfileInfo(result.token).then((info) => {
                fetch(`http://localhost:8080/replies/${replyId}/${info._id}/report/`, NewRequestOptions)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
            })
        })
    }

    useEffect(() => {
        upvotedOrNot()
        downvotedOrNot()
    }, [])
    // const authorId = () => {
    //     chrome.storage.sync.get(['token'], async (result) => {
    //         getProfileInfo(result.token).then((info) => {
    //             console.log("Token: " + result.token)
    //             console.log("Info: " + info);
    //             return info._id;
    //         })
    //     })
    // }


    const updateVotes = () => {
        if (clickable) {
            if (downClickable) {
                console.log("downClickable: " + downClickable)
                setClickable(false)
                setTotalVotes((v) => v + 1)
                upvotePutRequest()
            }
            else {
                console.log("downClickable: " + downClickable)
                setDownClickable(true)
                setClickable(false)
                setTotalVotes((v) => v + 2)
                upvotePutRequest()
                upvotePutRequest()
            }
        }
        else { // Upvoted -> Unvote
            removeVotes()
            upStatus = true
            setTotalVotes((v) => v - 1)
        }
    }

    const removeVotes = () => {
        chrome.storage.sync.get(['token'], async (result) => {
            await getProfileInfo(result.token).then(async (info) => {
                await fetch(`http://localhost:8080/replies/${replyId}/${info._id}/unvote/`, requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        setClickable(true)
                        setDownClickable(true)
                    })
                    .catch(error => console.log('error', error));
            })
        })
    }

    const upvotedOrNot = () => {
        fetch(`http://localhost:8080/replies/${replyId}/`, requestOptions)
            .then(response => response.text())
            .then(resultReply => {
                console.log("Upvotes: " + JSON.parse(resultReply).upvoters)
                chrome.storage.sync.get(['token'], async (result) => {
                    getProfileInfo(result.token).then((info) => {
                        JSON.parse(resultReply).upvoters.map((id) => {
                            if (id == info._id) {
                                setClickable(false) // Upvote - Blue
                            }
                        })
                    })
                })
            })
            .catch(error => console.log('error', error));
    }

    // const upvotedOrNot = () => {
    //     // This function is responsible for checking if the user has already upvoted the reply or not, 
    //     // If , yes then it would be rendered accordingly
    //     console.log("Upvotes: " + reply.upvoters)
    //     chrome.storage.sync.get(['token'], async (result) => {
    //         getProfileInfo(result.token).then((info) => {
    //             if (upStatus) {
    //                 let index = reply.upvoters.indexOf(info._id)
    //                 if (index > -1) {
    //                     reply.upvoters.splice(info._id, 1)
    //                 }
    //             }
    //             console.log("Upvotes New: " + reply.upvoters)
    //             reply.upvoters.map((id) => {
    //                 if (id == info._id) {
    //                     setClickable(false)
    //                 }
    //             })
    //         })
    //     })
    // }

    const downvotedOrNot = () => {
        fetch(`http://localhost:8080/replies/${replyId}/`, requestOptions)
            .then(response => response.text())
            .then(resultReply => {
                console.log("Downvotes: " + JSON.parse(resultReply).downvoters)
                chrome.storage.sync.get(['token'], async (result) => {
                    getProfileInfo(result.token).then((info) => {
                        JSON.parse(resultReply).downvoters.map((id) => {
                            if (id == info._id) {
                                if (downStatus == true) {
                                    setDownClickable(true)
                                }
                                else {
                                    setDownClickable(false)
                                } // This means vote icon has been clicked by the user
                            }
                        })
                    })
                })
            })
            .catch(error => console.log('error', error));

        // console.log("Upvotes: " + reply.downvoters)
        // chrome.storage.sync.get(['token'], async (result) => {
        //     getProfileInfo(result.token).then((info) => {
        //         reply.downvoters.map((id) => {
        //             if (id == info._id) {
        //                 setDownClickable(false)
        //             }
        //         })
        //     })
        // })
    }

    // const authorId = () => {
    //     chrome.storage.sync.get(['token'], async (result) => {
    //         getProfileInfo(result.token).then((info) => info.text()).then((result) => {
    //             realUserId = result
    //         })
    //     })
    // }

    const upvotePutRequest = () => {
        chrome.storage.sync.get(['token'], async (result) => {
            getProfileInfo(result.token).then((info) => {
                console.log(`http://localhost:8080/replies/${replyId}/${info._id}/upvote/`)
                fetch(`http://localhost:8080/replies/${replyId}/${info._id}/upvote/`, requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
            })
        })
    }

    const downvotePutRequest = () => {
        chrome.storage.sync.get(['token'], async (result) => {
            getProfileInfo(result.token).then((info) => {
                fetch(`http://localhost:8080/replies/${replyId}/${info._id}/downvote/`, requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
            })
        })
    }

    const updateDownVotes = () => {   // 1 -> 2
        console.log("Down: " + downClickable)
        if (downClickable) {
            if (clickable) {
                setDownClickable(false)
                setTotalVotes((v) => v - 1)
                downvotePutRequest()
            }
            else {
                setClickable(true)
                setDownClickable(false)
                setTotalVotes((v) => v - 2)
                downvotePutRequest()
                downvotePutRequest()
            }
        }
        else {
            removeVotes()
            downStatus = true
            setTotalVotes((v) => v + 1)
        }
    }

    const changeReplyBoxState = () => {
        setReplyBoxOpen(!replyBoxOpen)
        setReplyUserName(userName)
        // Set ReplyId here too manage nested replies

        if (replyId != "") {
            console.log("ReplyId: " + replyId)
            setReplyId(replyId)
        }

    }



    // nothing is votes
    // downvote,- color , clickable
    // clickable - false, color

    // upvotedOrNot()
    // authorId()
    // console.log("AuthorId: " + realUserId)
    return (
        <CustomDiv>
            {/* <Arrow onClick={setTotalVotes((prevVotes) => prevVotes + 1)} /> */}
            {
                clickable ? <UpArrowNew>
                    <ForwardIcon style={{ width: 25, height: 25, color: '#909090' }} onClick={updateVotes} />
                </UpArrowNew> : <UpArrowNew>
                    <ForwardIcon style={{ width: 25, height: 25, color: '#3aa1f2', }} onClick={updateVotes} />
                </UpArrowNew>
            }
            {/* Total votes for this reply */}
            <CustomVotesText>{totalVotes}</CustomVotesText>

            {
                downClickable ? <DownArrow>
                    <ForwardIcon style={{ width: 25, height: 25, color: '#909090' }} onClick={updateDownVotes} />
                </DownArrow> : <DownArrow>
                    <ForwardIcon style={{ width: 25, height: 25, color: 'red' }} onClick={updateDownVotes} />
                </DownArrow>
            }

            {/* TODO - onClick has to implemented */}
            <ReplyIcon fontSize="large" onClick={changeReplyBoxState} />
            <ReplyClickText onClick={changeReplyBoxState} >Reply</ReplyClickText>
            <CustomPopup trigger={<OptionsMenu fontSize="large" />} position="top center" className="my-popup">
                <ReportDiv onClick={reportReplies}>
                    <FlagIcon />
                    <p>Report</p>
                </ReportDiv>
            </CustomPopup>
        </CustomDiv>
    )
}

export default ReplyFooter;
