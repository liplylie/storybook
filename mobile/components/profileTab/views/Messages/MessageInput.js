import React, { Component } from 'react'
import ioClient from 'socket.io-client'
import { TextInput, Button, View } from 'react-native'

class MessageInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
    }

  this.socket = ioClient('http://localhost:3000')
  }



  render () {
    return ( 
      <View>
        <TextInput
          onChangeText={(text) => this.setState({input: text})}
          value={this.state.input}
          onSubmitEditing={this.props.handleSubmit(this.state.input)}
        /> 
        <Button 
          onPress={() => {this.props.handleSubmit(this.state.input)}}
          title="Send"
        />
      </View> 
    )
  }
}

export default MessageInput; 