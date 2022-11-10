import {Component} from 'react'
import { BrowserRouter,Route ,Switch,Redirect} from "react-router-dom" ;
import './App.css'

import AppTheme from './Components/context/Theme'
import Login from './Components/Login'
import Header from './Components/Header'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Trending from './Components/Trending'
import Gaming from './Components/Gaming'
import SavedVideos from './Components/SavedVideos'
import VideoCard from './Components/VideoCard'
import NotFound from './Components/NotFound'

class App extends Component {
  state = {activeTheme: 'light', savedVideos: []}

  changeTheme = activeTheme => {
    this.setState({activeTheme})
  }

  addSavedVideos = async data => {
    const {savedVideos} = this.state
    if (savedVideos.length > 0) {
      const checkSavedVideos = savedVideos.filter(item => item.id === data.id)
      if (checkSavedVideos.length === 0) {
        await this.setState({
          savedVideos: [...savedVideos, data],
        })
      }
    } else {
      await this.setState({
        savedVideos: [...savedVideos, data],
      })
    }
  }
  toggleDislikedVideo = (video) => {
    const { likedVideo, dislikedVideo } = this.state;
    if (dislikedVideo.find((item) => item.id === video.id)) {
      this.setState((prevState) => ({
        dislikedVideo: prevState.dislikedVideo.filter(
          (item) => item.id !== video.id
        ),
      }));
    } else {
      this.setState((prevState) => ({
        dislikedVideo: [...prevState.dislikedVideo, video],
      }));
      if (likedVideo.find((item) => item.id === video.id)) {
        this.setState((prevState) => ({
          likedVideo: prevState.likedVideo.filter(
            (item) => item.id !== video.id
          ),
        }));
      }
    }
  };
  toggleLikedVideo = (video) => {
    const { likedVideo, dislikedVideo } = this.state;
    if (likedVideo.find((item) => item.id === video.id)) {
      this.setState((prevState) => ({
        likedVideo: prevState.likedVideo.filter((item) => item.id !== video.id),
      }));
    } else {
      this.setState((prevState) => ({
        likedVideo: [...prevState.likedVideo, video],
      }));
      if (dislikedVideo.find((item) => item.id === video.id)) {
        this.setState((prevState) => ({
          dislikedVideo: prevState.dislikedVideo.filter(
            (item) => item.id !== video.id
          ),
        }));
      }
    }
  };
  toggleSavedVideo = (video) => {
    const { savedVideos } = this.state;
    if (savedVideos.find((item) => item.id === video.id)) {
      this.setState((prevState) => ({
        savedVideos: prevState.savedVideo.filter((item) => item.id !== video.id),
      }));
    } else {
      this.setState((prevState) => ({
        savedVideos: [...prevState.savedVideos, video],
      }));
    }
  };
  render() {
    const {activeTheme, savedVideos,likedVideo,dislikedVideo} = this.state
    const bgColor = activeTheme === 'light' ? 'light' : 'dark'

    return (
      <AppTheme.Provider
        value={{
          activeTheme,
          savedVideos,
          addSavedVideos: this.addSavedVideos,
          changeTheme: this.changeTheme,
          likedVideo,
          dislikedVideo,
          toggleDislikedVideo: this.toggleDislikedVideo,
          toggleLikedVideo: this.toggleLikedVideo,
          toggleDarkMode: this.toggleDarkMode,
          closeBanner: this.closeBanner,
          toggleSavedVideo: this.toggleSavedVideo,
        }}
      >
        <BrowserRouter>
          <div className="app-container">
            <Switch>
              <Route exact path="/login" component={Login} />
              <>
                <Header />
                <div className={`${bgColor} main-frame-container`}>
                  <Navbar />
                  <div className="content">
                    <Switch>
                      <Route exact path="/" component={Home} />
                      <Route exact path="/trending" component={Trending} />
                      <Route exact path="/gaming" component={Gaming} />
                      <Route
                        exact
                        path="/saved-videos"
                        component={SavedVideos}
                      />
                      <Route exact path="/videos/:id" component={VideoCard} />
                      <Route component={NotFound} />
                    </Switch>
                  </div>
                </div>
              </>
            </Switch>
          </div>
      </BrowserRouter>
      </AppTheme.Provider>
    )
  }
}

export default App
