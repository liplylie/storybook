
import React, { Component } from 'react'

import { addNavigationHelpers } from 'react-navigation'
import { HomeNavigator } from '../navigationConfig'
import { Image } from 'react-native'
import { connect } from 'react-redux'

class HomeNav extends Component {
  static navigationOptions = {
    tabBarLabel: '',
    tabBarIcon: () => (
      <Image 
      source={require('../../../home_icon.png')}
      style={{width:30, height:30}}>
      </Image>
    )
  }

  render() {
    const { homeState, dispatch } = this.props
    return (
      <HomeNavigator
        navigation={
          addNavigationHelpers({
            dispatch: dispatch,
            state: homeState
          })
        }
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
   homeState: state.Home
   }
 }

export default connect(mapStateToProps)(HomeNav)