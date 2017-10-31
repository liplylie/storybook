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
      results: [],
      input: ''
    }
  } 

  componentDidMount() {
    // this.props.actions.getRooms(this.screenProps);
    this.props.actions.getRooms(1);
    
  }

  searchMessages(input) {
    this.setState({
      results: this.props.rooms.filter(room => {
        if (room.sender.name.includes(input) || room.recipient.name.includes(input)) {
          return room; 
        }
      })
    })
  }


  render() {
    let friend = '';
    let img = '';
    const {navigate} = this.props.navigation;
    //if results.length use this.state.results
    return (
      <View>
        <SearchBar 
          placeholder="Search messages"
          onChangeText={(text) => this.setState({input: text})}
          onSubmitEditing={() => this.searchMessages()}
        /> 
        <Button title="Go back" onPress={() => navigate('Friends')} /> 
        <Button title="New chat" onPress={() => navigate('NewChat')} /> 
        {this.props.rooms.map((room) => {
          if (room.chatroom_sender !== this.screenProps) {
            friend = room.sender.name; 
            // img = room.sender.img;
          } else {
            friend = room.recipient.name; 
            // img = room.sender.img;
          }
          //get most current message
          axios.get('' + room.id)
          .then(({ data }) => { 
            return (
              this.state.rooms.map(room => {
                return (
                  <MessageEntry 
                    navigation={this.props.navigation} 
                    roomId={room.id} 
                    message={data} 
                    friend={friend} 
                    img={img}
                  /> 
                )
              })
            )
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
    rooms: store.Chat.rooms
   }
 }

 const chatDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(chatActions, dispatch),
  }
}

export default connect(mapStateToProps, chatDispatch)(Messages);

