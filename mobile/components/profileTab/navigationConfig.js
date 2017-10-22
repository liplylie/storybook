import { StackNavigator } from 'react-navigation'
import Profile from './views/Profile'
import Friends from './views/Friends'
import Messages from './views/Messages'
import Chat from './views/Chat'
import UserMap from './views/map.js'
import PicturesFromMarker from './views/picturesFromMarker'

const routeConfig = {
  Profile: { screen: Profile},
  Friends: { screen: Friends },
  Messages: { screen: Messages },
  Chat: { screen: Chat },
  UserMap: { screen: UserMap },
  PicturesFromMarker: { screen: PicturesFromMarker}
}
// going to disable the header for now
const stackNavigatorConfig = {
  headerMode: 'none',
  initialRouteName: 'Profile'
}
export const ProfileNavigator = StackNavigator(routeConfig,stackNavigatorConfig)