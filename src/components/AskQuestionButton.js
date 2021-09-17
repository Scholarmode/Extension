import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';
import BugReportIcon from '@material-ui/icons/BugReport';
import { InviteComments } from './InviteComments';

const AskButton = styled.button`
    border-radius: 4px;
    background-color: #065fd4;
    padding: 10px;
    border: 1px solid black;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size:16px;
    color: white;
    font-weight: 600;
    cursor:pointer;
`;

const BugReportButton = styled.div`
    color: #2196F3;
    margin-bottom: auto;
    display: flex;
    align-items: center;
    font-size: 13px;
    cursor: pointer;
`

const CustomDiv = styled.div`
    font-size: 15px;
    display: flex;
    justify-content: space-between;
`;

const ButtonsDiv = styled.div`
    display: flex;
    flex-direction: column;
`;

// function openInNewTab(url) {
//     window.open(url, '_blank').focus();
//    }

const openBugReportURL = () => {
    window.location.href = 'https://www.scholarmode.com/#bug-report'
}



function AskQuestionButton({ askButtonOpen, setAskButtonOpen }) {

    const setAskButtonState = () => {
        setAskButtonOpen(!askButtonOpen)
    }

    return (
        <CustomDiv >
            <AskButton onClick={setAskButtonState}>
                <AddIcon fontSize='large' />
                Ask a question
            </AskButton>
            <ButtonsDiv>
                <BugReportButton onClick={openBugReportURL}>
                    <BugReportIcon style={{ fill:'#C4C4C4'}} fontSize='large'/>
                    Report a bug
                </BugReportButton>
                {/* <InviteComments /> */}
            </ButtonsDiv>
        </CustomDiv>
    )
}

export default AskQuestionButton
