import QuestionHeader from './QuestionHeader';
import QuestionTitle from './QuestionTitle';
import { Sidebar } from './Sidebar';
import styled from 'styled-components';
import QuestionContent from './QuestionContent';
import QuestionFooter from './QuestionFooter';

import { useContext } from 'react';
import { QuestionContext } from './QuestionContext';

const CustomDiv = styled.div`
	display: flex;
	flex-direction: row;
`;

function Question() {
	const { question, setQuestion } = useContext(QuestionContext);
	console.log('Replies count', question.replies.length);
	return (
		<CustomDiv>
			<Sidebar />
			<div className="questionMain">
				<QuestionHeader
					userName={question.author.given_name}
					timeStamp={question.timestamp}
					dateUploaded={question.dateCreated}
					userImageUrl={question.author.picture}
				/>
				<QuestionTitle questionTitle={question.title} />
				<QuestionContent question={question.content} />
				<QuestionFooter totalReplies={question.replies.length} />
			</div>
		</CustomDiv>
	);
}

export default Question;
