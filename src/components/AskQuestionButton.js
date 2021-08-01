import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';

const AskButton = styled.button`
    border-radius: 18px;
    background-color: #4081EC;
    width: 200px;
    height: 40px;
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
const CustomP = styled.p`
    font-size: 10px;
`;

const CustomDiv = styled.div`
    align-items: center;
    justify-content: center;
    font-size: 15px;
    display: flex;
    
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
