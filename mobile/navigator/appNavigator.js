import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'

class App extends Component {
  constructor(props) {
    super(props); 
  }
  
  render() {
    return (
      <View>
        <Text>Hello</Text> 
      </View> 
    )
  }
}