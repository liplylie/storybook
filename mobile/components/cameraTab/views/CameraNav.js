'use strict'
import { StackNavigator } from 'react-navigation'
// Screens
import Camera from './views/Camera'
import Post from './views/Post'
const routeConfiguration = {
  Camera: { screen: Camera },
  Post: { screen: Post },
}
// going to disable the header for now
const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: 'Camera'
}
export const CameraNav = StackNavigator(routeConfiguration,stackNavigatorConfiguration)