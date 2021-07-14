import { useState } from 'react'
import styled, { keyframes } from 'styled-components';
import { ReactComponent as WhiteHat } from '../assets/scholarHatWhite.svg';
import React from "react";


const activateBackground = keyframes`
    from{
        background: white;
    }
    to{
        background: #3aa1f2;
    }
`;

const deactivateBackground = keyframes`
    from{
        background: #3aa1f2;
    }
    to{
        background: white;
    }
`;

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

  &.active{
      animation: ${activateBackground} 0.2s ease-in-out forwards;
  }
  &.deactivate{
    animation: ${deactivateBackground} 0.2s ease-in-out forwards;
  }
`;

const activateCircle = keyframes`
    from{
        transform: translateX(0px);
    }
    to{
        transform: translateX(38px)
    }
`;

const deactivateCircle = keyframes`
    from{
        transform: translateX(38px);
    }
    to{
        transform: translateX(0px)
    }
`;

const ButtonCircle = styled.div`
  height: 27px;
  width: 27px;
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 2px;
  border-radius: 50%;

  &.active{
    animation: ${activateCircle} 0.2s ease-in forwards;
  }

  &.deactivate{
    animation: ${deactivateCircle} 0.2s ease-in forwards;
  }
`;


export default function ScholarModeButton() {

    const [active, setActive] = useState(false)


    return (
        <div className='scholarmode' onClick={() => setActive(!active)}>
            <ButtonBackground className={active ? "active" : "deactivate"}>
                <ButtonCircle className={active ? "active" : "deactivate"}>
                    <WhiteHat />
                </ButtonCircle>
            </ButtonBackground>
        </div>
    )

}