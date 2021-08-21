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
`;


function VotedTagContainer() {
    return (
        <div>
            <TagContainer>
                <Tag clickedOrNot={true} />
                <Tag clickedOrNot={false} />
            </TagContainer>
        </div>
    )
}

export default VotedTagContainer
