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
    &::placeholder {
        color: var(--grey-4);
    }
`



export const Milestones = () => {
    const [milestoneList, setMilestoneList] = useState([
                {
                    'title':'Learn how to draw a face',
                    'completed':false,
                    "current_video":1,
                    'videos':[
                        {
                        'index':1,
                        'title':'HOW TO DRAW: FACE',
                        'thumbnail':'',
                        'account_name':'Lazy Arts',
                        'url':'',
                        'voted_tags':[
                            {
                                'title':'#quick',
                                'votes':'7003'
                            },
                            {
                                'title':'#informational',
                                'votes':'2197'
                            },
                            {
                                'title':'#mustwatch',
                                'votes':'375'
                            }]
                        },
                        {
                        'index':2,
                        'title':'MikeCwazowsky',
                        'thumbnail':'',
                        'account_name':'Cowabunga',
                        'url':'',
                        'voted_tags':[
                            {
                                'title':'#quick',
                                'votes':'7003'
                            },
                            {
                                'title':'#informational',
                                'votes':'2197'
                            },
                            {
                                'title':'#mustwatch',
                                'votes':'375'
                            }]
                        },
                    ]
                }, 
                {
                    'title':'sketch something with greyled',
                    'completed':true,
                    "current_video":2,
                    'videos':[
                    {
                        'index':1,
                        'title':'HOW TO DRAW: FACE',
                        'thumbnail':'src="https://i.ytimg.com/vi/q7S6WoTPNwo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDSgSZ31AnZl_Cbeh_l3tzCRDkoZA"',
                        'account_name':'Lazy Arts',
                        'url':'',
                        'voted_tags':[
                            {
                                'title':'#quick',
                                'votes':'7003'
                            },
                            {
                                'title':'#informational',
                                'votes':'2197'
                            },
                            {
                                'title':'#mustwatch',
                                'votes':'375'
                            },
                        ]
                        },
                    {
                        'index':2,
                        'title':'How to Draw Heads - Diving into the thirds',
                        'thumbnail':'src="https://i.ytimg.com/vi/RFFqxT_RxfE/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLC0DaqKbg7o8rJE3XgH0WFoPnn7ZQ"',
                        'account_name':'Lazy Arts',
                        'url':'',
                        'voted_tags':[
                            {
                                'title':'#quick',
                                'votes':'7003'
                            },
                            {
                                'title':'#informational',
                                'votes':'2197'
                            },
                            {
                                'title':'#mustwatch',
                                'votes':'375'
                            },
                        ]
                    },
                ]
            }
        ]
    )

    const [milestonesHidden, setMilestonesHidden] = useState(false)

    useEffect(() => {
        // update database when milestones are added, deleted, renamed or reordered
    }, [milestoneList])

    const addMilestone = (event) => {
        if(event.key === 'Enter' && event.target.value){
            setMilestoneList([...milestoneList, {
                'title': event.target.value,
                'completed':false,
                "current_video":0,
                'videos':[]
            }])
            event.target.value = null;
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
                    <GreyMilestone style={{margin: 5}} />
                    <Input 
                        placeholder='+ ADD MILESTONE' 
                        onKeyPress={(event)=>addMilestone(event)} />
                </InputTitleContainer>
            </InputContainer>
        </HeaderContainer>
    )
}
