import { StackNavigator } from 'react-navigation'

import Profile from './views/Profile'
import Friends from './views/Friends'
import Messages from './views/Messages'

const routeConfig = {
  Profile: { screen: Profile },
  Friends: { screen: Friends },
  Messages: { screen: Messages },
}
// going to disable the header for now
const stackNavigatorConfig = {
  headerMode: 'none',
  initialRouteName: 'Profile'
}
export const ProfileNavigator = StackNavigator(routeConfig,stackNavigatorConfig)