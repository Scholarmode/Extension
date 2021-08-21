import { useState } from "react";
import styled from "styled-components";
import { ReactComponent as VotedArrow } from '../assets/votedArrow.svg';
import { ReactComponent as VotedArrowGrey } from '../assets/votedGray.svg';

const DecolouredTag = styled.button`
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  border-right-width: 0px;
  background-color: #065fd4;
  padding: 5px;
  border: 1px solid black;
  margin: 10px;
  margin-right: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: white;
  font-weight: 400;
  cursor: pointer;
`;

const ViewVotes = styled.button`
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-left-width: 0px;
  background-color: #193b66;
  border: 1px solid black;
  height: 100%;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: white;
  font-weight: 400;
  cursor: pointer;
`;

const GreyColouredTag = styled.button`
  background-color: #ececec;
  padding: 5px;
  border: 1px solid black;
  margin: 10px;
  margin-right: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: black;
  font-weight: 400;
  cursor: pointer;
`;

const GreyViewVotes = styled.button`
  background-color: #909090;
  border: 1px solid black;
  height: 100%;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: white;
  font-weight: 400;
  cursor: pointer;
`;

const CustomDiv = styled.div`
  display: flex;
  align-items: center;
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
        <CustomDiv>
            <DecolouredTag onClick={changeState}>
                <VotedArrow style={{ marginRight: '5px' }} />
                {voteName}
            </DecolouredTag>
            <ViewVotes>{votesNew}</ViewVotes>
        </CustomDiv>
    ) : (
        <CustomDiv>
            <GreyColouredTag onClick={changeState}>
                <VotedArrowGrey style={{ marginRight: '5px' }} />
                {voteName}
            </GreyColouredTag>
            <GreyViewVotes>{votesNew}</GreyViewVotes>
        </CustomDiv>
    );
}
