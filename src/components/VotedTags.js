/* global chrome */
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
// import {linkifyYouTubeURLs, host} from './Discussion'

const Tag = styled.div`
    width: 100px;
    height: 50px;
    background-color: black;
`

const VotedTags = () => {

    return (
        <div>
            <Tag />
        </div>
    )
}

export default VotedTags