import React from 'react'
import styled from 'styled-components'
import { ReactComponent as Milestone } from '../../assets/Milestone_Icon14px.svg'
import {ArrowUp, ArrowDown} from '../discussion/QuestionFooter'


const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
`

const ButtonTitle = styled.h1`
    color: var(--grey-4);
    font-size: 14px;
    font-weight: 600;
    margin-left: 5px;
    margin-right: 10px;
`

const GreyDownArrow = styled(ArrowDown)`
    transform: scale(2);
    color: var(--grey-4);
`

const GreyUpArrow = styled(ArrowUp)`
    transform: scale(2);
    color: var(--grey-4);
`


export const ViewMilestonesButton = ({milestonesHidden}) => {
    


    return (
        <>
            {milestonesHidden ? (
                <Container>
                    <Milestone />
                    <ButtonTitle>VIEW ALL</ButtonTitle>
                    <GreyDownArrow />
                </Container>
                )
                : (
                <Container>
                    <Milestone />
                    <ButtonTitle>HIDE ALL</ButtonTitle>
                    <GreyUpArrow />
                </Container>
                )
        
            }
        </>
    )
}
