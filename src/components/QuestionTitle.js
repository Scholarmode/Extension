import styled from 'styled-components'

const QuestionTitleText = styled.div`
    font-size: 22px;
    font-weight: bold;
`;

const CustomDiv = styled.div`
    display: flex;
    flex-direction: row;
    background: #ECECEC;
    width: 100%;
    padding: 10px; 
`;

function QuestionTitle({ questionTitle }) {
    return (
        <CustomDiv>
            <QuestionTitleText>{questionTitle}</QuestionTitleText>
        </CustomDiv>
    )
}

export default QuestionTitle
