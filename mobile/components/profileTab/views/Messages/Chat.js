import React, { Component } from 'react'
import axios from 'axios' 
import { View, Button, Text } from 'react-native'
import { connect } from 'react-redux'

import io from 'socket.io-client'

import MessageInput from './MessageInput'
import ChatBubble from './ChatBubble'


class Chat extends Component { 
  constructor(props) {
    super(props);
    this.state = { 
      messages: [{message: "hello", sender: "angie", roomId: "1"}, {message: "hello", sender: "daniel", roomId: "1"}],
    }
    this.socket = io('http://localhost:3000')
  }
  
  componentDidMount() {
    // this.socket.emit('subscription', this.props.roomId.toString());
    // this.socket.emit('subscription', '1');
    this.socket.on(this.props.roomId.toString(), message => {
      this.setState({messages: this.state.messages.concat(message)})
    }); 
    
  }

  componentWillUnmount() {
    this.socket.disconnect;
  }

  handleSubmit(input) {
    let message = {
      message: input,
      sender: 'angie',
      roomId: '1'
    }
    this.socket.emit('message', message);
    this.setState({messages: this.state.messages.concat(message)});
  }

  render () {
    const {navigate} = this.props.navigation;
    console.log(this.state.messages);
    return (
      <View>
        <Button 
          title="Back"
          onPress={() => {
            navigate('Messages'); 
          }}
        /> 
        <MessageInput handleSubmit={this.handleSubmit.bind(this)}/> 
        <Text>Messages</Text>
        {this.state.messages.map(message => {
          return  ( 
            <Text>{message.sender}:{message.message}</Text> 
          )
        })}
      </View>
    )
  }
}

const chatStore = (store) => {
  return {
    room: store.Chat.currentRoom,
  }
}

export default connect(chatStore)(Chat);

