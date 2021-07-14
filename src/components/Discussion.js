import { useState } from 'react'
import Question from './Question'
import { QuestionContext } from './QuestionContext'






const Discussion = () => {


    const [question, setQuestion] = useState({
        userName: "Ansh",
        votes: 24,
        timeStamp: "15:21",
        dateUploaded: "3 months ago",
        userImageUrl: "https://material-ui.com/static/images/avatar/2.jpg",
        totalReplies: 5,
        title: 'Why is the squareroot of pi an odd number?',
        description: 'So pi has a value of 3.14... but what about the square root? Do decimal places count? Like how about 1.5 is that even or odd.',
        comments: [{
            id: 1, parent_id: null,
            userName: "exbus67",
            timeStamp: "47:21",
            dateUploaded: "1 year ago",
            userImageUrl: "https://material-ui.com/static/images/avatar/1.jpg",
            reply: "[{\"type\":\"paragraph\",\"children\":[{\"text\":\"This is editable \"},{\"text\":\"rich\",\"bold\":true},{\"text\":\" text, \"},{\"text\":\"much\",\"italic\":true},{\"text\":\" better than a \"},{\"text\":\"<textarea>\",\"code\":true},{\"text\":\"!\"}]},{\"type\":\"paragraph\",\"children\":[{\"text\":\"Since it's rich text\"}]}]",
        },
        {
            id: 2, parent_id: 1,
            userName: "Random",
            timeStamp: "6:21",
            dateUploaded: "1 month ago",
            userImageUrl: "https://material-ui.com/static/images/avatar/1.jpg",
            reply: "[{\"type\":\"paragraph\",\"children\":[{\"text\":\"This is editable \"},{\"text\":\"rich\",\"bold\":true},{\"text\":\" text, \"},{\"text\":\"much\",\"italic\":true},{\"text\":\" better than a \"},{\"text\":\"<textarea>\",\"code\":true},{\"text\":\"!\"}]},{\"type\":\"paragraph\",\"children\":[{\"text\":\"Since it's rich text\"}]}]",
        },
        {
            id: 3, parent_id: 1,
            userName: "Random",
            timeStamp: "15:21",
            dateUploaded: "3 months ago",
            userImageUrl: "https://material-ui.com/static/images/avatar/1.jpg",
            reply: "[{\"type\":\"paragraph\",\"children\":[{\"text\":\"This is editable \"},{\"text\":\"rich\",\"bold\":true},{\"text\":\" text, \"},{\"text\":\"much\",\"italic\":true},{\"text\":\" better than a \"},{\"text\":\"<textarea>\",\"code\":true},{\"text\":\"!\"}]},{\"type\":\"paragraph\",\"children\":[{\"text\":\"Since it's rich text\"}]}]",
        },
        {
            id: 4, parent_id: 2,
            userName: "Random",
            timeStamp: "15:21",
            dateUploaded: "3 months ago",
            userImageUrl: "https://material-ui.com/static/images/avatar/1.jpg",
            reply: "[{\"type\":\"paragraph\",\"children\":[{\"text\":\"This is editable \"},{\"text\":\"rich\",\"bold\":true},{\"text\":\" text, \"},{\"text\":\"much\",\"italic\":true},{\"text\":\" better than a \"},{\"text\":\"<textarea>\",\"code\":true},{\"text\":\"!\"}]},{\"type\":\"paragraph\",\"children\":[{\"text\":\"Since it's rich text\"}]}]",
        },
        {
            id: 5, parent_id: null,
            userName: "Random name 4",
            timeStamp: "15:21",
            dateUploaded: "3 months ago",
            userImageUrl: "https://material-ui.com/static/images/avatar/1.jpg",
            reply: "[{\"type\":\"paragraph\",\"children\":[{\"text\":\"This is editable \"},{\"text\":\"rich\",\"bold\":true},{\"text\":\" text, \"},{\"text\":\"much\",\"italic\":true},{\"text\":\" better than a \"},{\"text\":\"<textarea>\",\"code\":true},{\"text\":\"!\"}]},{\"type\":\"paragraph\",\"children\":[{\"text\":\"Since it's rich text\"}]}]",
        }]
    })


    return (
        <QuestionContext.Provider value={{ question, setQuestion }}>
            <Question />
        </QuestionContext.Provider>
    )
}

export default Discussion;