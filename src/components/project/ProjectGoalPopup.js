import React from 'react'
import styled from 'styled-components'
import { NamePopupContainer, PopupTitle, 
        PopupDescription, PopupInput, ButtonContainer,
        PopupButtonPrimary, PopupButtonSecondary } from './ProjectNamePopup'
import { ReactComponent as Expand } from '../../assets/Expand_Icon.svg'


const GoalPopupContainer = styled(NamePopupContainer)`
    top: 30%;
`

export const ProjectBlock = styled.div`
    display: flex;
    flex-direction: row;
    width: fit-content;
    border: solid var(--grey-2);
    padding: 5px 10px;
    cursor: pointer;
    margin-bottom: 10px;
`

export const ProjectBlockTitle = styled.p`
    height: 20px;
    font-weight: bold;
    font-size: 14px;
`


export const ProjectGoalPopup = ({setPopup, project, setGoal}) => {
    return (
        <div>
            <GoalPopupContainer>
                <ProjectBlock onClick={()=>setPopup('projectName')}>
                    <ProjectBlockTitle>
                        {project}
                    </ProjectBlockTitle>
                    <Expand style={{ width:10, marginLeft: 6, marginRight: 5 }}/>
                </ProjectBlock>
                <PopupTitle>
                    Choose your Goal
                </PopupTitle>
                <PopupDescription>
                    Try picking something concrete, like <strong><i>‘draw a character in 15 minutes’. </i></strong> 
                     We find goals that focus on a end-product work best. 
                </PopupDescription>
                <PopupInput 
                    placeholder='🎯 To sketch a portrait in 5 minutes'
                    maxLength='48' 
                    onChange={(event)=>setGoal(event.target.value)}
                    />
                <ButtonContainer>
                    <PopupButtonPrimary onClick={()=>setPopup('projectMilestones')}>
                        NEXT
                    </PopupButtonPrimary>
                    <PopupButtonSecondary onClick={()=>setPopup(false)}>
                        Cancel
                    </PopupButtonSecondary>
                </ButtonContainer>
            </GoalPopupContainer>
        </div>
    )
}
