import React, { Component } from 'react'
import axios from 'axios' 
import { View, Button } from 'react-native'
import { connect } from 'react-redux'

import io from 'socket.io-client'

import MessageInput from './MessageInput'

class Chat extends Component { 
  constructor(props) {
    super(props);
    this.state = { 
      messages: [],
    }
    this.socket = io('http://localhost:3000')
  }
  
  componentDidMount() {
    // this.socket.emit('subscription', this.props.room);
    // this.socket.on('message', message => {
    //   this.setState({messages: this.state.messages.concat(message)})
    // }); 
  }

  componentWillUnmount() {
    //disconnect from socket
  }

  handleSubmit(input) {
    this.socket.emit('message', {
      message: input,
      from: this.props.userId,
      room: this.props.roomId,
    });
  }

  render () {
    const {navigate} = this.props.navigation;
    return (
      <View>
        <Button 
          title="Back"
          onPress={() => {
            navigate('Messages'); 
          }}
        /> 
        <MessageInput handleSubmit={this.handleSubmit.bind(this)}/> 
        {this.state.messages.map(message => {
          <ChatBubble message={message.message} sender={message.sender}/> 
        })}
      </View>
    )
  }
}

const chatStore = (store) => {
  return {
    room: store.Chat.currentRoom,
    userId: store.Auth.userId
  }
}

export default connect(chatStore)(Chat);

