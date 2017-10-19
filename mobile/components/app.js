import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'

import TabBarNav from './tabBar/views/TabBarNav'

class App extends Component {
  constructor(props) {
    super(props); 
  }


  render() {
    //if logging in, login page
    //if signing up, signup page
    //else return (
    //   <TabBarNav /> 
    // )

    return (
      <TabBarNav />
    )
  }
}

export default App; 
  