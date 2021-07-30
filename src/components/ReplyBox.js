/* global chrome */
import styled from 'styled-components';
import TextEditor from './TextEditor';
import { useState } from 'react';
import { Node } from 'slate';
import PostRequestError from './PostRequestError'
import { QuestionContext } from './QuestionContext';
import { useContext } from 'react';

const CustomDiv = styled.div`
	min-height: 100px;
	border: 1px solid gray;
	border-radius: 5px;
	padding-top: 10px;
	padding-bottom: 10px;
	padding-left: 5px;
    background-color: white;
`;

const SubmitButton = styled.button`
	color: white;
	background-color: #da0000;
	border-radius: 10px;
	font-size: 1em;
	text-align: center;
	height: 25px;
	width: 80px;
	border: 1px;
	cursor: pointer;
`;

const CancelButton = styled.button`
	border: 0px;
	font-size: 1em;
	color: #626262;
	margin-left: 10px;
	cursor: pointer;
	background: none;
`;

const ButtonDiv = styled.div`
	display: flex;
	flex-direction: row;
	margin-top: 10px;
`;

const getProfileInfo = (token) => {
    const url = `http://localhost:8080/auth/chrome?access_token=${token}`;
    return fetch(url).then((response) => response.json());
};

const linkifyYouTubeURLs = (text) => {
    const re =
        /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gi;
    return text.replace(re, '$1');
};

const getTimestamp = () => {
    const htmlVideoPlayer = document.getElementsByTagName('video')[0];
    const formatTime = (s) => {
        return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + ~~s;
    };

    return formatTime(htmlVideoPlayer.currentTime);
};

const ReplyBox = ({ askButtonState, askButtonStateFunc, titleInput, allQuestions, setPostReqError, setReplyBoxStateNew, replyBoxStateNew, setReplyBoxOpenNew, isReplyBoxOpenNew }) => {
    const [textValue, setTextValue] = useState(initialValue);

    const { setQuestions } = useContext(QuestionContext);

    const insertObject = (array, index, arrayToInsert) => {
        Array.prototype.splice.apply(array, [index, 0].concat(arrayToInsert));
        return array;
    }

    const storeValue = () => {
        const newValue = JSON.stringify(textValue);

        chrome.storage.sync.get(['token'], async (result) => {
            getProfileInfo(result.token).then((info) => {
                const reqBody = {
                    author: info._id,
                    content: newValue,
                    dateCreated: new Date(),
                    flagged: false,
                    replies: [],
                    reports: [],
                    timestamp: getTimestamp(),
                    title: titleInput,
                    video: linkifyYouTubeURLs(window.location.href),
                    votes: 0,
                };

                // (async () => {
                //     const rawResponse = 
                // })
                fetch('http://localhost:8080/questions/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(reqBody),
                    redirect: "follow"
                })
                    .then(async (response) => {
                        // if (response.status !== 200) {
                        //     setPostReqError(true)
                        // }
                        // else {
                        //     console.log("Response: " + response);
                        //     console.log("Questions: " + allQuestions)
                        //     console.log("JSON: " + response.json());
                        //     let jsonR = response.json()
                        //     let whole = { ...allQuestions, reqBody }
                        //     let newObj = Object.assign({}, allQuestions, reqBody)
                        //     console.log("NewObj: " + JSON.stringify(reqBody))
                        //     // setQuestions(newObj)
                        // }
                        let data = await response.json();
                        if (response.status != 200) {
                            console.log("Error")
                        }
                        else {
                            console.log(JSON.stringify(data))
                            let newObj = insertObject(allQuestions, 0, data)
                            // console.log("New Obj: " + JSON.stringify(newObj))
                            setQuestions(null)
                            setQuestions(newObj)
                            askButtonStateFunc(false)
                            // console.log("Length of all questions: " + allQuestions.length())

                        }
                    }
                    )
                    .then((data) => {
                        console.log("Responses m: " + data)
                    })
                    .catch((err) => {
                        console.log("Error: " + err)
                        setPostReqError(true)
                    });


            });
        });
    };

    const serialize = (value) => {
        return (
            value
                // Return the string content of each paragraph in the value's children.
                .map((n) => Node.string(n))
                // Join them all with line breaks denoting paragraphs.
                .join('\n')
        );
    };

    const closeBox = () => {
        if (replyBoxStateNew) {
            setReplyBoxStateNew(false)
        }
        if (isReplyBoxOpenNew) {
            setReplyBoxOpenNew(false)
        }
        if (askButtonState) {
            askButtonStateFunc(false)
        }
    }

    return (
        <div>
            <CustomDiv>
                <TextEditor value={textValue} setValue={setTextValue} />
                <ButtonDiv>
                    <SubmitButton onClick={storeValue}>Submit</SubmitButton>
                    <CancelButton onClick={closeBox}>Cancel</CancelButton>
                </ButtonDiv>
            </CustomDiv>
        </div>
    );
}

// const initialValue = [
//     {
//         type: 'paragraph',
//         children: [
//             { text: 'This is editable ' },
//             { text: 'rich', bold: true },
//             { text: ' text, ' },
//             { text: 'much', italic: true },
//             { text: ' better than a ' },
//             { text: '<textarea>', code: true },
//             { text: '!' },
//         ],
//     },
//     {
//         type: 'paragraph',
//         children: [
//             {
//                 text: "Since it's rich text, you can do things like turn a selection of text ",
//             },
//             { text: 'bold', bold: true },
//             {
//                 text: ', or add a semantically rendered block quote in the middle of the page, like this:',
//             },
//         ],
//     },
//     {
//         type: 'block-quote',
//         children: [{ text: 'A wise quote.' }],
//     },
//     {
//         type: 'paragraph',
//         children: [{ text: 'Try it out for yourself!' }],
//     },
// ];

const initialValue = [
    {
        type: 'paragraph',
        children: [
            {
                text: '<h1>Hi!</h1>',
            },
        ],
    },
]

export default ReplyBox;
