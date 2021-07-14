import styled from "styled-components";
import TextEditor from "./TextEditor";
import React from "react";

const CustomDiv = styled.div`
  width: 100%;
  min-height: 100px;
  border: 1px solid gray;
  border-radius: 5px;
  padding: 10px;
  margin-right: 10px;
`;

const SubmitButton = styled.button`
  color: white;
  background-color: #da0000;
  border-radius: 10px;
  font-size: 1em;
  text-align: center;
  height: 25px;
  width: 80px;
  border: 1px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  border: 0px;
  font-size: 1em;
  color: #626262;
  margin-left: 10px;
  cursor: pointer;
  background: none;
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;

function ReplyBox() {
    return (
        <div>
            <CustomDiv>
                <TextEditor />
                <ButtonDiv>
                    <SubmitButton>Submit</SubmitButton>
                    <CancelButton>Cancel</CancelButton>
                </ButtonDiv>
            </CustomDiv>
        </div>
    );
}

export default ReplyBox

