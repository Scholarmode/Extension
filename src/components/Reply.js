/* global chrome */
import styled from 'styled-components';
import QuestionHeader from './QuestionHeader';
import ReplyContent from './ReplyContent';
import ReplyHeader from './ReplyHeader';
import ReplyFooter from './ReplyFooter';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { host } from './Discussion';


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
	margin-bottom: 0px;
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
	const [showReply, setShowReply] = useState(true);

	var requestOptions = {
		method: 'GET',
		redirect: 'follow'
	};

	useEffect(() => {

		chrome.storage.sync.get(['token'], async (result) => {
			fetch(`${host}/replies/nested-level/${comment._id}?token=${result.token}`, requestOptions)
				.then(response => response.text())
				.then(resultH => {
					console.log("Result Here: " + resultH)
					if (parseInt(resultH) >= 4) {
						setShowReply(false)
					}
					else {
						setShowReply(true)
					}
				})
				.catch(error => console.log('error', error));
		})

	}, [])

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
						{showReply ?
							<ReplyFooter
								votes={comment.votes}
								replyBoxOpen={props.replyBoxOpen}
								setReplyBoxOpen={props.setReplyBoxOpen}
								setReplyUserName={props.setReplyUserName}
								userName={comment.author.given_name}
								replyId={comment._id}
								setReplyId={props.setReplyId}
								reply={comment}
								hideReplyIcon={false}
							/>
							:
							<ReplyFooter
								votes={comment.votes}
								replyBoxOpen={props.replyBoxOpen}
								setReplyBoxOpen={props.setReplyBoxOpen}
								setReplyUserName={props.setReplyUserName}
								userName={comment.author.given_name}
								replyId={comment._id}
								setReplyId={props.setReplyId}
								reply={comment}
								hideReplyIcon={true}
							/>
						}
						<CustomUnorderedList>
							{comment.replies.map((child, index) => (
								<>
									{console.log("Index: " + index)}
									<Reply
										comment={child}
										replyBoxOpen={props.replyBoxOpen}
										setReplyBoxOpen={props.setReplyBoxOpen}
										setReplyUserName={props.setReplyUserName}
										setReplyId={props.setReplyId}
									/>
								</>
							))}
						</CustomUnorderedList>
					</ReplyThread>
				</li>
			</div>
		</>
	);
};

export default Reply;
