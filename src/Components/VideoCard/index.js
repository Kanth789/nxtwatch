import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'

import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {MdPlaylistAdd} from 'react-icons/md'

import {
  VideoFrameContainer,
  VideoContainer,
  ParaEl,
  AttributesContainer,
  ChannelContainer,
  ImageEl,
  ContentContainer,
  IconParas,
} from './styledComponents'
import AppTheme from '../context/Theme'

import './index.css'

class VideoCard extends Component {
  static contextType = AppTheme;
  
  state = {
    videoDetails: {},
    channelDataObj: {},
    liked: false, 
    disliked: false, 
    saveVideo: false
  }
  
  componentDidMount() {
    this.getData()
     const {videoDetails}=this.props;
    const context = this.context;
    const savedVideos = context.savedVideos;
    console.log(context)
    if(savedVideos.find(item=>item.id===videoDetails.id)){
      this.setState({saveVideo:true});
    }
    
   
  }

  componentWillUnmount() {
    this.mounted = false
    
  }

  getData = async () => {
    this.mounted = true
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const responseData = await response.json()
      const data = responseData.video_details
      const convertedData = {
        channel: data.channel,
        description: data.description,
        id: data.id,
        publishedAt: data.published_at,
        thumbnailUrl: data.thumbnail_url,
        title: data.title,
        videoUrl: data.video_url,
        viewCount: data.view_count,
      }
      const channelData = {
        name: data.channel.name,
        profileImageUrl: data.channel.profile_image_url,
        subscriberCount: data.channel.subscriber_count,
      }
      if (this.mounted) {
        await this.setState({
          videoDetails: convertedData,
          channelDataObj: channelData,
        })
      }
    }
  }

  isDisliked = () => {
    const { liked, disliked } = this.state;
    if (!disliked && liked) {
      this.setState({ liked: false, disliked: true });
    } else {
      this.setState((prevState) => ({ disliked: !prevState.disliked }));
    }
  }

  isLiked = () => {
    const { liked, disliked } = this.state;
    if (!liked && disliked) {
      this.setState({ liked: true, disliked: false });
    } else {
      this.setState((prevState) => ({ liked: !prevState.liked }));
    }
  }

  isSaved = async () => {
    this.setState((prevState) => ({ saveVideo: !prevState.saveVideo }));
  }

  render() {
    const {videoDetails, channelDataObj, liked, disliked, saved} = this.state
    const {videoUrl, title, viewCount, publishedAt, description} = videoDetails
    return (
      <AppTheme.Consumer>
        {values => {
          const{saveVideo} = this.state
          const {activeTheme, addSavedVideos,toggleSavedVideo ,toggleLikedVideo,toggleDislikedVideo} = values
          const bgColor = activeTheme === 'light' ? '#ffffff' : '#000000'
          const color = activeTheme === 'light' ? '#000000' : '#ffffff'

          
          const toggleSave = () => {
            toggleSavedVideo(videoDetails);
            this.isSaved();
          };
          const toggleLike = () => {
            toggleLikedVideo(videoDetails);
            this.isLiked();
          };
          const toggleDislike = () => {
            toggleDislikedVideo(videoDetails);
            this.isDisliked();
          };

          return (
            <VideoContainer bgColor={bgColor} color={color}>
              <VideoFrameContainer>
                <ReactPlayer url={videoUrl} controls className="react-player" />
                <ParaEl>
                  <b>{title}</b>
                </ParaEl>
              </VideoFrameContainer>
              <AttributesContainer>
                <ParaEl>
                  {viewCount} views . {publishedAt}
                </ParaEl>
                <ChannelContainer color={color}>
                  <IconParas
                    onClick={toggleLike}
                    iconColor={liked ? '#3b82f6' : color}
                  >
                    <AiOutlineLike size={20} /> Like
                  </IconParas>
                  <IconParas
                    onClick={toggleDislike}
                    iconColor={disliked ? '#3b82f6' : color}
                  >
                    <AiOutlineDislike size={20} /> Dislike
                  </IconParas>
                  <IconParas
                    onClick={toggleSave}
                    iconColor={saveVideo ? '#3b82f6' : color}
                  >
                    <MdPlaylistAdd size={20} /> {saveVideo ? 'Saved' : 'Save'}
                  </IconParas>
                </ChannelContainer>
              </AttributesContainer>
              <ChannelContainer>
                <ImageEl src={channelDataObj.profileImageUrl} />
                <ContentContainer>
                  <ParaEl>
                    <b>{channelDataObj.name}</b>
                  </ParaEl>
                  <ParaEl>{channelDataObj.subscriberCount}</ParaEl>
                </ContentContainer>
              </ChannelContainer>
              <ParaEl padding="30px">{description}</ParaEl>
            </VideoContainer>
          )
        }}
      </AppTheme.Consumer>
    )
  }
}

export default VideoCard
