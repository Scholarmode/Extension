import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { CollapsibleMilestone } from './CollapsibleMilestone'
import {ViewMilestonesButton} from './ViewMilestonesButton'
import { ReactComponent as GreyMilestone } from '../../assets/Milestone_Icon14px_grey.svg'


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
    margin-bottom: 10px;
`

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${props => (props.hover ? 'var(--grey-1)' : 'var(--white)')};
    border: 1px solid var(--grey-2);
    padding: 5px;
`

const InputTitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const Input = styled.input`
    font-size: 14px;
    padding: 5px;
    outline: none;
    border: none;
    font-weight: 600;
    width: 100%;
    &::placeholder {
        color: var(--grey-4);
    }
`

const InputCharLimit = styled.p`
    text-align: end;
    margin-top: 3px;
`



export const Milestones = ({ milestoneList, setMilestoneList }) => {
    const [inputValue, setInputValue] = useState('')
    const [milestonesHidden, setMilestonesHidden] = useState(false)

    useEffect(() => {
        // update database when milestones are added, deleted, renamed or reordered
    }, [milestoneList])

    const addMilestoneInViewport = (event) => {
        if(event.key === 'Enter' && event.target.value){
            setMilestoneList([...milestoneList, {
                'title': event.target.value,
                'completed':false,
                "current_video":0,
                'videos':[]
            }])
            event.target.value = null;
            setInputValue('')
            console.log(milestoneList)
        }
    }
    


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
            {milestoneList.map(milestone => (
                <>
                    <CollapsibleMilestone 
                        milestoneTitle={milestone.title}
                        completed={milestone.completed}
                        videosArray={milestone.videos} 
                        currentVideo={milestone.current_video} /> 
                </>
            ))}
            <InputContainer>
                <InputTitleContainer>
                    <GreyMilestone 
                        style={{
                            margin: 5, 
                            minWidth: 20, 
                            maxWidth: 20 }} />
                    <Input 
                        placeholder='+ ADD MILESTONE' 
                        maxLength='48'
                        onChange={(event)=>setInputValue(event.target.value)}
                        onKeyPress={(event)=>addMilestoneInViewport(event)} />
                    <InputCharLimit>
                        {inputValue.length}/48
                    </InputCharLimit>
                </InputTitleContainer>
            </InputContainer>
        </HeaderContainer>
    )
}
