import React from 'react'
import styled from 'styled-components'
import { ProjectNamePopup, NamePopupContainer, PopupTitle, 
        PopupDescription, PopupInput, ButtonContainer,
        PopupButtonPrimary, PopupButtonSecondary } from './ProjectNamePopup'
import { ProjectBlock, ProjectBlockTitle} from './ProjectGoalPopup'
import { ReactComponent as Expand } from '../../assets/Expand_Icon.svg'




const MilestonePopupContainer = styled(NamePopupContainer)`

`

const GoalBlock = styled(ProjectBlock)`
    background-color: var(--grey-1);
    border: none;
`

const GoalBlockTitle = styled(ProjectBlockTitle)`
`

const HighlightContainer = styled.div`
    display: flex;
    flex-direction: row;
    background-color: var(--grey-05);
    padding: 15px;
`

const HighlightText = styled.p`
    color: var(--grey-4);
    font-size: 12px;
`

const HighlightIcon = styled.div`
    padding-right: 10px;
    padding-top: 2px;
`

const MilestoneInputContainer = styled.div`
    margin-top: 15px ;
`

const MilestoneInput = styled(PopupInput)`
    width: -webkit-fill-available;
    padding-left: 0px;
`

const MilestoneInputCharLimit = styled.p`
    text-align: end;
    margin-top: 3px;
`

const MilestoneInputSubmit = styled.div`
    color: var(--highlight);
    font-size: 14px;
    font-weight: 500;
    text-align: end;
    margin-top: 20px;
`



export const ProjectMilestonesPopup = ({setPopup, project, goal}) => {
    


    return (
        <div>
            <MilestonePopupContainer>
                <ProjectBlock onClick={()=>setPopup('projectName')}>
                    <ProjectBlockTitle>
                        {project}
                    </ProjectBlockTitle>
                    <Expand style={{ width:10, marginLeft: 6, marginRight: 5 }}/>
                </ProjectBlock>
                <GoalBlock onClick={()=>setPopup('projectGoal')}>
                    <GoalBlockTitle> 
                        {goal}
                    </GoalBlockTitle>
                </GoalBlock>
                <PopupTitle>
                    Define your Milestones
                </PopupTitle>
                <PopupDescription style={{ paddingBottom: 20 }}>
                    Each milestone is like an individual playlist of videos 
                    to reach the next step in your project. 
                </PopupDescription>
                <HighlightContainer>
                    <HighlightIcon>
                        💡
                    </HighlightIcon>
                    <HighlightText>
                    Pick a set of achievements to reach your goal. Don’t spend 
                    too much time here, you will be changing these all the time.
                    </HighlightText>
                </HighlightContainer>
                <MilestoneInputContainer>  
                    <MilestoneInput 
                        placeholder='Enter milestone...'
                        maxLength='48' 
                        />
                    <MilestoneInputCharLimit>
                        0/120
                    </MilestoneInputCharLimit>
                    <MilestoneInputSubmit>
                        CREATE
                    </MilestoneInputSubmit>
                </MilestoneInputContainer>
                <ButtonContainer>
                    <PopupButtonPrimary onClick={()=>setPopup('projectMilestones')}>
                        SUBMIT
                    </PopupButtonPrimary>
                    <PopupButtonSecondary onClick={()=>setPopup(false)}>
                        Cancel
                    </PopupButtonSecondary>
                </ButtonContainer>
            </MilestonePopupContainer>
        </div>
    )
}
