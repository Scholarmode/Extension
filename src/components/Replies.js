import { useState } from "react";
import styled from 'styled-components';
import Reply from "./Reply";
import { useContext } from 'react';
import { QuestionContext } from './QuestionContext'

const CustomDiv = styled.div`
    display: flex;
    flex-direction: row;
    background: #ECECEC;
    width: 100%;
    align-items: center;
`;

const CustomUnorderedList = styled.ul`
   margin-left: 0px; 
   padding-left: 0;
   list-style-type:none;
`;


function Replies({ totalReplies, listOfReplies }) {

    const { question, setQuestion } = useContext(QuestionContext)

    const nest = (items, id = null) =>
        items.filter(item => item.parent_id === id)
            .map(item => ({ ...item, children: nest(items, item.id) }));

    const comments = question.comments;

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