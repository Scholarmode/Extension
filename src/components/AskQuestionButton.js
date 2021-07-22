import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';

const AskButton = styled.button`
    border-radius: 15px;
    background-color: #ECECEC;
    color: #909090;
    width: 200px;
    height: 30px;
    border: 1px solid gray;
    margin-bottom: 10px;
`;
const CustomP = styled.p`
    font-size: 10px;
`;

const CustomDiv = styled.div`
    align-items: center;
    justify-content: center;
    font-size: 15px;
`;

function AskQuestionButton({ askButtonOpen, setAskButtonOpen }) {

    const setAskButtonState = () => {
        setAskButtonOpen(!askButtonOpen)
    }

    return (
        <CustomDiv >
            <AskButton onClick={setAskButtonState}>
                <AddIcon />
                Ask a question
            </AskButton>
        </CustomDiv>
    )
}

export default AskQuestionButton
