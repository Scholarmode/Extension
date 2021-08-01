import styled from 'styled-components';
import { ReactComponent as EmptyLogo } from '../assets/emptyQuestionIcon.svg'

const CustomDiv = styled.div`
display: flex;
flex-direction: column;
min-width: 389.27px;
margin-bottom: 30px;
justify-content: center;
align-items: center;
margin-top: 30px;
`;

const QuietText = styled.p`
    font-weight: 500;
    font-size: 24px;
    display: flex;
    justify-content: center;
    margin-top: 15px;
`;

const MoreText = styled.p`
    font-size: 16px;
    display: flex;
    justify-content: center;
    margin-top: 15px;
    color: #909090;
    text-align: center;
`;


function EmptyScreen() {
    return (
        <CustomDiv>
            <EmptyLogo />
            <QuietText>hey, it’s kinda quiet here...</QuietText>
            <MoreText>Are you stuck or confused? Why not start a
                discussion above with a quick question.</MoreText>
        </CustomDiv>
    )
}

export default EmptyScreen
