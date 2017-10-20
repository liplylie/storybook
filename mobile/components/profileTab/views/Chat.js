import React, { Component } from 'react'
import axios from 'axios' 

import io from 'socket.io-client'

import MessageInput from './MessageInput'


class Chat extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      room: '', 
      messages: [],
    }
    this.socket = io('')
  }
  
  componentDidMount() {
    this.socket.emit('subscription', this.state.room);
    this.socket.on('message', message => {
      this.setState({messages: this.state.messages.concat(message)})
    }); 
  }

  getAllMessages() {
    axios.get('/messages/' + this.state.room) 
  }

  


  render () {
    <View>
      <MessageInput /> 
    </View>
  }
}

export default Chat; 
