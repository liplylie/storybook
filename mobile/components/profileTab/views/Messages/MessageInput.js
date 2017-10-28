import React, { Component } from 'react'
// import ioClient from 'socket.io-client'
import { TextInput, Button, View } from 'react-native'

class MessageInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
    }
  }

  render () {
    /* onSubmitEditing={this.props.handleSubmit(this.state.input)} */
    console.log('input to chat', this.state.input);
    return ( 
      <View>
        <TextInput
          onChangeText={(text) => this.setState({input: text})}
          value={this.state.input}
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