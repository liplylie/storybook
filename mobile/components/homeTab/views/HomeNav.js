
import React, { Component } from 'react'

import { addNavigationHelpers } from 'react-navigation'
import { HomeNavigator } from '../navigationConfig'

import { connect } from 'react-redux'

class HomeNav extends Component {
  static navigationOptions = {
    tabBarIcon: ''
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