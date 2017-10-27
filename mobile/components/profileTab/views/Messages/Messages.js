import React, { Component } from 'react';
import { View, Text } from 'react-native'
import { connect } from 'react-redux'


import SearchBar from 'react-native-elements'

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
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
    return (
      <View>
        <SearchBar /> 
        {this.state.rooms.forEach((room) => {
          const friend; 
          if (room.chatroom_sender !== this.props.userId) {
            friend = room.chatroom_sender; 
          } else {
            friend = room.chatroom_recepient; 
          }
          axios.get('/chats/' + room.id)
          .then(({ data }) => {
            <MessageEntry 
              navigation={this.props.navigation} 
              roomId={room.id} message={data.message} 
              friend={friend.User.name} 
              img={friend.User.img}/> 
          })
          .catch(err => {
            console.log('error getting previews', err);
          })
        })}
      </View> 
    )
  }
}

const mapStateToProps = (store) => {
  return {
    userId: store.Auth.userId
   }
 }

export default connect(mapStateToProps)(Messages);