import React, { Component } from 'react';
import { View, Text, Button, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'

import axios from 'axios'

import MessageEntry from './MessageEntry'
import { SearchBar, List, ListItem } from 'react-native-elements'

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

  searchFriends() {
    this.setState({
      results: this.props.friends.filter(friend => {
        if (friend.name.includes(this.state.input)) {
          return friend;
        }
      })
    })
    console.log('new chat search results', this.state.results);
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
            onChangeText={(text) => {
              if (text === '') {
                this.setState({results: []})
              }
              this.setState({input: text});
            }}
            onSubmitEditing={() => this.searchFriends()}
            clearIcon={	{ color: '#86939e', name: 'clear' } }
          /> 
          <List>
          {this.state.results.map((result) => {
            return (
              <ListItem 
                roundAvatar
                avatar={{uri: result.img}}
                title={result.name}
                onPress={() => {
                this.createRoom(result.id);
                this.props.actions.enterRoom(this.state.chatroom);
                navigate('Chat');
              }}>
              </ListItem>
            )
          })}
          </List> 
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
        <Text>No results</Text> 
      </View> 
      )
    }
  }
}

const mapStateToProps = (store) => {
  return {
    rooms: store.Chat.rooms,
    friends: store.Chat.friends,
   }
 }

const chatDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(chatActions, dispatch) 
  }
}

export default connect(mapStateToProps, chatActions)(NewChat);