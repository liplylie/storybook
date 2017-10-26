import React, { Component } from 'react'
import ioClient from 'socket.io-client'
import { TextInput, Button } from 'react-native'

class MessageInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
    }

  this.socket = ioClient('')
  }

  handleSubmit() {
    this.socket.emit('message', {
      message: this.state.input,
      from: this.props.user,
      room: this.props.roomId,
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