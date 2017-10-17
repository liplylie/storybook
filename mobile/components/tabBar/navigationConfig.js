import { TabNavigator } from 'react-navigation'

import HomeNav from '../homeTab/views/HomeNav'
import CameraNav from '../cameraTab/views/CameraNav'
import ProfileNav from '../profileTab/views/ProfileNav'

const routeConfig = {
  HomeNav: { screen: HomeNav },
  CameraNav: { screen: CameraNav },
  ProfileNav: { screen: ProfileNav },
}

const tabBarConfig = {
  initialRouteName: 'Home', 
  tabBarOptions: {
  // tint color is passed to text and icons (if enabled) on the tab bar
    activeTintColor: 'white',
    inactiveTintColor: 'blue',
  // background color is for the tab component
    activeBackgroundColor: 'blue',
    inactiveBackgroundColor: 'white',
  }
}

export const TabBarNavigator = TabNavigator(routeConfig,tabBarConfig)