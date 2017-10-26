import React, { Component } from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'

class MessageEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      img: ''
    }
  }
  componentDidMount() {
    axios.get('api/friend/' + this.props.friendId)
    .then(({ data }) => {
      this.setState({
        name: data.name, 
        img: data.profile_image_url
      })
    })
    .catch(err => {
      console.log('Unable to get friend info', err);
    })
  }

  showChat() {

  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.showChat.bind(this)}>

      </TouchableWithoutFeedback> 
    )
  }
}