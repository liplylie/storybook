import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableHighlight } from 'react-native';

import CameraView from './CameraView.js';

class Camera extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    header: null,
  }

  render() {
    return (
      <CameraView navigation={this.props.navigation}/>
    )
  }
}

export default Camera;