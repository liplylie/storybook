// 'use strict'
import { StackNavigator } from 'react-navigation'
// Screens
import Home from './views/Home'
import Collection from './views/Collection'
import Page from './views/Page.js'
import Book from './views/Book.js'
import FriendProfile from '../friendTab/views/Friends/FriendProfile'

const routeConfig = {
  Home: { screen: Home },
  Collection: { screen: Collection },
  Book: { screen: Book }, 
  Page: {screen: Page},
  FriendProfile: {screen: FriendProfile}
}
// going to disable the header for now
const stackNavigatorConfig = {
  initialRouteName: 'Home'
}
export const HomeNavigator = StackNavigator(routeConfig,stackNavigatorConfig)