import { useState } from "react";
import styled from 'styled-components';
import Reply from "./Reply";

const CustomDiv = styled.div`
    display: flex;
    flex-direction: row;
    background: #ECECEC;
    width: 100%;
    padding: 10px; 
    align-items: center;
`;

const CustomUnorderedList = styled.ul`
   margin-left: 0px; 
   padding-left: 0;
   list-style-type:none;
`;


function Replies({ totalReplies, listOfReplies }) {

    const nest = (items, id = null) =>
        items.filter(item => item.parent_id === id)
            .map(item => ({ ...item, children: nest(items, item.id) }));

    const comments = [
        {
            id: 1, parent_id: null,
            userName: "Random name",
            timeStamp: "15:21",
            dateUploaded: "3 months ago",
            userImageUrl: "https://material-ui.com/static/images/avatar/1.jpg",
            reply: "Proident duis nostrud Lorem incididunt. Reprehenderit et anim sint nostrud exercitation sit. Duis cupidatat laborum non deserunt sit nulla officia. "
        },
        {
            id: 2, parent_id: 1,
            userName: "Random",
            timeStamp: "15:21",
            dateUploaded: "3 months ago",
            userImageUrl: "https://material-ui.com/static/images/avatar/1.jpg",
            reply: "Proident duis nostrud Lorem incididunt. Reprehenderit et anim sint nostrud exercitation sit. Duis cupidatat laborum non deserunt sit nulla officia. "
        },
        {
            id: 3, parent_id: 1,
            userName: "Random",
            timeStamp: "15:21",
            dateUploaded: "3 months ago",
            userImageUrl: "https://material-ui.com/static/images/avatar/1.jpg",
            reply: "Proident duis nostrud Lorem incididunt. Reprehenderit et anim sint nostrud exercitation sit. Duis cupidatat laborum non deserunt sit nulla officia. "
        },
        {
            id: 4, parent_id: 2,
            userName: "Random",
            timeStamp: "15:21",
            dateUploaded: "3 months ago",
            userImageUrl: "https://material-ui.com/static/images/avatar/1.jpg",
            reply: "Proident duis nostrud Lorem incididunt. Reprehenderit et anim sint nostrud exercitation sit. Duis cupidatat laborum non deserunt sit nulla officia. "
        },
        {
            id: 5, parent_id: null,
            userName: "Random name 4",
            timeStamp: "15:21",
            dateUploaded: "3 months ago",
            userImageUrl: "https://material-ui.com/static/images/avatar/1.jpg",
            reply: "Proident duis nostrud Lorem incididunt. Reprehenderit et anim sint nostrud exercitation sit. Duis cupidatat laborum non deserunt sit nulla officia. "
        },
    ];

    const [nestedComments, setNestedComments] = useState(nest(comments));

    const Comment = props => (
        <li>
            {props.id}
            <ul>
                {props.children.map(child => <Comment {...child} />)}
            </ul>
        </li>
    )

    const List = ({ comments }) => (
        <ul>
            {comments.map(comment => <Comment {...comment} />)}
        </ul>
    )

    return (
        <CustomDiv>
            <CustomUnorderedList>
                {nestedComments.map(comment =>
                    <Reply {...comment} />
                )}
            </CustomUnorderedList>
        </CustomDiv>
    )
}

export default Replies
