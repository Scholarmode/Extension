import { useState } from "react";
import styled from "styled-components";

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

export default function Tag({ clickedOrNot, voteName }) {
    const [clicked, setClicked] = useState(clickedOrNot);
    const changeState = () => {
        setClicked(!clicked);
    };
    return clicked ? (
        <DecolouredTag onClick={changeState}>
            {voteName}
            <ViewVotes>202</ViewVotes>
        </DecolouredTag>
    ) : (
        <GreyColouredTag onClick={changeState}>
            {voteName}
            <GreyViewVotes>454</GreyViewVotes>
        </GreyColouredTag>
    );
}
