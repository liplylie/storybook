import React, { Component } from 'react'
import { Image }  from 'react-native'
import { addNavigationHelpers } from 'react-navigation'
// import FontAwesome, { Icons } from 'react-native-fontawesome';
import { CameraNavigator } from '../navigationConfig'

import { connect } from 'react-redux'

class CameraNav extends Component {
  static navigationOptions = {
    tabBarIcon: '',
    tabBarIcon: () => (
      <Image 
      source={require('../../../camera.png')}
      style={{width:30, height:30}}>
      </Image>
    )
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