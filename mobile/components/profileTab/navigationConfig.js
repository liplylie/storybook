import { StackNavigator } from 'react-navigation'
import Profile from './views/Profile'
import UserMap from './views/map.js'
import PicturesFromMarker from './views/picturesFromMarker'
import FriendRequests from './views/FriendRequests'
//import NewChat from './views/Messages/NewChat'
import ARView from '../homeTab/views/AR'
//import FriendProfile from './views/Friends/FriendProfile'

const routeConfig = {
  Profile: { screen: Profile},
  UserMap: { screen: UserMap },
  PicturesFromMarker: { screen: PicturesFromMarker },
  ARView: {screen: ARView},
  //NewChat: { screen: NewChat },
  FriendRequests: { screen: FriendRequests }
}

const stackNavigatorConfig = {
  initialRouteName: 'Profile',
}
export const ProfileNavigator = StackNavigator(routeConfig,stackNavigatorConfig)