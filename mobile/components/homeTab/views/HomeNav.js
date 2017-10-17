'use strict'
import { StackNavigator } from 'react-navigation'
// Screens
import Home from './Views/Home'
import Collection from './views/Collection'
import Book from './views/Book'

const routeConfiguration = {
  Home: { screen: Home },
  Collection: { screen: Collection },
  Book: { screen: Book },
}
// going to disable the header for now
const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: 'Home'
}
export const HomeNav = StackNavigator(routeConfiguration,stackNavigatorConfiguration)