import React from 'react'
import styled from 'styled-components'


const Blob = styled.div`
    background: black;
    height: 400px;
    width: 200px;
    border-radius: 40px;
`

function Block() {
    return (
        <div>
            <Blob />
        </div>
    )
}

export default Block
