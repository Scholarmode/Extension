import React,{ useState } from 'react'
import styled from 'styled-components'
import { ReactComponent as Roadmap } from '../../assets/Roadmap_Design.svg'
import { ProjectGoalPopup } from './ProjectGoalPopup'
import { ProjectMilestonesPopup } from './ProjectMilestonesPopup'
import { ProjectNamePopup } from './ProjectNamePopup'

const BrowserContainer = styled.div`    
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    /* background-color: rgba(0, 0, 0, 0.5); */
    top: 0;
    left: 0;
    height: 90%;
    width: 90%;
`

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    max-width: 250px;
    text-align: center;
    margin-top: 50px;
`

const Title = styled.h1`
    color: var(--grey-4);
    margin-bottom: 10px;
`

const Prompt = styled.p`
    font-weight: bold;
    font-size: 14px;
    color: var(--grey-3);
    margin-bottom: 20px;
    margin-top: 10px;
` 

const CreateProjectButton = styled.button`
    background-color: var(--dark-red);
    color: var(--white);
    border-radius: 3px;
    padding-left: 30px;
    padding-top: 8px;
    padding-right: 30px;
    padding-bottom: 8px;
    font-weight: bold;
    border: none;
    cursor: pointer;
`


export const EmptyProject = () => {
    const [popup, setPopup] = useState(false)
    const [project, setProject] = useState('')
    const [goal, setGoal] = useState('')

    const overlayDiv = document.createElement('div')
        overlayDiv.id = 'overlayDiv'
    document.body.appendChild(overlayDiv)


    return (
        <div>
            <Container>
                <Title>
                    Projects
                </Title>
                <Roadmap />
                <Prompt>
                    Looks like you don’t have a goal yet, let’s make one.
                </Prompt>
                <CreateProjectButton onClick={()=>setPopup('projectName')}>
                    CREATE
                </CreateProjectButton>
            </Container>
            {popup === 'projectName'
                ? 
                <ProjectNamePopup 
                    setPopup={setPopup} 
                    setProject={setProject} />

            :popup === 'projectGoal'
                ? 
                <ProjectGoalPopup
                    setPopup={setPopup}
                    project={project} 
                    setGoal={setGoal} />

            :popup === 'projectMilestones'
                ? 
                <ProjectMilestonesPopup
                    setPopup={setPopup} 
                    project={project} 
                    goal={goal}/>

            : null
            }
        </div>
    )
}
