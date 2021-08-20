import React from 'react'
import styled from 'styled-components'

const TagContainer = styled.div `
    height: 86px;
    width: 174px;
    border: 1px solid #DADADA;
    box-sizing: border-box;
    border-radius: 6px 6px 0px 0px;
`


function VotedTagContainer() {
    return (
        <div>
            <TagContainer />
        </div>
    )
}

export default VotedTagContainer
