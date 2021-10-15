
import styled from 'styled-components'
import UserImage from "./UserImage";
import React from "react";

export const CustomDiv = styled.div`
    display: flex;
    flex-direction: row;
    background: #ECECEC;
    width: 100%;
    align-items: center;
`;

export const UserNameText = styled.p`
     text-align: center;
     font-size: 14px;
     color: black;
     margin-left: 0px;
     margin-right: 5px;
`;

export const TimeStamp = styled.div`
   font-size: 14px;
   color: #2196F3;
   text-decoration: underline;
   margin-left: 5px;
   margin-right: 5px;
`;

export const UploadedDate = styled.div`
     font-size: 14px;
     color: #979797;
     margin-left: 5px;
     margin-right: 5px;
`;


function QuestionHeader({ userName, timeStamp, dateUploaded, userImageUrl }) {
    return (
        <CustomDiv>
            {/* User Profile Image - Will Move In Different Component */}
            <UserImage userName={userName} userImage={userImageUrl} />
            <UserNameText>{userName}</UserNameText>
            <p> • </p>
            <TimeStamp>{timeStamp}</TimeStamp>
            <p> • </p>
            <UploadedDate>{dateUploaded}</UploadedDate>
        </CustomDiv>
    )
}

export default QuestionHeader