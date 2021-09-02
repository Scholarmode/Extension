import { useState } from 'react';
import styled from 'styled-components';
import Reply from './Reply';
import { useContext } from 'react';
import { QuestionContext } from './QuestionContext';

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
	//const { question, setQuestion } = useContext(QuestionContext);


	// const nest = (items, id = null) =>
	// 	items.filter(item => item.parentReply === id)
	// 		.map(item => ({ ...item, children: nest(items.replies, item._id) }));

	// const nest = (items, id = null) =>
	// 	items
	// 		.filter((item) => item.parentReply === id)
	// 		.map((item) => ({
	// 			...item,
	// 			children: nest(items.replies, item._id),
	// 		}));


	// const nest = (items, id = null) => {
	// 	items
	// 		.filter((item) => item.parentReply === id)
	// 		.map((item) => ({ ...item, children: nest(items, item.id) }));
	// };

	// const comments = question.replies;

	// const [nestedComments, setNestedComments] = useState(comments);
	const nestedComments = props.nestedComments

	console.log("Nested Comments: " + nestedComments);

	// const Comment = (props) => (
	// 	<li>
	// 		{props.id}
	// 		<ul>
	// 			{props.children.map((child) => (
	// 				<Comment {...child} />
	// 			))}
	// 		</ul>
	// 	</li>
	// );

	// const List = ({ comments }) => (
	// 	<ul>
	// 		{comments.map((comment) => (
	// 			<Comment {...comment} />
	// 		))}
	// 	</ul>
	// );

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
