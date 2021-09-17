import {useState} from 'react'
import styled from 'styled-components'


const MegaphoneButton = styled.div`
    color: #2196F3;
    margin-bottom: auto;
    display: flex;
    align-items: center;
    font-size: 13px;
    cursor: pointer;
`

export const InviteComments = () => {

    const [comment, setComment] = useState(0)

    const inviteLibrary = [
        'Hey 1  ',
        'Hey 2 ',
        'Nigga 3',
        'Checheck it out 4'
    ]
    
    
    const postInComments = (invite) => {
        document.getElementById("simplebox-placeholder").click();
        const textInput = document.getElementById('contenteditable-root')
        textInput.innerText = invite
        textInput.focus()
    }
    
    const handleInviteComments = () => {
        if(window.localStorage.getItem('libraryIndex')){ 
            setComment(window.localStorage.getItem('libraryIndex'))
        } 

        if(comment<inviteLibrary.length-1){
            postInComments(inviteLibrary[comment])
            setComment(comment+1)
            window.localStorage.setItem('libraryIndex', {comment})
        }else{
            postInComments(inviteLibrary[comment])
            setComment(0)
            window.localStorage.setItem('libraryIndex', {comment})
        }
    }

    return (
        <div>
            <MegaphoneButton onClick={() => handleInviteComments()}>
                {/* <CampaignIcon style={{ fill:'#C4C4C4'}} fontSize='large'/> */}
                Invite Comments
            </MegaphoneButton>
        </div>
    )
}
