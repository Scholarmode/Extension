import styled from 'styled-components'
import QuestionHeader from './QuestionHeader'


const Blob = styled.div`
    background: #ECECEC;
    height: 400px;
    width: 100%;
    border-radius: 40px;
    border-width: thin;
`


function Question() {
    return (
        <div>
            <QuestionHeader userName="Ansh" timeStamp="15:21" dateUploaded="3 months ago" />
        </div>
    )
}

export default Question
