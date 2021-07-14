import styled from 'styled-components'
import React from "react";

const CustomDiv = styled.div`
    display: flex;
    flex-direction: row;
    background: #ECECEC;
    width: 100%;
    padding: 10px; 
`;

const QuestionContentText = styled.div`
     font-size: 16px;
`;

function QuestionContent({ question }) {
    return (
        <CustomDiv>
            <QuestionContentText>{question}</QuestionContentText>
        </CustomDiv>
    )
}

export default QuestionContent
