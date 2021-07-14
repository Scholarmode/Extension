import { useContext } from 'react';
import styled from 'styled-components';
import { QuestionContext } from './QuestionContext';
import ArrowDown from '@material-ui/icons/ArrowDropDown';
import ArrowUp from '@material-ui/icons/ArrowDropUp';

const SidebarBackground = styled.div`
    padding: 10px 10px 0px;
    height: 100%;
    background: #DADADA;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
`;

export const Sidebar = (props) => {

    const {question} =  useContext(QuestionContext)

    return (
        <SidebarBackground>
            <ArrowUp fontSize='large'/>
                {question.votes}
            <ArrowDown fontSize='large'/>
        </SidebarBackground>
    )
}
