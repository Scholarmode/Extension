/* global chrome */
import { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { ReactComponent as WhiteHat } from '../assets/scholarHatWhite.svg'
import React from 'react'
import { Mixpanel } from './Mixpanel'

const activateBackground = keyframes`
    from{
        background: white;
    }
    to{
        background: #ff0000;
    }
`

const deactivateBackground = keyframes`
    from{
        background: #ff0000;
    }
    to{
        background: white;
    }
`

const ButtonBackground = styled.div`
  background: white;
  height: 30px;
  width: 70px;
  border-radius: 40px;
  border: solid;
  border-width: 1px;
  border-color: black;
  display: flex;
  align-items: center;
  cursor:pointer;

  &.active {
    animation: ${activateBackground} 0.2s ease-in-out forwards;
  }
  &.deactivate {
    animation: ${deactivateBackground} 0.2s ease-in-out forwards;
  }
`

const activateCircle = keyframes`
    from{
        transform: translateX(0px);
    }
    to{
        transform: translateX(38px)
    }
`

const deactivateCircle = keyframes`
    from{
        transform: translateX(38px);
    }
    to{
        transform: translateX(0px)
    }
`

const ButtonCircle = styled.div`
  height: 27px;
  width: 27px;
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 2px;
  border-radius: 50%;

  &.active {
    animation: ${activateCircle} 0.2s ease-in forwards;
  }

  &.deactivate {
    animation: ${deactivateCircle} 0.2s ease-in forwards;
  }
`

const ToggleContainer = styled.div`
  margin-left: 8px;
`

export default function ScholarModeButton() {
  const [active, setActive] = useState(false)

  // useEffect(() => {
  //   chrome.storage.sync.get(['active'], (result) => {
  //     setActive(result.active)
  //   })
  // })

  return (
    <ToggleContainer
      className="scholarmode"
      onClick={() => {
        Mixpanel.track('ScholarMode toggled', {
          "active" : !active,
      })
        // active
        //   ? chrome.storage.sync.set({ active: false })
        //   : chrome.storage.sync.set({ active: true })
        setActive(!active)
      }}
    >
      <ButtonBackground className={active ? 'active' : 'deactivate'}>
        <ButtonCircle className={active ? 'active' : 'deactivate'}>
          <WhiteHat />
        </ButtonCircle>
      </ButtonBackground>
    </ToggleContainer>
  )
}
