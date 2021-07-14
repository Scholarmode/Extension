import styled from 'styled-components';

const CustomDiv = styled.div`
display: flex;
flex-direction: row;
background: #ECECEC;
width: 100%;
font-size: 16px;

`;

const LinkSpan = styled.span`
    color: #2196F3;
`

const CustomReplyText = styled.p`
    margin-left: 10px;
`;

function ReplyBoxHeader({ userName }) {
    return (
        <CustomDiv>
            <CustomReplyText>Reply to @<LinkSpan>{userName}</LinkSpan></CustomReplyText>
        </CustomDiv>
    )
}

export default ReplyBoxHeader
