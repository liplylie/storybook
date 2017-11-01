import { StackNavigator } from 'react-navigation'
import Friends from './views/Friends/Friends'
//import FriendProfile from './views/Friends/FriendProfile'
import Messages from './views/Messages/Messages'
import Chat from './views/Messages/Chat'
import NewChat from './views/Messages/NewChat'

const routeConfig = {
  Friends: { screen: Friends },
  //FriendProfile:{ screen: FriendProfile }
  Messages: { screen: Messages },
  Chat: { screen: Chat },
  NewChat: { screen: NewChat },
}

const stackNavigatorConfig = {
  initialRouteName: 'Friends',
}

export const FriendNavigator = StackNavigator(routeConfig,stackNavigatorConfig)