import React, { Component } from 'react'
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as chatActions from '../../../../actions/chatActions'

const MessageEntry = (props) => {
  const {navigate} = this.props.navigate;
  return (
    <TouchableWithoutFeedback onPress={() => {
      this.props.actions.enterRoom(this.props.roomId);
      navigate('Chat');
    }}>
      <Text>{this.props.friend}</Text>
      <Text>{this.props.message}</Text>
      <Image source={this.props.img}/>
    </TouchableWithoutFeedback> 
  )
}

// class MessageEntry extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: '',
//       img: ''
//     }
//   }
  // componentDidMount() {
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
  // }

//   render() {
//     const {navigate} = this.props.navigation;
//     return (
//       <View>
//         <TouchableWithoutFeedback 
//           onPress={() => {
            
//             navigate('Chat');
//           }}
//           >
//           <Text>{this.props.friend}</Text>
//         </TouchableWithoutFeedback> 
//         <Text>{this.props.message}</Text>
//         <Image source={this.props.img}/>
//       </View>
//     )
//   }
// }


const chatDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(chatActions, dispatch),
  }
}

export default connect(null, chatDispatch)(MessageEntry);