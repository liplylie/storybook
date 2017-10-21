import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as CameraActions from '../../../actions/cameraActions';

class Post extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <TextInput />
        <TextInput />
        <TextInput />
        <Button
        title="Post" />
      </View>
    )
  }
}

const postState = (state) => {
  return {
    image: state.CameraPost.image,
  }
}

const postDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(CameraActions, dispatch),
  }
}

export default connect(postState, postDispatch)(Post);