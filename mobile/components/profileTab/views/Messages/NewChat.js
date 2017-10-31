import React, { Component } from 'react';
import { View, Text, Button, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'

import axios from 'axios'

import MessageEntry from './MessageEntry'
import { SearchBar } from 'react-native-elements'

class NewChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      input: '',
      chatFriends: [],
      chatroom: ''
    }
  } 

  componentDidMount() {
    // axios.get('api/chats/' + this.props.userId)
    // .then(({ data }) => {
    //   this.setState({rooms: data})
    // })
  }

  searchFriends(input) {
    this.setState({
      chatFriends: this.props.friends.filter(friend => {
        if (friend.name.includes(input)) {
          return friend;
        }
      })
    })
  }

  createRoom(friendId) {
    this.props.rooms.forEach(room => {
      if (room.chatroom_sender === friendId || room.chatroom_recipient === friendId) {
        this.setState({chatroom: room.id})
      } else {
        axios.post('/chat', {
          userId: this.screenProps.userId, 
          friendId: friendId
        })
        .then(({ data }) => {
          this.setState({chatroom: data.id})
        })
        .catch(err => {
          console.log('error creating room', err)
        })
      }
    })
  }


  render() {
    console.log('friends list', this.props.friends);
    let friend = '';
    let img = '';
    const {navigate} = this.props.navigation;
    //if results.length use this.state.results
    return (
      <View>
        <SearchBar 
          placeholder="Search friends"
          onChangeText={(text) => this.setState({input: text})}
          onSubmitEditing={() => this.searchFriends()}
        /> 
        {this.props.currentFriends.map((friend) => {
          return (
            <TouchableWithoutFeedback onPress={() => {
              createRoom(friend.id);
              this.props.actions.enterRoom(this.state.chatroom);
              navigate('Chat');
            }}>
              <Text>{friend.name}</Text> 
            </TouchableWithoutFeedback>
          )
        })}
      </View> 
    )
  }
}

const mapStateToProps = (store) => {
  return {
    rooms: store.Chat.rooms,
    friends: store.Friends.friends,
   }
 }

export default connect(mapStateToProps, null)(NewChat);