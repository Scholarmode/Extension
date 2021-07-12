
import Arrow from '@material-ui/icons/Forward';
import styled from 'styled-components';

const SidebarBackground = styled.div`
    width:50px;
    height:100px;
    margin-top: auto;
    background: #DADADA;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const UpArrow = styled.div`
    transform: rotate(90deg);
`
const DownArrow = styled.div`
    transform: rotate(-90deg);
`

export const Sidebar = (props) => {
    return (
        <SidebarBackground>
            <UpArrow>
                <Arrow />
            </UpArrow>
            <DownArrow>
                <Arrow />
            </DownArrow>
        </SidebarBackground>
    )
}
