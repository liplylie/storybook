import React from 'react'

import { addNavigationHelpers } from 'react-navigation'
import { CameraNavigator } from '../navigationConfig'

import { connect } from 'react-redux'

class CameraNav extends React.Component {
  static navigationOptions = {
    tabBarIcon: ''
  }
  
  render() {
    const { cameraState, dispatch } = this.props
    return (
      <CameraNavigator
        navigation={
          addNavigationHelpers({
            dispatch: dispatch,
            state: cameraState
          })
        }
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
   cameraState: state.Camera
   }
 }

export default connect(mapStateToProps)(CameraNav)