import styled from 'styled-components';
import ForwardIcon from '@material-ui/icons/Forward';
import { useState } from 'react'

const CustomDiv = styled.div`
    display: flex;
    flex-direction: row;
    background: #ECECEC;
    width: 100%;
    padding: 10px; 
    align-items: center;
`;

const UpArrow = styled.div`
    transform: rotate(90deg);
    cursor: pointer;
`
const DownArrow = styled.div`
    transform: rotate(-90deg);
    cursor: pointer;
`

function ReplyFooter({ votes }) {

    const [totalVotes, setTotalVotes] = useState(votes);

    return (
        <CustomDiv>
            <UpArrow>
                <ForwardIcon onClick={setTotalVotes((prevVotes) => prevVotes + 1)} />
            </UpArrow>
            {/* Total votes for this reply */}
            <p>{totalVotes}</p>
            <DownArrow>
                <ForwardIcon />
            </DownArrow>
        </CustomDiv>
    )
}

export default ReplyFooter
