import { TabNavigator } from 'react-navigation'
import HomeNav from '../homeTab/views/HomeNav'
import CameraNav from '../cameraTab/views/CameraNav'
import ProfileNav from '../profileTab/views/ProfileNav'
import FriendNav from '../friendTab/views/FriendNav'

var routeConfig = {
  HomeNav: { screen: HomeNav },
  FriendNav: {screen: FriendNav },
  CameraNav: { screen: CameraNav },
  ProfileNav: { screen: ProfileNav },
}

var tabBarConfig = {
  initialRouteName: 'HomeNav', 
  tabBarOptions: {
    activeTintColor: 'white',
    inactiveTintColor: 'blue',
    activeBackgroundColor: 'skyblue',
    inactiveBackgroundColor: 'lavender',
    labelStyle: {
      fontSize: .001,
      padding: 5
    }
  }
}

export const TabBarNavigator = TabNavigator(routeConfig,tabBarConfig)