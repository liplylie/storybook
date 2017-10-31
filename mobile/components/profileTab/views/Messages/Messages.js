import React, { Component } from 'react';
import { View, Text, Button } from 'react-native'
import { connect } from 'react-redux'

import axios from 'axios'

import MessageEntry from './MessageEntry'
import { SearchBar } from 'react-native-elements'

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [{friend: "Jordan", id: "1", message: "hello", img: ""}],
      results: [],
    }
  } 

  componentDidMount() {
    axios.get('api/chats/' + this.props.userId)
    .then(({ data }) => {
      this.setState({rooms: data})
    })
  }

  render() {
    let friend = '';
    const {navigate} = this.props.navigation;
    return (
      <View>
        <SearchBar 
          placeholder="Search messages"
        /> 
        <Button title="Go back" onPress={() => navigate('Friends')} /> 
        {/* {this.state.rooms.forEach((room) => {
          if (room.chatroom_sender !== this.props.userId) {
            friend = room.chatroom_sender; 
          } else {
            friend = room.chatroom_recepient; 
          }
          axios.get('/chats/' + room.id)
          .then(({ data }) => { */}
            {/* return ( */}
              {this.state.rooms.map(room => {
                return (
                  <MessageEntry 
                    navigation={this.props.navigation} 
                    roomId={room.id} 
                    message={room.message} 
                    friend={room.friend} 
                    img={room.img}
                  /> 
                )
              })}
              {/* <MessageEntry 
                navigation={this.props.navigation} 
                roomId={room.id} message={data.message} 
                friend={friend.User.name} 
                img={friend.User.img}/>  */}
            {/* ) */}
          {/* })
          .catch(err => {
            console.log('error getting previews', err);
          })
        })} */}
      </View> 
    )
  }
}

const mapStateToProps = (store) => {
  return {
    userId: store.Auth.userId
   }
 }

export default connect(mapStateToProps, null)(Messages);