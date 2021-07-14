import styled from 'styled-components'
import React from "react";

const QuestionTitleText = styled.div`
    font-size: 22px;
    width: 100%;
    font-weight: bold;
`;

const CustomDiv = styled.div`
    display: flex;
    flex-direction: row;
    background: #ECECEC;
    width: 100%;
    padding: 10px; 
    padding-bottom: 0px;
`;

function QuestionTitle({ questionTitle }) {
    return (
        <CustomDiv>
            <QuestionTitleText>{questionTitle}</QuestionTitleText>
        </CustomDiv>
    )
}

export default QuestionTitle
