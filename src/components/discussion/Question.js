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
	margin-bottom: 20px;
`;

const NewCustomWidthDiv = styled.div`
	min-width: 389.27px;
`;


function Question({ question, allQuestions }) {
	//const { questions, setQuestions } = useContext(QuestionContext);
	return (
		<CustomDiv>
			<Sidebar question={question} />
			<NewCustomWidthDiv className="questionMain">
				<QuestionHeader
					userName={question.author.given_name}
					timeStamp={question.timestamp}
					dateUploaded={moment(question.dateCreated).fromNow()}
					userImageUrl={question.author.picture}
				/>
				<QuestionTitle questionTitle={question.title} />
				<QuestionContent question={question.content} slateLang={question.slateLang} />
				<QuestionFooter totalReplies={question.replies.length} questions={question} allQuestions={allQuestions} />
			</NewCustomWidthDiv>
		</CustomDiv>
	);
}

export default Question;
