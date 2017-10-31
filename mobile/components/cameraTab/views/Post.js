import React, { Component } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as CameraActions from '../../../actions/cameraActions';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      tags: []
    }
  }

  render() {
    const { image, userId, actions, navigation, location } = this.props;
    const { name, description, tags } = this.state;
    let height = image.height
    let width = image.width

    return (
      <View>
        <Image source={{uri:image.path}} style={{height: height, width: width}}/>
        <TextInput 
          placeholder="Title"
          onChangeText={(text) => {
            this.setState({
              name: text,
            })
          }}
        />
        <TextInput
          placeholder="Description"
          onChangeText={(text) => {
            this.setState({
              description: text,
            })
          }}
        />
        {/* <TextInput
          placeholder="Tags"
        /> */}
        <Button
          title="Post"
          onPress={() => {
            const postObj = {
              name,
              image: image,
              description,
              userId,
              location
            }
            actions.postImage(postObj);
            navigation.navigate('Camera');
          }}
        />
      </View>
    )
  }
}

const postState = (state) => {
  return {
    image: state.CameraPost.image,
    userId: state.Auth.userId,
    location: state.Profile.userLocation
  }
}

const postDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(CameraActions, dispatch),
  }
}

export default connect(postState, postDispatch)(Post);