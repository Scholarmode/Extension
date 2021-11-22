import React, { useState } from 'react'
import styled from 'styled-components'
import { NamePopupContainer, PopupTitle, 
        PopupDescription, PopupInput, ButtonContainer,
        PopupButtonPrimary, PopupButtonSecondary } from './ProjectNamePopup'
import { ProjectBlock, ProjectBlockTitle} from './ProjectGoalPopup'
import { ReactComponent as Expand } from '../../assets/Expand_Icon.svg'
import { ReactComponent as MilestoneIcon } from '../../assets/Milestone_Icon14px.svg'





const MilestonePopupContainer = styled(NamePopupContainer)`
    top: calc(20%);
`

export const GoalBlock = styled(ProjectBlock)`
    background-color: var(--grey-1);
    border: none;
`

export const GoalBlockTitle = styled(ProjectBlockTitle)`
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
    margin-top: 15px;
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
    cursor: pointer;
`

const MilestoneBlockContainer = styled(ProjectBlock)`
    width: auto;
    align-items: center;
`

const MilestoneBlockTitle = styled(ProjectBlockTitle)`
    font-weight: 500;
    height: auto;
    overflow-wrap: anywhere;
`


export const ProjectMilestonesPopup = ({setPopup, project, goal, milestoneList, 
                                        setMilestoneList, setProjectExists }) => {
    const [inputValue, setInputValue] = useState('')

    const handleInputChange = (e) => {
        if(e.key === 'Enter'){
            setMilestoneList([...milestoneList, {
                'title': e.target.value,
                'completed':false,
                "current_video":0,
                'videos':[]
            }])
            e.target.value = ''
            setInputValue(e.target.value)
        }
    }

    return (
        <div style={{position:'absolute'}}>
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
                    {milestoneList.map(milestone => (
                        <>
                            <MilestoneBlockContainer>
                                <MilestoneIcon 
                                    style={{ 
                                        minWidth: 17, 
                                        maxWidth:17, 
                                        marginRight: 8 }} />
                                <MilestoneBlockTitle>
                                    {milestone.title}
                                </MilestoneBlockTitle>
                            </MilestoneBlockContainer>
                        </>
                    ))}
                    <MilestoneInput 
                        placeholder='Enter milestone...'
                        maxLength='48' 
                        onChange={(event)=>setInputValue(event.target.value)}
                        onKeyPress={(event)=>handleInputChange(event)}
                        />
                    <MilestoneInputCharLimit>
                        {inputValue.length}/48
                    </MilestoneInputCharLimit>
                    <MilestoneInputSubmit> 
                        CREATE
                    </MilestoneInputSubmit>
                </MilestoneInputContainer>
                <ButtonContainer>
                    <PopupButtonPrimary onClick={()=>setProjectExists(true)}>
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
