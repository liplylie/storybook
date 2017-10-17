import React, { Component } from 'react'
import { Provider } from 'react-redux'

import store from '../store'
import App from './appNavigation'

class ReduxApp extends Component {
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

export default ReduxApp; 