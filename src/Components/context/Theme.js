import React from 'react'

const AppTheme = React.createContext({
  activeTheme: 'light',
  savedVideos: [],
  addSavedVideos: () => {},
  onChangeTheme: () => {},
  toggleSavedVideo: () => {},
  likedVideo: [],
  toggleLikedVideo: () => {},
  dislikedVideo: [],
  toggleDislikedVideo: () => {},
})

export default AppTheme
