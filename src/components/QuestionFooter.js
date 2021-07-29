import styled from 'styled-components';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SmsIcon from '@material-ui/icons/Sms';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useState } from 'react';
import Replies from './Replies.js'
import ReplyBox from './ReplyBox.js';
import React from "react";
import ReplyBoxHeader from "./ReplyBoxHeader.js"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import FlagIcon from '@material-ui/icons/Flag';
import '../styles/reply-footer.css'
import { useErrorBoundary } from "use-error-boundary";

import PostRequestError from './PostRequestError.js'

const CustomDiv = styled.div`
    display: flex;
    flex-direction: row;
    background: #ECECEC;
    flex:1;
    padding: 10px; 
    align-items: center;
`;

const ReportDiv = styled.div`
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
`;

const RepliesTextLink = styled.div`
    font-size : 16px;
    color: #2196F3;
    cursor: pointer;

    ::selection {
    color: none;
    background: none;
   }
/* For Mozilla Firefox */
   ::-moz-selection {
    color: none;
    background: none;
   }
`;

const ArrowDown = styled(ArrowDropDownIcon)`
   color: #2196F3;
   cursor: pointer;

   ::selection {
    color: none;
    background: none;
   }
/* For Mozilla Firefox */
   ::-moz-selection {
    color: none;
    background: none;
   }
`;

const ReplyIcon = styled(SmsIcon)`
   color: #C4C4C4;
   margin-left: 15px;
   align-items: center;
   cursor: pointer;
`;

const ZeroReplyIcon = styled(SmsIcon)`
   color: #C4C4C4;
   margin-left: 0px;
   align-items: center;
   cursor: pointer;
`;

const ArrowUp = styled(ArrowDropDownIcon)`
   color: #2196F3;
   cursor: pointer;
   transform: rotate(180deg);

   ::selection {
    color: none;
    background: none;
   }
/* For Mozilla Firefox */
   ::-moz-selection {
    color: none;
    background: none;
   }
`

const ReplyClickText = styled.p`
   color: #626262;
   font-size : 16px;
   margin-left: 2px;
   cursor: pointer;
   text-align: center;

`;

const OptionsMenu = styled(MoreHorizIcon)`
    color: #909090;
    margin-left: 15px;
    cursor: pointer;
`;

function QuestionFooter({ totalReplies, questions }) {

    const [isReplyOpen, setReplyOpen] = useState(false);

    const [isReplyBoxOpen, setReplyBoxOpen] = useState(false);

    const onClickReply = () => {
        setReplyOpen(!isReplyOpen)
    }

    const onReplyBoxClick = () => {
        setReplyBoxOpen(!isReplyBoxOpen)
    }

    const [replyBoxState, setReplyBoxState] = useState(false)

    // State for UserName
    const [replyUserName, setReplyUserName] = useState("")

    // State for handling error
    const [postError, setPostError] = useState(false)

    const { ErrorBoundary, didCatch, error } = useErrorBoundary();

    return (
        <div>
            <CustomDiv>
                {
                    totalReplies > 0 &&
                    <>
                        {isReplyOpen ? <ArrowUp fontSize="large" onClick={onClickReply} /> : <ArrowDown fontSize="large" onClick={onClickReply} />}
                        <RepliesTextLink onClick={onClickReply}>
                            {
                                isReplyOpen ? <> Hide {totalReplies} Replies </> : <> View {totalReplies} Replies </>
                            }
                        </RepliesTextLink>
                    </>
                }

                {
                    totalReplies <= 0 ? <ZeroReplyIcon fontSize="large" onClick={onReplyBoxClick} /> : <ReplyIcon fontSize="large" onClick={onReplyBoxClick} />
                }
                <ReplyClickText onClick={onReplyBoxClick} >Reply</ReplyClickText>
                <Popup trigger={<OptionsMenu fontSize="large" />} position="top center" className="my-popup">
                    <ReportDiv>
                        <FlagIcon />
                        <p>Report</p>
                    </ReportDiv>
                </Popup>
            </CustomDiv>
            {postError && <PostRequestError />}
            {isReplyBoxOpen &&
                <>
                    {didCatch ? < PostRequestError /> :
                        <ErrorBoundary>
                            <ReplyBox allQuestions={questions} setPostReqError={setPostError} isReplyBoxOpenNew={isReplyBoxOpen} setReplyBoxOpenNew={setReplyBoxOpen} setReplyBoxStateNew={setReplyBoxState} replyBoxStateNew={setReplyBoxState} />
                        </ErrorBoundary>
                    }
                </>
            }
            {replyBoxState &&
                <>
                    <ReplyBoxHeader userName={replyUserName} />
                    <ReplyBox setPostReqError={setPostError} setReplyBoxStateNew={setReplyBoxState} replyBoxStateNew={setReplyBoxState} />
                </>
            }
            {isReplyOpen &&
                <Replies
                    replyBoxState={replyBoxState}
                    setReplyBoxState={setReplyBoxState}
                    replyUserName={replyUserName}
                    setReplyUserName={setReplyUserName}
                />

            }
        </div>
    )
}

export default QuestionFooter
