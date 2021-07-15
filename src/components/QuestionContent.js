
import styled from 'styled-components'
import React from "react";
import ReplyContent from './ReplyContent';

const CustomDiv = styled.div`
	display: flex;
	flex-direction: row;
	background: #ececec;
	flex: 1;
	padding-top: 10px;
	padding-left: 10px;
	padding-right: 10px;
	padding-bottom: 0;
`;

const QuestionContentText = styled.div`
	font-size: 14px;
`;

function QuestionContent({ question }) {
    console.log(question)
    let newQuestion = question.replaceAll('\\', ' ')
    console.log("New Question: " + newQuestion)
    return (
        <CustomDiv>
            <ReplyContent reply={newQuestion} />
            {/* <p>{question}</p> */}
        </CustomDiv>
    )
}

export default QuestionContent;
