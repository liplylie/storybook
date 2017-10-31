import React, { Component } from 'react';
import { View, Text, Button, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'

import axios from 'axios'

import MessageEntry from './MessageEntry'
import { SearchBar } from 'react-native-elements'

import * as chatActions from '../../../../actions/chatActions'

class NewChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      input: '',
      chatroom: ''
    }
  } 

  componentDidMount() {

  }

  searchFriends(input) {
    this.setState({
      results: this.props.friends.filter(friend => {
        if (friend.name.includes(input)) {
          return friend;
        }
      })
    })
  }

  createRoom(friendId) {
    this.props.rooms.map(room => {
      if (room.chatroom_sender === friendId || room.chatroom_recipient === friendId) {
        this.setState({chatroom: room.id})
      } else {
        axios.post('', {
          userId: this.screenProps, 
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
    const {navigate} = this.props.navigation;
    if (this.state.results.length) {
      return (
        <View>
          <SearchBar 
            placeholder="Search friends"
            onChangeText={(text) => this.setState({input: text})}
            onSubmitEditing={() => this.searchFriends()}
          /> 
          {this.props.results.map((result) => {
            return (
              <TouchableWithoutFeedback onPress={() => {
                createRoom(result.id);
                this.props.actions.enterRoom(this.state.chatroom);
                navigate('Chat');
              }}>
                <Text>{result.name}</Text> 
              </TouchableWithoutFeedback>
            )
          })}
        </View> 
      )
    } else {
      return (
        <View>
        <SearchBar 
          placeholder="Search friends"
          onChangeText={(text) => this.setState({input: text})}
          onSubmitEditing={() => this.searchFriends()}
        />
        <Text>No results yet</Text> 
      </View> 
      )
    }
  }
}

const mapStateToProps = (store) => {
  return {
    rooms: store.Chat.rooms,
    friends: store.Friends.friends,
   }
 }

const chatActions = (dispatch) => {
  return {
    actions: bindActionCreators(chatActions, dispatch) 
  }
}
export default connect(mapStateToProps, chatActions)(NewChat);