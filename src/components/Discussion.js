import { useState } from 'react';
import Question from './Question';
import { QuestionContext } from './QuestionContext';
import { useEffect } from 'react';

const Discussion = () => {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);

	const url = 'http://localhost:8080/questions/60ec1c908678a9567cc95263';

	useEffect(() => {
		fetch(url, {
			method: 'GET',
			mode: 'cors',
		})
			.then((res) => res.json())
			.then(
				(result) => {
					setIsLoaded(true);
					setQuestion(result);
					console.log(result);
				},
				// Note: it's important to handle errors here
				// instead of a catch() block so that we don't swallow
				// exceptions from actual bugs in components.
				(error) => {
					setIsLoaded(true);
					setError(error);
				}
			);
	}, []);

	const [question, setQuestion] = useState({
		userName: 'Ansh',
		votes: 24,
		timeStamp: '15:21',
		dateUploaded: '3 months ago',
		userImageUrl: 'https://material-ui.com/static/images/avatar/2.jpg',
		totalReplies: 5,
		title: 'Why is the squareroot of pi an odd number?',
		description:
			'So pi has a value of 3.14... but what about the square root? Do decimal places count? Like how about 1.5 is that even or odd.',
		comments: [
			{
				id: 1,
				parent_id: null,
				userName: 'exbus67',
				timeStamp: '47:21',
				dateUploaded: '1 year ago',
				userImageUrl:
					'https://material-ui.com/static/images/avatar/1.jpg',
				reply: 'Yup, fuck that. The solution is always run away from math with your hands in the air.',
			},
			{
				id: 2,
				parent_id: 1,
				userName: 'Random',
				timeStamp: '6:21',
				dateUploaded: '1 month ago',
				userImageUrl:
					'https://material-ui.com/static/images/avatar/1.jpg',
				reply: 'Proident duis nostrud Lorem incididunt. Reprehenderit et anim sint nostrud exercitation sit. Duis cupidatat laborum non deserunt sit nulla officia. ',
			},
			{
				id: 3,
				parent_id: 1,
				userName: 'Random',
				timeStamp: '15:21',
				dateUploaded: '3 months ago',
				userImageUrl:
					'https://material-ui.com/static/images/avatar/1.jpg',
				reply: 'Proident duis nostrud Lorem incididunt. Reprehenderit et anim sint nostrud exercitation sit. Duis cupidatat laborum non deserunt sit nulla officia. ',
			},
			{
				id: 4,
				parent_id: 2,
				userName: 'Random',
				timeStamp: '15:21',
				dateUploaded: '3 months ago',
				userImageUrl:
					'https://material-ui.com/static/images/avatar/1.jpg',
				reply: 'Proident duis nostrud Lorem incididunt. Reprehenderit et anim sint nostrud exercitation sit. Duis cupidatat laborum non deserunt sit nulla officia. ',
			},
			{
				id: 5,
				parent_id: null,
				userName: 'Random name 4',
				timeStamp: '15:21',
				dateUploaded: '3 months ago',
				userImageUrl:
					'https://material-ui.com/static/images/avatar/1.jpg',
				reply: 'Proident duis nostrud Lorem incididunt. Reprehenderit et anim sint nostrud exercitation sit. Duis cupidatat laborum non deserunt sit nulla officia. ',
			},
		],
	});

	return (
		<QuestionContext.Provider value={{ question, setQuestion }}>
			<Question />
		</QuestionContext.Provider>
	);
};

export default Discussion;
