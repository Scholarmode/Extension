import React, {useState} from 'react'
import styled from 'styled-components'
import { ReactComponent as Milestone } from '../../assets/Milestone_Icon14px.svg'
import { ReactComponent as CheckedMilestone } from '../../assets/Milestone_Icon14px_checked.svg'
import { ReactComponent as Expand } from '../../assets/Expand_Icon.svg'
import { ReactComponent as Collapse } from '../../assets/Collapse_Icon.svg'
import { ReactComponent as AddVideo } from '../../assets/AddVideo_Icon.svg'
import { VideoListItem } from './VideoListItem'
import { ReactComponent as OptionsIcon } from '../../assets/MilestoneOptions_Icon.svg'


const MilestoneContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${props => (props.checked ? 'var(--grey-1)' : 'var(--white)')};
    color: ${props => (props.checked ? 'var(--grey-4)' : 'var(--black)')};
    border: 1px solid var(--grey-2);
    padding: 5px;
`

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const TitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    max-width: 40%;
`

const Title = styled.h1`
    font-size: 14px;
    padding: 5px;
`

const ExpandIconContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const Options = styled.div`
    display: ${props => (props.visible ? 'flex' : 'none')};
    padding-right: 10px;
`


const VideoListDetails = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 25px;
    margin-top: 5px;
    padding: 5px;
`

const MilestoneProgress = styled.p`
    color: var(--grey-4);
    padding-left: 10px;
    font-size: 12px;
`

const VideoContainer = styled.div`
    display: ${props => (props.visible ? 'flex' : 'none')};
    flex-direction: column;
`

export const CollapsibleMilestone = ({ milestoneTitle, completed, videosArray, currentVideo }) => {
    // completed = checked (bool)
    const [checked, setChecked] = useState(completed)
    const [collapsed, setCollapsed] = useState(true)
    const [hover, setHover] = useState(false)
    const [title, setTitle] = useState(milestoneTitle)
    const [videos, setVideos] = useState(videosArray)
    const [current, setCurrent] = useState(currentVideo)


    const ToggleCollapsedMilestone = () => {
        setCollapsed(!collapsed)
    }


    const ToggleCheckedMilestone = () => {
        setChecked(!checked)
    }

    return (
        <div>
            <MilestoneContainer checked={checked}
                onMouseOver={()=>setHover(true)}
                onMouseOut={()=>setHover(false)}>
                <HeaderContainer>
                    <TitleContainer>
                        {checked 
                            ? <CheckedMilestone onClick={ToggleCheckedMilestone} 
                                style={{margin: 5}}/> 
                            : <Milestone onClick={ToggleCheckedMilestone} 
                                style={{margin: 5}} />}
                        <Title>{title}</Title>
                    </TitleContainer>
                    <ExpandIconContainer>
                        <Options visible={hover}>
                            <OptionsIcon />
                        </Options>
                        {collapsed 
                            ? <Expand onClick={ToggleCollapsedMilestone} 
                                style={{margin: 5}} />
                            : <Collapse onClick={ToggleCollapsedMilestone} 
                                style={{margin: 5}} />
                        }
                    </ExpandIconContainer>
                </HeaderContainer>    
                {collapsed 
                    ? null
                    : 
                    <VideoListDetails>
                        <AddVideo />
                        <MilestoneProgress>{currentVideo+'/'+videosArray.length}</MilestoneProgress>
                    </VideoListDetails>
                }
            </MilestoneContainer>
            <VideoContainer visible={!collapsed}>
                {videosArray.map(video => (
                    <>
                        <VideoListItem 
                            videoTitle={video.title}
                            videoIndex={video.index}
                            videoAccountName={video.account_name}
                            videoTags={video.voted_tags}
                            // videoUrl={video.url}
                            // thumbnail={video.thumbnail}
                            currentVideo={current}
                            />
                    </> 
                ))}
            </VideoContainer>
        </div>
    )
}
