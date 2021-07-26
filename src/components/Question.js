import QuestionHeader from './QuestionHeader';
import QuestionTitle from './QuestionTitle';
import { Sidebar } from './Sidebar';
import styled from 'styled-components';
import QuestionContent from './QuestionContent';
import QuestionFooter from './QuestionFooter';

import { useContext } from 'react';
import { QuestionContext } from './QuestionContext';
import moment from 'moment';

const CustomDiv = styled.div`
	display: flex;
	flex-direction: row;
	min-width: 389.27px;
`;

const NewCustomWidthDiv = styled.div`
	min-width: 389.27px;
`;

function Question() {
	const { question, setQuestion } = useContext(QuestionContext);
	console.log("Question Content: " + question.content)
	return (
		<CustomDiv>
			<Sidebar />
			<NewCustomWidthDiv className="questionMain">
				<QuestionHeader
					userName={question.author.given_name}
					timeStamp={question.timestamp}
					dateUploaded={moment(question.dateCreated).fromNow()}
					userImageUrl={question.author.picture}
				/>
				<QuestionTitle questionTitle={question.title} />
				<QuestionContent question={question.content} />
				<QuestionFooter totalReplies={question.replies.length} />
			</NewCustomWidthDiv>
		</CustomDiv>
	);
}

export default Question;
