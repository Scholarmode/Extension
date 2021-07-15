import styled from 'styled-components'
import React from "react";

const QuestionTitleText = styled.div`
    font-size: 18px;
    width: 100%;
    font-weight: bold;
`;

const CustomDiv = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
    background: #ECECEC;
    padding: 0px 10px; 
`;

function QuestionTitle({ questionTitle }) {
    return (
        <CustomDiv>
            <QuestionTitleText>{questionTitle}</QuestionTitleText>
        </CustomDiv>
    )
}

export default QuestionTitle
