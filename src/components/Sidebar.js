import { useContext, useState } from 'react';
import styled from 'styled-components';
import { QuestionContext } from './QuestionContext';
import ArrowDown from '@material-ui/icons/ArrowDropDown';
import ArrowUp from '@material-ui/icons/ArrowDropUp';


const SidebarBackground = styled.div`
    background: #DADADA;
    display: flex;
    flex-direction: column;
    flex:1;
    align-items: center;
    font-size: 14px;
    max-width: 30px;
`;


export const Sidebar = () => {

    const {question} =  useContext(QuestionContext)

    const [totalVotes, setTotalVotes] = useState(question.votes);
    const [clickable, setClickable] = useState(true);
    const [downClickable, setDownClickable] = useState(true);

    const updateVotes = () => {
        if (clickable) {
            if (downClickable) {
                setClickable(false)
                setTotalVotes((v) => v + 1)
            }
            else {
                setDownClickable(true)
                setClickable(false)
                setTotalVotes((v) => v + 2)
            }
        }
        else {
            setClickable(true)
            setTotalVotes((v) => v - 1)
        }
    }

    const updateDownVotes = () => {
        if (totalVotes > 0 && downClickable) {
            if (clickable) {
                setDownClickable(false)
                setTotalVotes((v) => v - 1)
            }
            else {
                setClickable(true)
                setDownClickable(false)
                setTotalVotes((v) => v - 2)
            }
        }
        else {
            setDownClickable(true)
            setTotalVotes((v) => v + 1)
        }
    }

    return (

        <SidebarBackground>
            {
                clickable ? 
                    <ArrowUp style={{ marginBottom: -10, width: 50, height: 50, color: '#909090' }} onClick={updateVotes} />
                    : 
                    <ArrowUp style={{ marginBottom: -10, width: 50, height: 50, color: '#3aa1f2', }} onClick={updateVotes} />
            }
                {totalVotes}
            {
                downClickable ? 
                    <ArrowDown style={{ marginTop: -10, width: 50, height: 50, color: '#909090' }} onClick={updateDownVotes} />
                    : 
                    <ArrowDown style={{ marginTop: -10, width: 50, height: 50, color: 'red' }} onClick={updateDownVotes} />
            }
        </SidebarBackground>
    )
}
