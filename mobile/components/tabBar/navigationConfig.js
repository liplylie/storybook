import { TabNavigator } from 'react-navigation'
import HomeNav from '../homeTab/views/HomeNav'
import CameraNav from '../cameraTab/views/CameraNav'
import ProfileNav from '../profileTab/views/ProfileNav'

var routeConfig = {
  HomeNav: { screen: HomeNav },
  CameraNav: { screen: CameraNav },
  ProfileNav: { screen: ProfileNav },
}

var tabBarConfig = {
  initialRouteName: 'HomeNav', 
  tabBarOptions: {
  // tint color is passed to text and icons (if enabled) on the tab bar
    activeTintColor: 'white',
    inactiveTintColor: 'blue',
  // background color is for the tab component
    activeBackgroundColor: 'skyblue',
    inactiveBackgroundColor: 'lavender',
    labelStyle: {
      fontSize: .001,
      padding: 5
    }
  }
}
var TabBarNavigator = TabNavigator(routeConfig,tabBarConfig)


//export default TabBarNavigator
export default TabBarNavigator 