import { AppRegistry } from 'react-native'
import React, { Component } from 'react'
import { Provider } from 'react-redux'

import store from '../store'

import App from './AppNav'

class Storybook extends Component {
  constructor(props) {
    super(props); 
  }

  render() {
    return (
      <Provider store={store}>
        <App /> 
      </Provider> 
    )
  }
}

AppRegistry.registerComponent('Storybook', () => Storybook); 