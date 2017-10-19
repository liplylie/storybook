import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, Image, StyleSheet } from 'react-native'

import TabBarNav from './tabBar/views/TabBarNav'
import Login from './auth/Login.js'

class App extends Component {
  constructor(props) {
    super(props); 
  }

  render() {
    const { authorized, authorizing } = this.props;

    if(!authorized) {
      return (
        <View style={styles.container}>
          <Image 
            style={styles.image}
            resizeMethod='resize'
            resizeMode='contain'
            source={require('../logo.jpg')} 
          />
          <Login />
        </View>
      )
    } else if(authorizing || loggingout) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      )
    } else {
      return (
        <TabBarNav />
      )
    }
  }
}

const appState = (state) => {
  return {
    authorized: state.Auth.authorized,
    authorizing: state.Auth.authorizing,
    loggingout: state.Auth.loggingOut
  }
}

export default connect(appState)(App); 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: 400,
    height: 200
  }
});