
import { ReactComponent as UpArrow } from '../assets/qVoteArrowDown.svg'
import styled from 'styled-components';

const sidebarBackground = styled.div`
    width:50px;
    height:100px;
    margin-top: auto;
    background: #DADADA;
`;

export const Sidebar = (props) => {
    return (
        <sidebarBackground>
            <UpArrow />
        </sidebarBackground>
    )
}
