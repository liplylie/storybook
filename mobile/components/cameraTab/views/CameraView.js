import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableHighlight, Button, Image } from 'react-native';
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
      <View style ={styles.container}>
        <View style={styles.addPicture}>
          <Button
            title="click to add picture"
            onPress={() => {
              ImagePicker.openPicker({
                width: 1350,
                height: 1080,
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
          <TouchableHighlight
            title="click to add picture"
            onPress={() => {
              ImagePicker.openPicker({
                width: 1350,
                height: 1080,
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
          >
            <Image 
              source={require('../../../addpicture.png')}
            />
          </TouchableHighlight>
        </View>
        <View style={styles.takePicture}>
          <Button
            title="click to take picture"
            onPress={() => {
              ImagePicker.openCamera({
                width: 1350,
                height: 1080,
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
          <TouchableHighlight 
              onPress={() => {
              ImagePicker.openCamera({
                width: 1350,
                height: 1080,
                cropping: true
              })
                .then(image => {
                  navigation.navigate('Post');
                })
                .catch(err => {
                  console.log('capture picker error: ', err);
                })
            }}>
            <Image 
              source={require('../../../camera.png')}
            />
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  addPicture:{
    flex:1,
    backgroundColor: 'skyblue',
    justifyContent: 'center', 
    alignItems: 'center'
  },
  takePicture:{
    flex:1,
    backgroundColor: 'white',
    justifyContent: 'center', 
    alignItems: 'center'
  }
})

const cameraDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(CameraActions, dispatch),
  }
}

export default connect(null, cameraDispatch)(CameraView);