import React, {useState} from 'react'
import styled from 'styled-components'
import {ViewMilestonesButton} from './ViewMilestonesButton'

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const TitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const MilestonesTitle = styled.h1`

`

const Spacer = styled.div`
    width: 100%;
    height: 1px;
    background-color: var(--grey-3);
    margin-top: 5px;
`



export const Milestones = () => {
    const [milestonesHidden, setMilestonesHidden] = useState(false)


    return (
        <HeaderContainer>
            <TitleContainer>
                <MilestonesTitle>
                    Milestones
                </MilestonesTitle>
                <ViewMilestonesButton 
                    onClick={()=>setMilestonesHidden(!milestonesHidden)} 
                    milestonesHidden={milestonesHidden} />
            </TitleContainer>
            <Spacer />
        </HeaderContainer>
    )
}
