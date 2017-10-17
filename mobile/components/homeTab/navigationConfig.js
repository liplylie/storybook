'use strict'
import { StackNavigator } from 'react-navigation'
// Screens
import Home from './views/Home'
import Collection from './views/Collection'
import Book from './views/Book'

const routeConfig = {
  Home: { screen: Home },
  Collection: { screen: Collection },
  Book: { screen: Book },
}
// going to disable the header for now
const stackNavigatorConfig = {
  headerMode: 'none',
  initialRouteName: 'Home'
}
export const HomeNavigator = StackNavigator(routeConfig,stackNavigatorConfig)