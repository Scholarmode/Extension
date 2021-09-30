import {useState} from 'react'
import styled from 'styled-components'
import { ChevronLeft } from '@material-ui/icons'
import { ChevronRight } from '@material-ui/icons'

const ParentDiv = styled.div`
    color: #2196F3;
    margin-bottom: auto;
    display: flex;
    align-items: center;
    font-size: 13px;
    cursor: pointer;
`
const ArrowDiv = styled.div`

`
const InviteTextDiv = styled.div`
    padding-bottom: 5px;
`


export const InviteComments = () => {

    const [comment, setComment] = useState(0)

    const inviteLibrary = [
        "Has anyone heard of ScholarMode? It's a chrome-extension that makes YouTube more education friendly. I’ve just posted a question and would love some help, so if you get a chance it’s here 😋 https://chrome.google.com/webstore/detail/scholarmode/heonechjlniccepejmajdmaokjocphoe?hl=en",
        "Cool video, but I have a question. YouTube comments aren't the best for explaining myself though, I've asked something on ScholarMode 🧐 (if you're interested it's a chrome-extension found here https://chrome.google.com/webstore/detail/scholarmode/heonechjlniccepejmajdmaokjocphoe?hl=en) would be awesome to get an answer. Thanks again for the video",
        "Hmmm, nice concept. I'd love to ask a few questions right here on YouTube but comments kinda suck tbh. Anyone know about ScholarMode? It's like reddit but on YouTube 👾 https://chrome.google.com/webstore/detail/scholarmode/heonechjlniccepejmajdmaokjocphoe?hl=en",
        "Just found this extension for better discussions on YouTube. Check it out 🎓 https://chrome.google.com/webstore/detail/scholarmode/heonechjlniccepejmajdmaokjocphoe?hl=en",
        "Hey if you wanna ask better questions that people will *actually* see, check out ScholarMode 👩‍🎓 https://chrome.google.com/webstore/detail/scholarmode/heonechjlniccepejmajdmaokjocphoe?hl=en ",
    ]
    
    
    const postInComments = (invite) => {
        document.getElementById("simplebox-placeholder").click();
        const textInput = document.getElementById('contenteditable-root')
        textInput.innerText = invite
        textInput.focus()
    }
    
    const handleInviteComments = () => {
        if(window.localStorage.getItem('inviteLibraryIndex')){ 
            setComment(window.localStorage.getItem('inviteLibraryIndex'))
        } 

        if(comment < inviteLibrary.length-1){
            postInComments(inviteLibrary[comment])
            setComment(comment+1)
            window.localStorage.setItem('inviteLibraryIndex', {comment})
        }else{
            postInComments(inviteLibrary[comment])
            setComment(0)
            window.localStorage.setItem('inviteLibraryIndex', {comment})
        }
    }

    return (        
        <ParentDiv>
            <InviteTextDiv onClick={() => handleInviteComments()}>
                Invite to ScholarMode 🎓
            </InviteTextDiv>
        </ParentDiv>
    )
}
