import styled from 'styled-components'
import React from "react";

const CustomDiv = styled.div`
    display: flex;
    flex-direction: row;
    background: #ECECEC;
    flex:1;
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 0;
`;

const QuestionContentText = styled.div`
     font-size: 14px;
`;

function QuestionContent({ question }) {
    return (
        <CustomDiv>
            <QuestionContentText>{question}</QuestionContentText>
        </CustomDiv>
    )
}

export default QuestionContent