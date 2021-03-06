import React, { Component } from 'react'
import { Image } from 'react-native'
import { addNavigationHelpers } from 'react-navigation'
import { FriendNavigator } from '../navigationConfig'

import { connect } from 'react-redux'

class FriendNav extends Component {
  static navigationOptions = {
    tabBarIcon: '',
    tabBarIcon: ({tintColor}) => (
      <Image 
      source={require('../../../friendIcon.png')}
      style={{width:30, height:30, tintColor:'white'}}>
      </Image>
    )
  }

  render() {
    const { friendState, dispatch, userId } = this.props
    return (
      <FriendNavigator
        screenProps={userId}
        navigation={
          addNavigationHelpers({
            dispatch: dispatch,
            state: friendState
          })
        }
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    friendState: state.Friends,
    userId: state.Auth.userId
  }
 }

export default connect(mapStateToProps)(FriendNav);