import React, { Component } from 'react'
import axios from 'axios' 
import { View, Button } from 'react-native'

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
    this.socket.emit('subscription', this.props.room);
    this.socket.on('message', message => {
      this.setState({messages: this.state.messages.concat(message)})
    }); 
  }

  render () {
    const {navigate} = this.props.navigation;
    <View>
      <Button 
        name="Back"
        onPress={() => navigate('Messages')}
      /> 
      <MessageInput /> 
      {this.state.messages.map(message => {
        <ChatBubble message={message.message} sender={message.sender}/> 
      })}
    </View>
  }
}

const chatState = (state) => {
  return {
    room: state.Chat.currentRoom,
  }
}

export default connect(chatState)(Chat);

