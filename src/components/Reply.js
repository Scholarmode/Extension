
import styled from 'styled-components';
import QuestionHeader from './QuestionHeader';
import ReplyContent from './ReplyContent';
import ReplyHeader from './ReplyHeader';
import ReplyFooter from './ReplyFooter';

const CustomUnorderedList = styled.ul`
    margin-left: 10px; 
    padding-left: 0;
    list-style-type:none;
`;

const ReplyThread = styled.div`
   border-left: 2px solid #909090;
   display: block;
   height: 100%;
   width: 80%;
   margin-left: 23px;
   padding-top: 5px;
   margin-top: 5px;
   margin-bottom: 5px;
`;


const Reply = props => {
    return (
        <div>
            <li>
                <ReplyHeader userName={props.userName} timeStamp={props.timeStamp} dateUploaded={props.dateUploaded} userImageUrl={props.userImageUrl} />
                <ReplyThread >
                    <ReplyContent reply={props.reply} />
                    <ReplyFooter votes={2} />
                    <CustomUnorderedList>
                        {props.children.map(child => <Reply {...child} />)}
                    </CustomUnorderedList>
                </ReplyThread>
            </li>
        </div>
    )
}

export default Reply
