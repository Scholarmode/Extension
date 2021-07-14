import { UserNameText, TimeStamp, UploadedDate, CustomDiv} from './QuestionHeader'
import styled from 'styled-components'
import UserImage from "./UserImage";
import React from "react";

function ReplyHeader({ userName, timeStamp, dateUploaded, userImageUrl }) {
    return (
        <div>
            <CustomDiv>
                {/* User Profile Image - Will Move In Different Component */}
                <UserImage userName={userName} userImage={userImageUrl} />
                <UserNameText>{userName}</UserNameText>
                <p> • </p>
                <TimeStamp>{timeStamp}</TimeStamp>
                <p> • </p>
                <UploadedDate>{dateUploaded}</UploadedDate>
            </CustomDiv>
        </div>
    )
}

export default ReplyHeader
