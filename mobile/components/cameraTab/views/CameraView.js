import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Button, Image } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as CameraActions from '../../../actions/cameraActions';

class CameraView extends Component {
  constructor(props) {
    super(props);
    this.addPicture = this.addPicture.bind(this)
    this.takePicture = this.takePicture.bind(this)
  }
  addPicture(){
    ImagePicker.openPicker({
      width: 640,
      height: 480,
      cropping: true,
      includeBase64: true,
    })
      .then(image => {
        this.props.actions.saveImage(image);
        this.props.navigation.navigate('Post');
      })
      .catch(err => {
        console.log('image picker error: ', err);
      })
  }

  takePicture(){
    ImagePicker.openCamera({
      width: 640,
      height: 480,
      cropping: true,
      includeBase64: true
    })
      .then(image => {
        this.props.actions.saveImage(image)
        this.props.navigation.navigate('Post');
      })
      .catch(err => {
        console.log('capture picker error: ', err);
      })
  }

  render() {
    const { actions, navigation } = this.props;    

    return (
      <View style ={styles.container}>
        <View style={styles.addPicture}>
          <Button
            title="click to add picture"
            onPress={() => {
             this.addPicture()
            }}
          />
          <TouchableOpacity
            title="click to add picture"
            onPress={() => {
              this.addPicture()
            }}
          >
            <Image 
              source={require('../../../addpicture.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.takePicture}>
          <Button
            title="click to take picture"
            onPress={() => {
              this.takePicture()
            }}
          />
          <TouchableOpacity 
              onPress={() => {
                this.takePicture()
              }}>
            <Image 
              source={require('../../../camera.png')}
            />
          </TouchableOpacity>
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