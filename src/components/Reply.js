
import styled from 'styled-components';
import QuestionHeader from './QuestionHeader';
import ReplyContent from './ReplyContent';
import ReplyHeader from './ReplyHeader';
import ReplyFooter from './ReplyFooter';
import { useState } from "react";

const CustomUnorderedList = styled.ul`
    margin-left: 10px; 
    padding-left: 0;
    list-style-type:none;
`;

const ReplyThread = styled.div`
   border-left: 2px solid #909090;
   display: block;
   height: 100%;
   width: 80%;
   margin-left: 15px;
   /* padding-top: 5px; */
   margin-top: 5px;
   margin-bottom: 5px;
`;

const TestDiv = styled.div`
    background-color: red;
    width: 100%;
    height: 50px;
`


const Reply = (props) => {
    const comment = { ...props.comment }
    console.log(comment)

    return (
        <>
            <div>
                <li>
                    <ReplyHeader userName={comment.userName} timeStamp={comment.timeStamp} dateUploaded={comment.dateUploaded} userImageUrl={comment.userImageUrl} />
                    <ReplyThread >
                        <ReplyContent reply={comment.reply} />
                        <ReplyFooter votes={2}
                            replyBoxOpen={props.replyBoxOpen}
                            setReplyBoxOpen={props.setReplyBoxOpen}
                            setReplyUserName={props.setReplyUserName}
                            userName={comment.userName}
                        />
                        <CustomUnorderedList>
                            {comment.children.map(child => <Reply comment={child} replyBoxOpen={props.replyBoxOpen} setReplyBoxOpen={props.setReplyBoxOpen} setReplyUserName={props.setReplyUserName} />)}
                        </CustomUnorderedList>
                    </ReplyThread>
                </li>
            </div>
        </>
    )
}

export default Reply
