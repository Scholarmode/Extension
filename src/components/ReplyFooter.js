import styled from 'styled-components';
import { useState } from 'react'
import { ReactComponent as UpArrow } from '../assets/questionCardVoteArrow.svg'

const CustomDiv = styled.div`
    display: flex;
    flex-direction: row;
    background: #ECECEC;
    width: 100%;
    padding: 10px; 
    padding-bottom: 0px;
    align-items: center;
`;


function ReplyFooter({ votes }) {

    const [totalVotes, setTotalVotes] = useState(votes);

    return (
        <CustomDiv>
            {/* <Arrow onClick={setTotalVotes((prevVotes) => prevVotes + 1)} /> */}
            {/* Total votes for this reply */}
            <UpArrow fontSize="large" />
            <p>{totalVotes}</p>
            {/* <DownArrow>
                <ForwardIcon />
            </DownArrow> */}
        </CustomDiv>
    )
}

export default ReplyFooter
