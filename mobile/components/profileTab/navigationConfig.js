import { StackNavigator } from 'react-navigation'
import Profile from './views/Profile'
import Friends from './views/Friends/Friends'
import Messages from './views/Messages/Messages'
import Chat from './views/Messages/Chat'
import UserMap from './views/map.js'
import PicturesFromMarker from './views/picturesFromMarker'
//only uncommented ARView if it is installed
//import ARView from '../homeTab/views/AR.js'


const routeConfig = {
  Profile: { screen: Profile},
  Friends: { screen: Friends },
  Messages: { screen: Messages },
  Chat: { screen: Chat },
  UserMap: { screen: UserMap },
  PicturesFromMarker: { screen: PicturesFromMarker},
  //ARView: {screen: ARView},
}
// going to disable the header for now
const stackNavigatorConfig = {
  headerMode: 'none',
  initialRouteName: 'Profile'
}
export const ProfileNavigator = StackNavigator(routeConfig,stackNavigatorConfig)