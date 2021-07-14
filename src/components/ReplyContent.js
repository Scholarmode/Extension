import styled from 'styled-components'
import React from "react";

const CustomDiv = styled.div`
    display: flex;
    flex-direction: row;
    background: #ECECEC;
    width: auto;
    padding-left: 15px;
`;

const QuestionContentText = styled.div`
     font-size: 16px;
`;

// const ReplyThread = styled.div`
//    border-left: 2px solid red;
//    display: block;
//    height: 100%;
//    width: 50%;
//    margin-left: 23px;
// `;

function ReplyContent({ reply }) {
    return (
        <div>
            <CustomDiv>
                <QuestionContentText>{reply}</QuestionContentText>
            </CustomDiv>
        </div>
    )
}

export default ReplyContent
