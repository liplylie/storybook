import { StackNavigator } from 'react-navigation'
import Profile from './views/Profile'
import Friends from './views/Friends/Friends'
import Messages from './views/Messages/Messages'
import Chat from './views/Messages/Chat'
import UserMap from './views/map.js'
import PicturesFromMarker from './views/picturesFromMarker'
import FriendRequests from './views/Friends/FriendRequests'
import NewChat from './views/Messages/NewChat'
//import FriendProfile from './views/Friends/FriendProfile'

const routeConfig = {
  Profile: { screen: Profile},
  Friends: { screen: Friends },
  Messages: { screen: Messages },
  Chat: { screen: Chat },
  UserMap: { screen: UserMap },
  PicturesFromMarker: { screen: PicturesFromMarker },
  //ARView: {screen: ARView},
  NewChat: { screen: NewChat },
  FriendRequests: { screen: FriendRequests }
  //FriendProfile: { screen: FriendProfile }
}
// going to disable the header for now
const stackNavigatorConfig = {
  initialRouteName: 'Profile'
}
export const ProfileNavigator = StackNavigator(routeConfig,stackNavigatorConfig)