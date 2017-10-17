import React from 'react'

import { addNavigationHelpers } from 'react-navigation'
import { ProfileNavigator } from '../navigationConfig'

import { connect } from 'react-redux'

class ProfileNav extends React.Component {
  static navigationOptions = {
    tabBarIcon: ''
  }

  render() {
    const { profileState, dispatch } = this.props
    return (
      <ProfileNavigator
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

const mapStateToProps = (state) => {
  return {
   profileState: state.Profile
   }
 }

export default connect(mapStateToProps)(ProfileNav)