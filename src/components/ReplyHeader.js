
import styled from 'styled-components'
import UserImage from "./UserImage";

const CustomDiv = styled.div`
    display: flex;
    flex-direction: row;
    background: #ECECEC;
    width: 100%;
    padding-bottom: 0px;
    align-items: center;
`;

const UserNameText = styled.p`
     text-align: center;
     font-size: 18px;
     color: black;
     margin-left: 10px;
     margin-right: 10px;
`;

const TimeStamp = styled.div`
   font-size: 18px;
   color: #2196F3;
   text-decoration: underline;
   margin-left: 10px;
   margin-right: 10px;
`;

const UploadedDate = styled.div`
     font-size: 18px;
     color: #979797;
     margin-left: 10px;
     margin-right: 10px;
`;


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
