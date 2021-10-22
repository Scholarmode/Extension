import React, { useState } from 'react'
import styled from 'styled-components'
import { ReactComponent as OptionsIcon } from '../../assets/VideoOptions_Icon.svg'
import { ReactComponent as CurrentVideoIcon } from '../../assets/CurrentVideo_Icon.svg'
import { ReactComponent as DragIcon } from '../../assets/Drag_Icon.svg'


const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: ${props => (props.active ? 'var(--grey-1)' : 'var(--white)')};
    padding: 10px 0px 10px 0px;
    justify-content: space-between;
    border-left: 1px solid var(--grey-2);
    border-right: 1px solid var(--grey-2);;

    &:hover{

    }
`

const Index = styled.div`
    width: 24px;
    text-align: center;
    display: flex;
    justify-content: center;
`

const VideoDetails = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const Thumbnail = styled.div`
    width: 120px;
    height: 67px;
    background-color: var(--grey-3);

`

const VideoText = styled.div`
    padding: 0px 10px;
`

const VideoTitle = styled.h1`
    font-size: 12px;
    padding-bottom: 3px;
`

const AccountName = styled.p`
    color: var(--grey-4);
    padding-bottom: 3px;
`

const TagContainer = styled.div`
    display: flex;
    flex-direction: row;
`

const Tag = styled.p`
    display: inline;
    color: var(--highlight);
    padding-right: 3px;
`

const Options = styled.div`
    display: ${props => (props.visible ? 'flex' : 'none')};
`


export const VideoListItem = ({videoTitle, videoIndex, videoAccountName, videoTags, videoUrl, thumbnail, currentVideo}) => {
    const [index, setIndex] = useState(videoIndex)
    const [title, setTitle] = useState(videoTitle)
    const [accountName, setAccountName] = useState(videoAccountName)
    const [tags, setTags] = useState('#funny')
    const [hover, setHover] = useState(false)

    


    return (
        <div>
            <Container active={currentVideo === index || hover} 
                onMouseOver={()=>setHover(true)}
                onMouseOut={()=>setHover(false)}>
                <VideoDetails>
                    <Index>
                        {hover 
                            ? <DragIcon />
                        : currentVideo === index
                            ? <CurrentVideoIcon />
                            : '' + index
                        }
                    </Index>
                    <Thumbnail />
                    <VideoText>
                        <VideoTitle>
                            {title}
                        </VideoTitle>
                        <AccountName>
                            {accountName}
                        </AccountName>
                        <TagContainer>
                            {videoTags.map(tag => (
                                <>
                                    <Tag>
                                        {tag.title}
                                    </Tag>
                                </> 
                            ))}
                        </TagContainer>
                    </VideoText>
                </VideoDetails>
                <Options visible={hover}>
                    <OptionsIcon />
                </Options> 
            </Container>
            
        </div>
    )
}
