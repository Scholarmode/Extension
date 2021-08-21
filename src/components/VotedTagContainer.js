import React from 'react'
import styled from 'styled-components'
import Tag from './Tag';

const TagContainer = styled.div`
  height: 60px;
  width: 174px;
  border: 1px solid #dadada;
  box-sizing: border-box;
  border-radius: 6px 6px 0px 0px;
  position: relative;
  padding-bottom: 10px;
  margin-right: 10px;
  overflow: scroll;

  overflow-x: hidden;

    ::-webkit-scrollbar {
        width: 4px;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 8px 8px 8px 8px;
        background-color: darkgray;
        visibility: hidden;
    }

    :hover::-webkit-scrollbar-thumb {
        visibility: visible;
    }
`;


function VotedTagContainer() {
    return (
        <div>
            <TagContainer>
                <Tag clickedOrNot={true} voteName="Clever" />
                <Tag clickedOrNot={false} voteName="Awesome" />
            </TagContainer>
        </div>
    )
}

export default VotedTagContainer
