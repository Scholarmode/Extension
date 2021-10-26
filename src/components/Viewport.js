import React from 'react'
import styled, {keyframes, css} from 'styled-components'
import { useState } from 'react'
import Discussion from './discussion/Discussion'
import { Milestones } from './project/Milestones'
import { EmptyProject } from './project/EmptyProject'

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
                            <Milestones />
                        </ProjectContainer>
                        :
                        <ProjectContainer>
                            <EmptyProject />
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
