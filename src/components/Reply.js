import styled from 'styled-components';
import QuestionHeader from './QuestionHeader';
import ReplyContent from './ReplyContent';
import ReplyHeader from './ReplyHeader';
import ReplyFooter from './ReplyFooter';
import { useState } from 'react';
import moment from 'moment';

const CustomUnorderedList = styled.ul`
	margin-left: 10px;
	padding-left: 0;
	list-style-type: none;
`;

const ReplyThread = styled.div`
	border-left: 2px solid rgb(144, 144, 144);
	display: flex;
	flex-direction: column;
	margin-left: 15px;
	margin-top: 5px;
	margin-bottom: 5px;
	margin-right: 10px;
`;

const TestDiv = styled.div`
	background-color: red;
	width: 100%;
	height: 50px;
`;

const Reply = (props) => {
	const comment = { ...props.comment };

	let userNameUrl = 'https://material-ui.com/static/images/avatar/1.jpg';
	return (
		<>
			<div>
				<li>
					<ReplyHeader
						userName={comment.author.given_name}
						timeStamp={comment.timestamp}
						dateUploaded={moment(comment.dateCreated).fromNow()}
						userImageUrl={comment.author.picture}
					/>
					<ReplyThread>
						<ReplyContent reply={comment.content} hasMargin={true} slateLang={comment.slateLang} />
						<ReplyFooter
							votes={comment.votes}
							replyBoxOpen={props.replyBoxOpen}
							setReplyBoxOpen={props.setReplyBoxOpen}
							setReplyUserName={props.setReplyUserName}
							userName={comment.author.given_name}
							replyId={comment._id}
							setReplyId={props.setReplyId}
							reply={comment}
						/>
						<CustomUnorderedList>
							{comment.replies.map((child) => (
								<Reply
									comment={child}
									replyBoxOpen={props.replyBoxOpen}
									setReplyBoxOpen={props.setReplyBoxOpen}
									setReplyUserName={props.setReplyUserName}
									setReplyId={props.setReplyId}
								/>
							))}
						</CustomUnorderedList>
					</ReplyThread>
				</li>
			</div>
		</>
	);
};

export default Reply;
