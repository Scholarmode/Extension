import styled from 'styled-components';
import { useState } from 'react'
import { ReactComponent as UpArrow } from '../assets/questionCardVoteArrow.svg'
import ForwardIcon from '@material-ui/icons/Forward';
import SmsIcon from '@material-ui/icons/Sms';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const CustomDiv = styled.div`
    display: flex;
    flex-direction: row;
    background: #ECECEC;
    width: 100%;
    padding: 10px; 
    align-items: center;
`;

const CustomVotesText = styled.p`
    font-size: 16px;
    padding-left: 5px;
    padding-right: 5px;
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
   text-align: center;

`;

const OptionsMenu = styled(MoreHorizIcon)`
    color: #909090;
    margin-left: 15px;
    cursor: pointer;
`;

const UpArrowNew = styled.div`
    transform: rotate(-90deg);
`
const DownArrow = styled.div`
    transform: rotate(90deg);
`

function ReplyFooter({ votes }) {

    const [totalVotes, setTotalVotes] = useState(votes);
    const [clickable, setClickable] = useState(true);
    const [downClickable, setDownClickable] = useState(true);

    const updateVotes = () => {
        if (clickable) {
            if (downClickable) {
                setClickable(false)
                setTotalVotes((v) => v + 1)
            }
            else {
                setDownClickable(true)
                setClickable(false)
                setTotalVotes((v) => v + 2)
            }
        }
        else {
            setClickable(true)
            setTotalVotes((v) => v - 1)
        }
    }

    const updateDownVotes = () => {
        if (totalVotes > 0 && downClickable) {
            if (clickable) {
                setDownClickable(false)
                setTotalVotes((v) => v - 1)
            }
            else {
                setClickable(true)
                setDownClickable(false)
                setTotalVotes((v) => v - 2)
            }
        }
        else {
            setDownClickable(true)
            setTotalVotes((v) => v + 1)
        }
    }

    return (
        <CustomDiv>
            {/* <Arrow onClick={setTotalVotes((prevVotes) => prevVotes + 1)} /> */}
            {
                clickable ? <UpArrowNew>
                    <ForwardIcon style={{ width: 25, height: 25, color: '#909090' }} onClick={updateVotes} />
                </UpArrowNew> : <UpArrowNew>
                    <ForwardIcon style={{ width: 25, height: 25, color: 'red', }} onClick={updateVotes} />
                </UpArrowNew>
            }
            {/* Total votes for this reply */}
            <CustomVotesText>{totalVotes}</CustomVotesText>

            {
                downClickable ? <DownArrow>
                    <ForwardIcon style={{ width: 25, height: 25, color: '#909090' }} onClick={updateDownVotes} />
                </DownArrow> : <DownArrow>
                    <ForwardIcon style={{ width: 25, height: 25, color: '#3aa1f2' }} onClick={updateDownVotes} />
                </DownArrow>
            }

            {/* TODO - onClick has to implemented */}
            <ReplyIcon fontSize="large" onClick={() => { }} />
            <ReplyClickText onClick={() => { }} >Reply</ReplyClickText>
            <OptionsMenu fontSize="large" />
        </CustomDiv>
    )
}

export default ReplyFooter
