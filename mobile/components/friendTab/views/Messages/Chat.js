// import React, { Component } from 'react'
// import axios from 'axios' 
// import { View, Button, Text } from 'react-native'
// import { Icon } from 'react-native-elements'
// import { GiftedChat } from 'react-native-gifted-chat'
// import { connect } from 'react-redux'

// import io from 'socket.io-client'

// import MessageInput from './MessageInput'
// import ChatBubble from './ChatBubble'


// class Chat extends Component { 
//   static navigationOptions = ({ navigation }) => ({
//     title: `Chat with`,
//     headerLeft: <Icon name='chevron-left' type='MaterialIcons' onPress={() => navigation.navigate('Messages')} />  
//   });

//   constructor(props) {
//     super(props);
//     this.state = { 
//       messages: [{message: "hello", sender: "angie", roomId: "1"}, {message: "hello", sender: "daniel", roomId: "1"}],
//     }
//     this.socket = io('http://localhost:3000')
//   }
  
//   componentDidMount() {
//     // this.socket.emit('subscription', this.props.roomId.toString());
//     // this.socket.emit('subscription', '1');
//     this.socket.on(this.props.room.toString(), message => {
//       this.setState({messages: this.state.messages.concat(message)})
//     }); 
    
//   }

//   componentWillUnmount() {
//     this.socket.disconnect;
//   }

//   onSend(messages) {
//     let message = {
//       message: input,
//       sender: 'angie',
//       roomId: '1'
//     }
//     this.socket.emit('message', message);
//     this.setState({messages: this.state.messages.concat(message)});
//   }

//   render () {
//     const {navigate} = this.props.navigation;
//     console.log(this.state.messages);
//     return (
//       <GiftedChat
//         messages={this.state.messages}
//         user={{
//           id: 1, 
//           name: "Angie"
//         }}
//         /* {this.state.messages.map(message => {
//           return  ( 
//             <Text>{message.sender}:{message.message}</Text> 
//           )
//         })} */
//         /* <MessageInput handleSubmit={this.handleSubmit.bind(this)}/>  */
//       ></GiftedChat>
//     )
//   }
// }


// export default connect(chatStore)(Chat);

import { GiftedChat } from 'react-native-gifted-chat';
import React, { Component } from 'react'

class Chat extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      messages: [],
    };
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={(messages) => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    );
  }

}


const chatStore = (store) => {
  return {
    room: store.Chat.currentRoom,
  }
}


export default Chat;