import QuestionHeader from './QuestionHeader'
import QuestionTitle from './QuestionTitle'
import { Sidebar } from './Sidebar'
import styled from 'styled-components';


const QBlock = styled.div`
    display: flex;
    flex-direction:row;
`


function Question() {
    return (
        <QBlock>
            <div className='sidebar'>
                <Sidebar />
            </div>
            <div className='questionMain'>
                <QuestionHeader
                    userName="Ansh"
                    timeStamp="15:21"
                    dateUploaded="3 months ago"
                    userImageUrl="https://material-ui.com/static/images/avatar/2.jpg" />
                <QuestionTitle questionTitle="Some question ?" />
            </div>
        </QBlock>
    )
}

export default Question
