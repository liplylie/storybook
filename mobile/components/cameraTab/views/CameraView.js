import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableHighlight, Button } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as CameraActions from '../../../actions/cameraActions';

class CameraView extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { actions, navigation } = this.props;    

    return (
      <View>
        <Button
          title="click to add picture"
          onPress={() => {
            ImagePicker.openPicker({
              width: 720,
              height: 1280,
              cropping: true,
              includeBase64: true,
            })
              .then(image => {
                actions.saveImage(image);
                navigation.navigate('Post');
              })
              .catch(err => {
                console.log('image picker error: ', err);
              })
          }}
        />
        <Button
          title="click to take picture"
          onPress={() => {
            ImagePicker.openCamera({
              width: 720,
              height: 1280,
              cropping: true
            })
              .then(image => {
                navigation.navigate('Post');
              })
              .catch(err => {
                console.log('capture picker error: ', err);
              })
          }}
        />
      </View>
    )
  }
}

const cameraDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(CameraActions, dispatch),
  }
}

export default connect(null, cameraDispatch)(CameraView);