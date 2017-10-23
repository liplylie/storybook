import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
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
    const { image, creds, actions } = this.props;
    const { name, description, tags } = this.state;

    return (
      <View>
        <TextInput 
          placeholder="Title"
          onChangeText={(text) => {
            console.log(text);
            this.setState({
              name: text,
            })
          }}
        />
        <TextInput
          placeholder="Description"
        />
        <TextInput
          placeholder="Tags"
        />
        <Button
          title="Post"
          onPress={() => {
            const postObj = {
              name,
              image: image,
              description,
              tags
            }
            actions.postImage(postObj, creds);
          }}
        />
      </View>
    )
  }
}

const postState = (state) => {
  return {
    image: state.CameraPost.image,
    creds: state.Auth.authCreds
  }
}

const postDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(CameraActions, dispatch),
  }
}

export default connect(postState, postDispatch)(Post);