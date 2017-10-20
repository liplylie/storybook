import React, { Component } from 'react'
import ioClient from 'socket.io-client'
import { TextInput, Button } from 'react-native'

class MessageInput extends Component {
  constuctor(props) {
    super(props);
    this.state = {
      input: '',
      user: '',
      room: '', 
      createdAt: '',
    }
    this.socket = ioClient('')
  }

  handleSubmit() {
    socket.emit('message', {
      message: this.state.input,
      from: this.state.user,
      room: this.state.room,
      createdAt: this.state.createdAt
    });
  }

  render () {
    <View>
      <TextInput
        onChangeText={(text) => this.setState({input: text})}
        value={this.state.input}
        onSubmitEditing={this.handleSubmit.bind(this)}
      /> 
      <Button 
        onPress={this.handleSubmit.bind(this)}
      />
    </View> 
  }
}

export default MessageInput; 