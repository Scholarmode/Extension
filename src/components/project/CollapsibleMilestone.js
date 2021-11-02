import React, {useState} from 'react'
import styled, {keyframes} from 'styled-components'
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
`

const Title = styled.h1`
    font-size: 14px;
    padding: 5px;
    padding-right: 20px;
    overflow-wrap: anywhere;
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

const MilestoneDetails = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 25px;
    margin-top: 5px;
`

const VideoListDetails = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 5px;
`


const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`

const ErrorMessage = styled.p`
    color: var(--red);
    animation: ${fadeOut} 1s ease-out forwards;
    animation-delay: 3s;
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

export const CollapsibleMilestone = ({ milestoneTitle, completed, videosArray, 
                                        currentVideo, setMilestoneList, 
                                        milestoneList, key }) => {
    // completed = checked (bool)
    const [checked, setChecked] = useState(completed)
    const [collapsed, setCollapsed] = useState(true)
    const [hover, setHover] = useState(false)
    const [title, setTitle] = useState(milestoneTitle)

    const [videos, setVideos] = useState(videosArray)
    // current = currentVideo = current_video in milestone
    const [current, setCurrent] = useState(currentVideo)
    const [videoExists, setVideoExists] = useState(false)


    const ToggleCollapsedMilestone = () => {
        setCollapsed(!collapsed)
    }
    const ToggleCheckedMilestone = () => {
        setChecked(!checked)
    }


    const getYoutubeThumbnail = (url) => {
        if(url===null){return ''}
        const segment = url.match('[\\?&]v=([^&#]*)');
        let video_id  = (segment === null) ? url : segment[1];
        const thumbnail = 'https://img.youtube.com/vi/' + video_id + '/maxresdefault.jpg';

        return thumbnail
    }

    const getAccountName = () => {

        let account_name = ''
        // the account_name node is in a nodeList that constantly changes
        // depending on how many video tags it has, we to find the first node 
        // with a pathname = channel
        for(let node of document.getElementsByClassName('yt-simple-endpoint style-scope yt-formatted-string')){
            if(node.pathname.split('/')[1] === 'channel'){
                account_name = node.textContent
                break
            }
        }


        if(account_name){
            return account_name
        }else{return ''}
    }

    const addVideoToMilestone = () => {
        const title = document.getElementsByClassName('style-scope ytd-video-primary-info-renderer')[6].textContent
        const account_name = getAccountName()
        const url = window.location.toString()
        const voted_tags = []
        
        // using a local variable because the
        // videoExists state rendered the video twice
        let newVideo = true
        
        for(let video of videos){
            if(video.url === url){
                newVideo = false
                setVideoExists(true)
            }
        }
        
        const thumbnail = getYoutubeThumbnail(url, "high")
        if(newVideo){
            setVideos([...videos, {
                'index':videos.length + 1,
                'title':title,
                'account_name':account_name,
                'thumbnail':thumbnail,
                'url':url,
                'voted_tags':voted_tags
            }]) 
            // ~ My attempt at updating the milestoneList 
            //   within react's state.. using StackO >> https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react
            // 
            // setMilestoneList(prevState => {
            //     let updatedMilestones = Object.assign({}, prevState);
            //     updatedMilestones[key].videos = [...videos, {
            //         'index':videos.length + 1,
            //         'title':title,
            //         'account_name':account_name,
            //         'thumbnail':thumbnail,
            //         'url':url,
            //         'voted_tags':voted_tags
            //     }]            
            //     return {updatedMilestones}     
            //   }) 
        }else{
        console.log(thumbnail)
        console.log(url)
        console.log(videos);
        console.log(milestoneList)
        }
    }

    return (
        <div>
            <MilestoneContainer checked={checked}
                onMouseOver={()=>setHover(true)}
                onMouseOut={()=>setHover(false)}>
                <HeaderContainer>
                    <TitleContainer>
                        {checked 
                            ? <CheckedMilestone 
                                onClick={ToggleCheckedMilestone} 
                                style={{
                                    margin: 5, 
                                    minWidth: 20, 
                                    maxWidth: 20 }} /> 
                            : <Milestone 
                                onClick={ToggleCheckedMilestone} 
                                style={{
                                    margin: 5, 
                                    minWidth: 20, 
                                    maxWidth: 20 }} />
                        }
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
                    <MilestoneDetails>
                        <VideoListDetails>
                            <AddVideo onClick={addVideoToMilestone}/>
                            <MilestoneProgress>
                                {currentVideo > 0 
                                    ? currentVideo + '/' + videos.length
                                    : null
                                }     
                            </MilestoneProgress>
                        </VideoListDetails>
                        {videoExists
                            ? 
                            <ErrorMessage>This video is already listed</ErrorMessage>
                            : null
                        }
                    </MilestoneDetails>
                }
            </MilestoneContainer>
            <VideoContainer visible={!collapsed}>
                {videos.map(video => (
                    <>
                        <VideoListItem 
                            videoTitle={video.title}
                            videoIndex={video.index}
                            videoAccountName={video.account_name}
                            videoTags={video.voted_tags}
                            // videoUrl={video.url}
                            thumbnail={video.thumbnail}
                            currentVideo={current}
                            />
                    </> 
                ))}
            </VideoContainer>
        </div>
    )
}
