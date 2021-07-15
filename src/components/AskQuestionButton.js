import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';

const AskButton = styled.button`
    border-radius: 10px;
    background-color: #ECECEC;
    color: #909090;
    width: 80px;
    height: 40px;

`;

function AskQuestionButton() {
    return (
        <div>
            <AskButton>
                <AddIcon />
                Submit
            </AskButton>
        </div>
    )
}

export default AskQuestionButton
