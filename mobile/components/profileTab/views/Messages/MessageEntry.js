import React, { Component } from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'

class MessageEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // name: '',
      // img: ''
    }
  }
  componentDidMount() {
    // axios.get('api/friend/' + this.props.friendId)
    // .then(({ data }) => {
    //   this.setState({
    //     name: data.name, 
    //     img: data.profile_image_url
    //   })
    // })
    // .catch(err => {
    //   console.log('Unable to get friend info', err);
    // })
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <TouchableWithoutFeedback onPress={()=> navigate('Chat')}>
        <Text>{this.props.name}</Text>
        <Text>{this.props.message}</Text>
        <Image source={this.props.img}/>
      </TouchableWithoutFeedback> 
    )
  }
}