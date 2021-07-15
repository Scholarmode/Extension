import { useState } from 'react';
import Question from './Question';
import { QuestionContext } from './QuestionContext';
import { useEffect } from 'react';
import AskQuestionButton from './AskQuestionButton';
import styled from 'styled-components';
import ReplyBox from './ReplyBox';
import TitleInput from './TitleInput';

const CustomDiv = styled.div`
	margin: 10px;
	margin-top: 0px;
	margin-left: 0px;
`;

const Discussion = () => {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);

<<<<<<< HEAD
	// const url = 'http://localhost:8080/questions/60efb101458fe615aaa2786b';
	const url = 'http://localhost:8080/questions/60effd184aec8d4c777abb53';
	// const url = 'http://localhost:8080/questions/author/60eec4b4ca5eb79cc28d3e94';
=======
	const url = 'http://localhost:8080/questions/60effd184aec8d4c777abb53';
>>>>>>> ae43b3a6c68ff2042f0ded8b411346ab7be698d0


	useEffect(() => {
		fetch(url)
			.then(function (response) {
				if (response.status !== 200) {
					console.log(
						'Looks like there was a problem. Status Code: ' +
						response.status
					);
					return;
				}

				// Examine the text in the response
				response.json().then(function (data) {
					setIsLoaded(true);
					setQuestion(data);
				});
			})
			.catch(function (err) {
				console.log('Fetch Error :-S', err);
			});
	}, []);

	const [question, setQuestion] = useState({
		author: {
			_id: '',
			email: '',
			verified_email: true,
			name: '',
			given_name: '',
			family_name: '',
			picture:
				'',
			locale: '',
			googleId: '',
		},
		userName: 'Ansh',
		votes: 24,
		timeStamp: '15:21',
		dateUploaded: '3 months ago',
		userImageUrl: 'https://material-ui.com/static/images/avatar/2.jpg',
		totalReplies: 5,
		title: 'Why is the squareroot of pi an odd number?',
		content:
			"[{\"type\":\"paragraph\",\"children\":[{\"text\":\"This is editable \"},{\"text\":\"rich\",\"bold\":true},{\"text\":\" text, \"},{\"text\":\"much\",\"italic\":true},{\"text\":\" better than a \"},{\"text\":\"<textarea>\",\"code\":true},{\"text\":\"!\"}]},{\"type\":\"paragraph\",\"children\":[{\"text\":\"Since it's rich text, you can do things like turn a selection of text \"},{\"text\":\"bold\",\"bold\":true},{\"text\":\", or add a semantically rendered block quote in the middle of the page, like this:\"}]},{\"type\":\"block-quote\",\"children\":[{\"text\":\"A wise quote.\"}]},{\"type\":\"paragraph\",\"children\":[{\"text\":\"Try it out for yourself!\"}]}]",

		replies: [
			{
				id: 1,
				parent_id: null,
				userName: 'exbus67',
				timeStamp: '47:21',
				dateUploaded: '1 year ago',
				userImageUrl:
					'https://material-ui.com/static/images/avatar/1.jpg',
				reply: '[{"type":"paragraph","children":[{"text":"This is editable "},{"text":"rich","bold":true},{"text":" text, "},{"text":"much","italic":true},{"text":" better than a "},{"text":"<textarea>","code":true},{"text":"!"}]},{"type":"paragraph","children":[{"text":"Since it\'s rich text"}]}]',
			},
			{
				id: 2,
				parent_id: 1,
				userName: 'Random',
				timeStamp: '6:21',
				dateUploaded: '1 month ago',
				userImageUrl:
					'https://material-ui.com/static/images/avatar/1.jpg',
				reply: '[{"type":"paragraph","children":[{"text":"This is editable "},{"text":"rich","bold":true},{"text":" text, "},{"text":"much","italic":true},{"text":" better than a "},{"text":"<textarea>","code":true},{"text":"!"}]},{"type":"paragraph","children":[{"text":"Since it\'s rich text"}]}]',
			},
			{
				id: 3,
				parent_id: 1,
				userName: 'Random',
				timeStamp: '15:21',
				dateUploaded: '3 months ago',
				userImageUrl:
					'https://material-ui.com/static/images/avatar/1.jpg',
				reply: '[{"type":"paragraph","children":[{"text":"This is editable "},{"text":"rich","bold":true},{"text":" text, "},{"text":"much","italic":true},{"text":" better than a "},{"text":"<textarea>","code":true},{"text":"!"}]},{"type":"paragraph","children":[{"text":"Since it\'s rich text"}]}]',
			},
			{
				id: 4,
				parent_id: 2,
				userName: 'Random',
				timeStamp: '15:21',
				dateUploaded: '3 months ago',
				userImageUrl:
					'https://material-ui.com/static/images/avatar/1.jpg',
				reply: '[{"type":"paragraph","children":[{"text":"This is editable "},{"text":"rich","bold":true},{"text":" text, "},{"text":"much","italic":true},{"text":" better than a "},{"text":"<textarea>","code":true},{"text":"!"}]},{"type":"paragraph","children":[{"text":"Since it\'s rich text"}]}]',
			},
			{
				id: 5,
				parent_id: null,
				userName: 'Random name 4',
				timeStamp: '15:21',
				dateUploaded: '3 months ago',
				userImageUrl:
					'https://material-ui.com/static/images/avatar/1.jpg',
				reply: '[{"type":"paragraph","children":[{"text":"This is editable "},{"text":"rich","bold":true},{"text":" text, "},{"text":"much","italic":true},{"text":" better than a "},{"text":"<textarea>","code":true},{"text":"!"}]},{"type":"paragraph","children":[{"text":"Since it\'s rich text"}]}]',
			},
		],
	});

	const [askButtonState, setAskButtonState] = useState(false)

	const [title, setTitle] = useState("")

	return (
		<QuestionContext.Provider value={{ question, setQuestion }}>
			<AskQuestionButton askButtonOpen={askButtonState} setAskButtonOpen={setAskButtonState} />
			{askButtonState &&
				<CustomDiv>
					<TitleInput title={title} setTitle={setTitle} />
					<ReplyBox />
				</CustomDiv>
			}
			<Question />
		</QuestionContext.Provider>
	);
};

