import React, { Component } from 'react'
import { Image } from 'react-native'
import { addNavigationHelpers } from 'react-navigation'
import { ProfileNavigator } from '../navigationConfig'

import { connect } from 'react-redux'

class ProfileNav extends Component {
  static navigationOptions = {
    tabBarIcon: '',
    tabBarIcon: ({tintColor}) => (
      <Image 
      source={require('../../../image_icon.png')}
      style={{width:30, height:30, tintColor:'white'}}>
      </Image>
    )
  }

  render() {
    const { profileState, dispatch } = this.props
    return (
      <ProfileNavigator
        screenProps={this.props.userId}
        navigation={
          addNavigationHelpers({
            dispatch: dispatch,
            state: profileState
          })
        }
      />
    )
  }
}

const mapStateToProps = (store) => {
  return {
    profileState: store.Profile,
    userId: store.Auth.userId
  }
 }

export default connect(mapStateToProps)(ProfileNav)