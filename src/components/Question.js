import QuestionHeader from './QuestionHeader'
import QuestionTitle from './QuestionTitle'
import { Sidebar } from './Sidebar'
import styled from 'styled-components';
import QuestionContent from './QuestionContent'
import QuestionFooter from './QuestionFooter'
import { useContext } from 'react';
import { QuestionContext } from './QuestionContext'

const QBlock = styled.div`
    display: flex;
    flex-direction:row;
`


function Question() {
    const {question, setQuestion} = useContext(QuestionContext)



    return (
        <div>
                <div className='sidebar'>
                    {/* <Sidebar /> */}
                </div>
                <div className='questionMain'>
                    <QuestionHeader
                        userName={question.userName}
                        timeStamp={question.timeStamp}
                        dateUploaded={question.dateUploaded}
                        userImageUrl={question.userImageUrl} />
                    <QuestionTitle questionTitle={question.title} />
                    <QuestionContent
                        question={question.description}
                    />
                    <QuestionFooter totalReplies={question.totalReplies} />
                </div>
        </div>
    )
}

export default Question
