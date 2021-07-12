import styled from 'styled-components';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SmsIcon from '@material-ui/icons/Sms';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useState } from 'react';
import Replies from './Replies.js'

const CustomDiv = styled.div`
    display: flex;
    flex-direction: row;
    background: #ECECEC;
    width: 100%;
    padding: 10px; 
    align-items: center;
`;

const RepliesTextLink = styled.div`
    font-size : 16px;
    color: #2196F3;
    cursor: pointer;
`;

const ArrowDown = styled(ArrowDropDownIcon)`
   color: #2196F3;
   cursor: pointer;
`;

const ReplyIcon = styled(SmsIcon)`
   color: #C4C4C4;
   margin-left: 15px;
   align-items: center;
   cursor: pointer;
`;

const ReplyClickText = styled.p`
   color: #626262;
   font-size : 16px;
   margin-left: 2px;
   cursor: pointer;

`;

const OptionsMenu = styled(MoreHorizIcon)`
    color: #909090;
    margin-left: 15px;
    cursor: pointer;
`;

function QuestionFooter({ totalReplies }) {

    const [isReplyOpen, setReplyOpen] = useState(false);

    const onClickReply = () => {
        setReplyOpen(!isReplyOpen)
    }

    return (
        <div>
            <CustomDiv>
                {
                    totalReplies > 0 &&
                    <>
                        <ArrowDown fontSize="large" onClick={onClickReply} />
                        <RepliesTextLink onClick={onClickReply}>View {totalReplies} Replies</RepliesTextLink>
                    </>
                }

                <ReplyIcon fontSize="large" />
                <ReplyClickText>Reply</ReplyClickText>
                <OptionsMenu fontSize="large" />
            </CustomDiv>
            {isReplyOpen && <Replies />}
        </div>
    )
}

export default QuestionFooter
