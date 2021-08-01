/* global chrome */
import ArrowDown from '@material-ui/icons/ArrowDropDown';
import ArrowUp from '@material-ui/icons/ArrowDropUp';
import { useEffect, useState } from 'react';
import styled from 'styled-components';


const SidebarBackground = styled.div`
    background: #DADADA;
    display: flex;
    flex-direction: column;
    flex:1;
    align-items: center;
    font-size: 14px;
    max-width: 30px;
`;


export const Sidebar = ({ question }) => {

    // const {question} =  useContext(QuestionContext)

    const [totalVotes, setTotalVotes] = useState(question.votes);
    const [clickable, setClickable] = useState(true);
    const [downClickable, setDownClickable] = useState(true);
    let raw = "";

    let requestOptions = {
        method: 'PUT',
        body: raw,
        redirect: 'follow'
    };

    useEffect(() => {
        upvotedOrNot()
        downvotedOrNot()
    }, [])

    const updateVotes = () => {
        if (clickable) {
            if (downClickable) {
                setClickable(false)
                setTotalVotes((v) => v + 1)
                upvotePutRequest()
            }
            else {
                setDownClickable(true)
                setClickable(false)
                setTotalVotes((v) => v + 2)
                upvotePutRequest()
            }
        }
        else {
            removeVotes()
            setTotalVotes((v) => v - 1)
        }
    }

    const removeVotes = () => {
        chrome.storage.sync.get(['token'], async (result) => {
            await getProfileInfo(result.token).then(async (info) => {
                await fetch(`http://localhost:8080/replies/${question._id}/${info._id}/unvote/`, requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        setClickable(true)
                        setDownClickable(true)
                    })
                    .catch(error => console.log('error', error));
            })
        })
    }

    const updateDownVotes = () => {
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
            }
        }
        else {
            removeVotes()
            setTotalVotes((v) => v + 1)
        }
    }

    const getProfileInfo = (token) => {
        const url = `http://localhost:8080/auth/chrome?access_token=${token}`;
        return fetch(url).then((response) => response.json());
    };

    const upvotePutRequest = () => {
        chrome.storage.sync.get(['token'], async (result) => {
            getProfileInfo(result.token).then((info) => {
                fetch(`http://localhost:8080/questions/${question._id}/${info._id}/upvote/`, requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
            })
        })
    }

    const downvotePutRequest = () => {
        chrome.storage.sync.get(['token'], async (result) => {
            getProfileInfo(result.token).then((info) => {
                fetch(`http://localhost:8080/questions/${question._id}/${info._id}/downvote/`, requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
            })
        })
    }

    const upvotedOrNot = () => {
        // This function is responsible for checking if the user has already upvoted the reply or not, 
        // If , yes then it would be rendered accordingly
        console.log("Upvotes: " + question.upvoters)
        chrome.storage.sync.get(['token'], async (result) => {
            getProfileInfo(result.token).then((info) => {
                question.upvoters.map((id) => {
                    if (id == info._id) {
                        setClickable(false)
                    }
                })
            })
        })
    }

    const downvotedOrNot = () => {
        console.log("Upvotes: " + question.downvoters)
        chrome.storage.sync.get(['token'], async (result) => {
            getProfileInfo(result.token).then((info) => {
                question.downvoters.map((id) => {
                    if (id == info._id) {
                        setDownClickable(false)
                    }
                })
            })
        })
    }

    return (
        <SidebarBackground>
            {
                clickable ?
                    <ArrowUp style={{ marginBottom: -10, width: 50, height: 50, color: '#909090', cursor: 'pointer' }} onClick={updateVotes} />
                    :
                    <ArrowUp style={{ marginBottom: -10, width: 50, height: 50, color: '#3aa1f2', cursor: 'pointer' }} onClick={updateVotes} />
            }
            {totalVotes}
            {
                downClickable ?
                    <ArrowDown style={{ marginTop: -10, width: 50, height: 50, color: '#909090', cursor: 'pointer' }} onClick={updateDownVotes} />
                    :
                    <ArrowDown style={{ marginTop: -10, width: 50, height: 50, color: 'red', cursor: 'pointer' }} onClick={updateDownVotes} />
            }
        </SidebarBackground>
    )
}