//     const [question, setQuestion] = useState({
//         userName: "Ansh",
//         votes: 24,
//         timeStamp: "15:21",
//         dateUploaded: "3 months ago",
//         userImageUrl: "https://material-ui.com/static/images/avatar/2.jpg",
//         totalReplies: 5,
//         title: 'Why is the squareroot of pi an odd number?',
//         description: 'So pi has a value of 3.14... but what about the square root? Do decimal places count? Like how about 1.5 is that even or odd.',
//         comments: [{
//             id: 1, parent_id: null,
//             userName: "exbus67",
//             timeStamp: "47:21",
//             dateUploaded: "1 year ago",
//             userImageUrl: "https://material-ui.com/static/images/avatar/1.jpg",
//             reply: "Yup, fuck that. The solution is always run away from math with your hands in the air."
//         },
//         {
//             id: 2, parent_id: 1,
//             userName: "Random",
//             timeStamp: "6:21",
//             dateUploaded: "1 month ago",
//             userImageUrl: "https://material-ui.com/static/images/avatar/1.jpg",
//             reply: "Proident duis nostrud Lorem incididunt. Reprehenderit et anim sint nostrud exercitation sit. Duis cupidatat laborum non deserunt sit nulla officia. "
//         },
//         {
//             id: 3, parent_id: 1,
//             userName: "Random",
//             timeStamp: "15:21",
//             dateUploaded: "3 months ago",
//             userImageUrl: "https://material-ui.com/static/images/avatar/1.jpg",
//             reply: "Proident duis nostrud Lorem incididunt. Reprehenderit et anim sint nostrud exercitation sit. Duis cupidatat laborum non deserunt sit nulla officia. "
//         },
//         {
//             id: 4, parent_id: 2,
//             userName: "Random",
//             timeStamp: "15:21",
//             dateUploaded: "3 months ago",
//             userImageUrl: "https://material-ui.com/static/images/avatar/1.jpg",
//             reply: "Proident duis nostrud Lorem incididunt. Reprehenderit et anim sint nostrud exercitation sit. Duis cupidatat laborum non deserunt sit nulla officia. "
//         },
//         {
//             id: 5, parent_id: null,
//             userName: "Random name 4",
//             timeStamp: "15:21",
//             dateUploaded: "3 months ago",
//             userImageUrl: "https://material-ui.com/static/images/avatar/1.jpg",
//             reply: "Proident duis nostrud Lorem incididunt. Reprehenderit et anim sint nostrud exercitation sit. Duis cupidatat laborum non deserunt sit nulla officia. "
//         }]
//     })


//     return (
//         <QuestionContext.Provider value={{ question, setQuestion }}>
//             <AskQuestionButton />
//             <Question />
//         </QuestionContext.Provider>
//     )
// }


export default Discussion;
