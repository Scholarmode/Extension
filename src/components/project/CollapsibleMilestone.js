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

export const CollapsibleMilestone = ({ milestoneTitle, completed, videosArray, currentVideo }) => {
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

    // >> original post: https://stackoverflow.com/questions/18681788/how-to-get-a-youtube-thumbnail-from-a-youtube-iframe
    // quality options: low, medium, high, max | default is max. 
    const GetYoutubeThumbnail = (url, quality) => {
        if(url){
            let video_id, thumbnail, result;
            if(result === url.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/)){
                video_id = result.pop();
            }
            else if(result === url.match(/youtu.be\/(.{11})/))
            {
                video_id = result.pop();
            }
    
            if(video_id){
                if(typeof quality == "undefined"){
                    quality = 'high';
                }
            
                var quality_key = 'maxresdefault'; // Max quality
                if(quality === 'low'){
                    quality_key = 'sddefault';
                }else if(quality === 'medium'){
                    quality_key = 'mqdefault';
                } else if (quality === 'high') {
                    quality_key = 'hqdefault';
                }
    
                thumbnail = "http://img.youtube.com/vi/"+video_id+"/"+quality_key+".jpg";
                return thumbnail;
            }
        }
        return null;
    }

    const addVideoToMilestone = () => {
        const title = 'Ben Awad'
        const account_name = 'Benny boi'
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
        
        const thumbnail = GetYoutubeThumbnail(url, "high")
        if(newVideo){
            setVideos([...videos, {
                'index':videos.length + 1,
                'title':title,
                'account_name':account_name,
                'thumbnail':thumbnail,
                'url':url,
                'voted_tags':voted_tags
            }])  
        }else{
        console.log(thumbnail)
        console.log(url)
        console.log(videos);
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
                                style={{margin: 5}} /> 
                            : <Milestone 
                                onClick={ToggleCheckedMilestone} 
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
                            // thumbnail={video.thumbnail}
                            currentVideo={current}
                            />
                    </> 
                ))}
            </VideoContainer>
        </div>
    )
}
