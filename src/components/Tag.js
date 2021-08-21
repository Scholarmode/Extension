import { useState } from "react";
import styled from "styled-components";
import { ReactComponent as VotedArrow } from '../assets/votedArrow.svg';
import { ReactComponent as VotedArrowGrey } from '../assets/votedGray.svg';

const DecolouredTag = styled.button`
  border-radius: 4px;
  background-color: #065fd4;
  padding: 5px;
  border: 1px solid black;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: white;
  font-weight: 400;
  cursor: pointer;
`;

const ViewVotes = styled.button`
  border-radius: 4px;
  background-color: #193b66;
  border: 1px solid black;
  height: 20px;
  margin-left: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: white;
  font-weight: 400;
  cursor: pointer;
`;

const GreyColouredTag = styled.button`
  border-radius: 4px;
  background-color: #ececec;
  padding: 5px;
  border: 1px solid black;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: black;
  font-weight: 400;
  cursor: pointer;
`;

const GreyViewVotes = styled.button`
  border-radius: 4px;
  background-color: #909090;
  border: 1px solid black;
  height: 20px;
  margin-left: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: white;
  font-weight: 400;
  cursor: pointer;
`;

export default function Tag({ clickedOrNot, voteName, votes }) {
    const [clicked, setClicked] = useState(clickedOrNot);
    const [votesNew, setVotes] = useState(votes)
    const changeState = () => {
        setClicked(!clicked);
        if (clicked) {
            setVotes(votesNew - 1)
        }
        else {
            setVotes(votesNew + 1)
        }
    };
    return clicked ? (
        <DecolouredTag onClick={changeState}>
            <VotedArrow style={{ marginRight: '5px' }} />
            {voteName}
            <ViewVotes>{votesNew}</ViewVotes>
        </DecolouredTag>
    ) : (
        <GreyColouredTag onClick={changeState}>
            <VotedArrowGrey style={{ marginRight: '5px' }} />
            {voteName}
            <GreyViewVotes>{votesNew}</GreyViewVotes>
        </GreyColouredTag>
    );
}
