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
    console.log('input to chat', this.state.input);
    return ( 
      <View>
        <TextInput
          onChangeText={(text) => this.setState({input: text})}
          /* onSubmitEditing={this.props.handleSubmit(this.state.input)} */
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