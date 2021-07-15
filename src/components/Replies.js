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
`;

const CustomUnorderedList = styled.ul`
	margin-left: 0px;
	padding-left: 0;
	list-style-type: none;
`;

const TestDiv = styled.div`
	background-color: blue;
	width: 100%;
	height: 50px;
`;

function Replies(props) {
	const { question, setQuestion } = useContext(QuestionContext);

	const nest = (items, id = null) =>
		items.filter(item => item.parentReply === id)
			.map(item => ({ ...item, children: nest(items.replies, item._id) }));

	// const nest = (items, id = null) => {
	// 	console.log(items);
	// 	console.log(id);
	// 	items
	// 		.filter((item) => item.parentReply === id)
	// 		.map((item) => ({ ...item, children: nest(items, item.id) }));
	// };

	const comments = question.replies;
	console.log(`comments: ${comments}`);

	const [nestedComments, setNestedComments] = useState(nest(comments));

	const Comment = (props) => (
		<li>
			{props.id}
			<ul>
				{props.children.map((child) => (
					<Comment {...child} />
				))}
			</ul>
		</li>
	);

	const List = ({ comments }) => (
		<ul>
			{comments.map((comment) => (
				<Comment {...comment} />
			))}
		</ul>
	);

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
						/>
					</>
				))}
			</CustomUnorderedList>
		</CustomDiv>
	);
}

export default Replies;
