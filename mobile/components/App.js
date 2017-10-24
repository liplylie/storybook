import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, Image, StyleSheet } from 'react-native'
import { bindActionCreators } from 'redux'

import TabBarNav from './tabBar/views/TabBarNav'
import Login from './auth/login.js'
import * as AuthActions from '../actions/authActions.js'

class App extends Component {
  constructor(props) {
    super(props); 
  }

  componentDidMount() {
    const { actions, authorized } = this.props;

    if(!authorized) {
      actions.getFBToken();
    }
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
          {authorizing ? <Text>Loading</Text> :<Login />}
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
  }
}

const appDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(AuthActions, dispatch),
  }
}

export default connect(appState, appDispatch)(App); 

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