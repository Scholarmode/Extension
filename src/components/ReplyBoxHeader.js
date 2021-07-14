import styled from 'styled-components';

const CustomDiv = styled.div`
display: flex;
flex-direction: row;
background: #ECECEC;
width: 100%;
font-size: 16px;
margin-left: 10px;

`;

const LinkSpan = styled.span`
    color: #2196F3;
`

function ReplyBoxHeader({ userName }) {
    return (
        <CustomDiv>
            <p>Reply to @<LinkSpan>{userName}</LinkSpan></p>
        </CustomDiv>
    )
}

export default ReplyBoxHeader
