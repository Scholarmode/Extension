import QuestionHeader from './QuestionHeader'
import QuestionTitle from './QuestionTitle'
import { Sidebar } from './Sidebar'
import styled from 'styled-components';
import QuestionContent from './QuestionContent'
import QuestionFooter from './QuestionFooter'


const QBlock = styled.div`
    display: flex;
    flex-direction:row;
`


function Question() {
    return (
        <div>
            <div className='sidebar'>
                {/* <Sidebar /> */}
            </div>
            <div className='questionMain'>
                <QuestionHeader
                    userName="Ansh"
                    timeStamp="15:21"
                    dateUploaded="3 months ago"
                    userImageUrl="https://material-ui.com/static/images/avatar/2.jpg" />
                <QuestionTitle questionTitle="Avengers or Justice League ?" />
                <QuestionContent
                    question="Proident duis nostrud Lorem incididunt. Reprehenderit et anim sint nostrud exercitation sit. Duis cupidatat laborum non deserunt sit nulla officia. Anim do deserunt nulla esse ex occaecat enim Lorem. Voluptate sunt quis ipsum laborum aliqua excepteur nostrud sit laboris est?"
                />
                <QuestionFooter totalReplies={7} />
            </div>
        </div>
    )
}

export default Question
