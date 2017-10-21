import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableHighlight, Button } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

class CameraView extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <View>
        <Button
          title="click to add picture"
          onPress={() => {
            ImagePicker.openPicker({
              width: 720,
              height: 1280,
              cropping: true
            })
              .then(image => {
                console.log('image: ', image, image.path);
                this.props.navigation.navigate('Post');
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
                console.log('image: ', image, image.path);
                this.props.navigation.navigate('Post');
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

export default CameraView;