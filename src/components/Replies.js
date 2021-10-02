import styled from 'styled-components';
import Reply from './Reply';

const CustomDiv = styled.div`
	display: flex;
	flex-direction: row;
	background: #ececec;
	width: 100%;
	align-items: center;
	overflow: hidden;
	padding-bottom: 10px;
`;

const CustomUnorderedList = styled.ul`
	margin-left: 0px;
	padding-left: 0;
	list-style-type: none;
`;

function Replies(props) {
	const nestedComments = props.nestedComments
	return (
		<CustomDiv>
			<CustomUnorderedList>
				{nestedComments.map((comment) => (
					<>
						<Reply
							comment={comment}
							replyBoxOpen={props.replyBoxState}
							setReplyBoxOpen={props.setReplyBoxState}
							setReplyUserName={props.setReplyUserName}
							setReplyId={props.setReplyId}
							hideReplyIcon={false}
						/>
					</>
				))}
			</CustomUnorderedList>
		</CustomDiv>
	);
}

export default Replies;
