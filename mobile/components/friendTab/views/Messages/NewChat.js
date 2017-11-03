import React, { Component } from 'react';
import { View, Text, Button, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { SearchBar, List, ListItem, Icon } from 'react-native-elements'

import { connect } from 'react-redux'

import axios from 'axios'

import * as chatActions from '../../../../actions/chatActions'

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20
  }, 
  component:{ 
    backgroundColor: 'white'
  }
})

class NewChat extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `New Message`, 
    headerLeft: <Icon name='chevron-left' type='MaterialIcons' onPress={() => navigation.goBack()}/>  
  });

  constructor(props) {
    super(props);
    this.state = {
      results: [],
      input: '',
      room: ''
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
  }

  createRoom(friendId) {
    this.props.rooms.map(room => {
      if (room.recipient_id === friendId) {
        this.setState({room: room.id})
      } else {
        axios.post('', {
          userId: this.props.screenProps, 
          friendId: friendId
        })
        .then(({ data }) => {
          this.setState({room: data.id})
        })
        .catch(err => {
          console.log('error creating room', err)
        })
      }
    })
  }

  render() {
    console.log('this is the newchat key', this.props.navigation.state.key)
    const {navigate} = this.props.navigation;
    if (this.state.results.length) {
      return (
        <View>
          <SearchBar 
            lightTheme
            round
            placeholder="Search"
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
                avatar={{uri: result.profile_image_url}}
                title={result.name}
                onPress={() => {
                // this.createRoom(result.id);
                // this.props.actions.enterRoom(this.state.room);
                // this.props.enterRoom(1);
                navigate('Chat', { friend: result.name});
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
          lightTheme
          round
          placeholder="Search friends"
          onChangeText={(text) => this.setState({input: text})}
          onSubmitEditing={() => this.searchFriends()}
        />
        <Text style={styles.text}>No results</Text> 
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