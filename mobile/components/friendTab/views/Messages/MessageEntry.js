import React, { Component } from 'react'
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as chatActions from '../../../../actions/chatActions'

const MessageEntry = (props) => {
  const {navigate} = this.props.navigate;
  return (
    <View style={{backgroundColor: 'white'}}> 
      <TouchableWithoutFeedback onPress={() => {
        this.props.actions.enterRoom(this.props.roomId);
        navigate('Chat');
      }}>
        <Text>{this.props.friend}</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => {
        this.props.actions.enterRoom(this.props.roomId);
        navigate('Chat');
      }}>
        <Text>{this.props.message}</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => {
        this.props.actions.enterRoom(this.props.roomId);
        navigate('Chat');
      }}>
        <Image source={this.props.img}/>
      </TouchableWithoutFeedback> 
    </View>
  )
}

const chatDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(chatActions, dispatch),
  }
}

export default connect(null, chatDispatch)(MessageEntry);