import React from 'react'
import styled, {keyframes, css} from 'styled-components'
import { useState } from 'react'
import Discussion from './discussion/Discussion'
import { Milestones } from './project/Milestones'
import { EmptyProject } from './project/EmptyProject'
import { GoalBlock, GoalBlockTitle } from './project/ProjectMilestonesPopup'
import { ProjectBlock, ProjectBlockTitle } from './project/ProjectGoalPopup'


const ViewportContainer = styled.div`
    width: auto;
    min-height: 700px;
    border: 1px solid var(--grey-2);
    border-radius: 5px;

`

const TabContainer = styled.div`
    display: flex;
    flex-direction: row;
    background-color: var(--grey-2);
`

const activateTab = keyframes`
    100%{
        background-color: #f9f9f9;
    }
`

const deactivateTab = keyframes`
    100%{
        background-color: null;
    }
`

const Tab = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    height: 30px;
    align-items: center;
    justify-content: center;
    cursor: ${props => (props.active ? 'auto' : 'pointer')};
    border-top-left-radius: ${props => (props.active ? "5px" : null)};
    border-top-right-radius: ${props => (props.active ? "5px" : null)};
    animation-name: ${props => (props.active ? activateTab : deactivateTab)};
    animation-fill-mode: forwards;
    animation-duration: 0.4s;
`

const TabTitle = styled.h1`
    font-size: 12px;
    cursor: inherit;
`

const DiscussionContainer = styled.div`
    margin: 10px;
`

const ProjectContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3%;
`




export const Viewport = () => {
    const [milestoneList, setMilestoneList] = useState([]
    // [
//         {
//             'title':'Learn how to draw a face',
//             'completed':false,
//             "current_video":1,
//             'videos':[
//                 {
//                 'index':1,
//                 'title':'HOW TO DRAW: FACE',
//                 'thumbnail':'',
//                 'account_name':'Lazy Arts',
//                 'url':'',
//                 'voted_tags':[
//                     {
//                         'title':'#quick',
//                         'votes':'7003'
//                     },
//                     {
//                         'title':'#informational',
//                         'votes':'2197'
//                     },
//                     {
//                         'title':'#mustwatch',
//                         'votes':'375'
//                     }]
//                 },
//                 {
//                 'index':2,
//                 'title':'MikeCwazowsky',
//                 'thumbnail':'',
//                 'account_name':'Cowabunga',
//                 'url':'',
//                 'voted_tags':[
//                     {
//                         'title':'#quick',
//                         'votes':'7003'
//                     },
//                     {
//                         'title':'#informational',
//                         'votes':'2197'
//                     },
//                     {
//                         'title':'#mustwatch',
//                         'votes':'375'
//                     }]
//                 },
//             ]
//         }, 
//         {
//             'title':'sketch something with greyled',
//             'completed':true,
//             "current_video":2,
//             'videos':[
//             {
//                 'index':1,
//                 'title':'HOW TO DRAW: FACE',
//                 'thumbnail':'src="https://i.ytimg.com/vi/q7S6WoTPNwo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDSgSZ31AnZl_Cbeh_l3tzCRDkoZA"',
//                 'account_name':'Lazy Arts',
//                 'url':'',
//                 'voted_tags':[
//                     {
//                         'title':'#quick',
//                         'votes':'7003'
//                     },
//                     {
//                         'title':'#informational',
//                         'votes':'2197'
//                     },
//                     {
//                         'title':'#mustwatch',
//                         'votes':'375'
//                     },
//                 ]
//                 },
//             {
//                 'index':2,
//                 'title':'How to Draw Heads - Diving into the thirds',
//                 'thumbnail':'src="https://i.ytimg.com/vi/RFFqxT_RxfE/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLC0DaqKbg7o8rJE3XgH0WFoPnn7ZQ"',
//                 'account_name':'Lazy Arts',
//                 'url':'',
//                 'voted_tags':[
//                     {
//                         'title':'#quick',
//                         'votes':'7003'
//                     },
//                     {
//                         'title':'#informational',
//                         'votes':'2197'
//                     },
//                     {
//                         'title':'#mustwatch',
//                         'votes':'375'
//                     },
//                 ]
//             },
//         ]
//     }
// ]
)
    const [popup, setPopup] = useState(false)
    const [project, setProject] = useState('')
    const [goal, setGoal] = useState('')
    const [activeTab, setActiveTab] = useState("projects")
    const [projectExists, setProjectExists] = useState(false)

    return (
        <div>
            <ViewportContainer>
                <TabContainer>
                    <Tab active={activeTab==="projects"} 
                        onClick={() => setActiveTab('projects')}>
                        <TabTitle>
                            Projects
                        </TabTitle>
                    </Tab>
                    <Tab active={activeTab==="questions"} 
                        onClick={() => setActiveTab('questions')}>
                        <TabTitle>
                            Questions
                        </TabTitle>
                    </Tab>
                    <Tab active={activeTab==="tests"} 
                        onClick={() => setActiveTab('tests')}>
                        <TabTitle>
                            Tests
                        </TabTitle>
                    </Tab>
                </TabContainer>

                {activeTab === "projects"
                    ? projectExists 
                        ? 
                        <ProjectContainer>
                            <ProjectBlock>
                                <ProjectBlockTitle>{project}</ProjectBlockTitle>
                            </ProjectBlock>
                            <GoalBlock>
                                <GoalBlockTitle>{goal}</GoalBlockTitle>
                            </GoalBlock>
                            <Milestones 
                                milestoneList={milestoneList}
                                setMilestoneList={setMilestoneList} />
                        </ProjectContainer>
                        :
                        <ProjectContainer>
                            <EmptyProject 
                                project={project}
                                setProject={setProject}
                                goal={goal}
                                setGoal={setGoal}
                                popup={popup}
                                setPopup={setPopup}

                                milestoneList={milestoneList}
                                setMilestoneList={setMilestoneList} 
                                setProjectExists={setProjectExists}/>
                        </ProjectContainer>
                    : 
                activeTab === "questions" 
                    ? 
                    <DiscussionContainer>
                        <Discussion />
                    </DiscussionContainer> : null
                }

            </ViewportContainer>
        </div>
    )
}
