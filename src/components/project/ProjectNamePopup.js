import React from 'react'
import styled from 'styled-components'

export const NamePopupContainer = styled.div`
    display: flex;
    background-color:var(--white);
    box-shadow: 0 0 0 100vmax rgba(0, 0, 0, .5);
    position: fixed;
    flex-direction: column;
    padding: 40px;
    left: 38%;
    top: 35%;
    width: 280px;
    padding-bottom: 25px;
`

export const PopupTitle = styled.h1`
    font-size: 24px;
    padding-bottom: 10px;
    letter-spacing: -0.5px;
`

export const PopupDescription = styled.p`
    color: var(--grey-4);
    font-size: 14px;
    padding-bottom: 30px;
`

export const PopupInput = styled.input`
    border: none;
    border-bottom: solid var(--grey-2);
    outline: none;
    height: 20px;
    padding-left: 10px;
    font-weight: bold;

    ::placeholder{
        color: var(--grey-4);
        font-weight: bold;
    }

    &:focus{
        outline: none;
        border-bottom: solid var(--grey-2);
    }
`

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-top: 30px;
`

export const PopupButtonPrimary = styled.button`
    background-color: var(--dark-red);
    border-radius: 3px;
    padding: 7px 30px;
    font-weight: 500;
    font-size: 11px;
    color: var(--white);
    border: none;
    cursor: pointer;
`

export const PopupButtonSecondary = styled.p`
    font-size: 12px;
    color: var(--grey-4);
    font-weight: bold;
    cursor: pointer;
    padding-left: 30px;
`


export const ProjectNamePopup = ({ setPopup, setProject }) => {

    return (
        <div>
            <NamePopupContainer>
                <PopupTitle>
                    Name your project
                </PopupTitle>
                <PopupDescription>
                    Projects consist of a goal, milestones, and a 
                    roadmap to achieve it.
                </PopupDescription>
                <PopupInput 
                    placeholder='🎁 Quick Sketch'
                    maxLength='24'
                    onChange={(event)=>setProject(event.target.value)}
                    />
                <ButtonContainer>
                    <PopupButtonPrimary onClick={()=>setPopup('projectGoal')}>
                        NEXT
                    </PopupButtonPrimary>
                    <PopupButtonSecondary onClick={()=>setPopup(false)}>
                        Cancel
                    </PopupButtonSecondary>
                </ButtonContainer>
            </NamePopupContainer>
        </div>
    )
}
