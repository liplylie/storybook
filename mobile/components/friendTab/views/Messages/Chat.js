import React, { Component } from 'react'
import { View, Button, Text, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'

import { NavigationActions } from 'react-navigation'

import axios from 'axios' 
import io from 'socket.io-client'

import key from '../../../../../sensitive.json'

import { GiftedChat } from 'react-native-gifted-chat';

const styles = StyleSheet.create({
	headerRight: {
    paddingRight: 5, 
	}
})

const backAction = NavigationActions.back({
  key: 'id-1509577519747-12'
}) 

class Chat extends Component {
  static navigationOptions = ({ navigation }) => ({
  title: `Chat with ${navigation.state.params.friend}`,
  headerLeft: <Icon name='chevron-left' type='MaterialIcons' onPress={() => navigation.goBack()} />  
  });
  

  constructor(props) {
    super(props); 
    this.state = {
      messages: [],
    };
  }
  
  componentDidMount() {
    // this.socket.emit('subscribe', this.props.room.toString());
    // this.socket.emit('subscribe', '1');
    // this.socket.on(this.props.room.toString(), message => {
      //   this.setState({messages: this.state.messages.concat(message)})
      // }); 

    axios.get(key.flask_server + '/api/get_convo?userId=' + this.props.screenProps) 
      .then(({ data }) => {
        this.setState({messages: data})
      })
      .catch(err => {
        console.log('error getting chat', err);
      })

    this.socket = io('http://localhost:3000') 
      // roomId is just whatever you pass down to use as the room
      // query: `roomId=${roomId}`

    // this.socket.on('message', (message) => {
    //   this.setState({messages: this.state.messages.concat(message)})
    // })

    this.socket.on('1', message => {
      this.setState({messages: this.state.messages.concat(message)})
    }); 


  }

  componentWillUnmount() {
    this.socket.disconnect;
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 4,
          text: 'Please',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
        {
          _id: 3,
          text: 'Please talk to me',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
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
        {
          _id: 2,
          text: 'Hi',
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

  onSend(message) {
      // Any additional custom parameters are passed through
    this.socket.emit('message', message);
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, message),
    }));
  }

  render() {
    console.log('this is the chat key', this.props.navigation.state.key);
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={(input) => this.onSend(input)}
        user={{
          _id: 1,
          name: "angie",
          roomId: '1'
          //id:this.screenProps
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


export default connect(chatStore)(Chat);

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