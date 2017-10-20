import { StackNavigator } from 'react-navigation'
import Profile from './views/Profile'
import Friends from './views/Friends'
import Messages from './views/Messages'
<<<<<<< HEAD
import Chat from './views/Chat'
=======
import UserMap from './views/map.js'
import PicturesFromMarker from './views/picturesFromMarker'
>>>>>>> clicking on marker renders a new page

const routeConfig = {
  Profile: { screen: Profile},
  Friends: { screen: Friends },
  Messages: { screen: Messages },
<<<<<<< HEAD
  Chat: { screen: Chat },
=======
  UserMap: { screen: UserMap },
  PicturesFromMarker: { screen: PicturesFromMarker}
>>>>>>> clicking on marker renders a new page
}
// going to disable the header for now
const stackNavigatorConfig = {
  headerMode: 'none',
  initialRouteName: 'Profile'
}
export const ProfileNavigator = StackNavigator(routeConfig,stackNavigatorConfig)