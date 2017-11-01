import React, { Component } from 'react';
import { View, Text, Button } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import MessageEntry from './MessageEntry'
import { SearchBar, Icon } from 'react-native-elements'

import * as chatActions from '../../../../actions/chatActions'

class Messages extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Messages`,
    headerRight: <Icon name='new-message' type='entypo' onPress={() => navigation.navigate('NewChat')} />  
  });


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
        {/* <Button title="Go back" onPress={() => navigate('Friends')} />   */}
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

