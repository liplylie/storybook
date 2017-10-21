import { StackNavigator } from 'react-navigation'

import Camera from './views/Camera'
import Post from './views/Post'

const routeConfig = {
  Camera: { screen: Camera },
  Post: { screen: Post },
}

const stackNavigatorConfig = {
  initialRouteName: 'Camera'
}

export const CameraNavigator = StackNavigator(routeConfig, stackNavigatorConfig)