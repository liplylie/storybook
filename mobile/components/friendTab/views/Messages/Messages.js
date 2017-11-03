import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native'
import { SearchBar, Icon, List, ListItem } from 'react-native-elements'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as chatActions from '../../../../actions/chatActions'

const styles = StyleSheet.create({
	headerRight: {
    paddingRight: 10, 
  }, 
  search: {
    marginTop:10
  },
  text: {
		fontSize: 20,
    textAlign: 'center',
    marginTop: 20
  }, 
  component: {
    backgroundColor: 'white'
  }
})

class Messages extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Messages`,
    headerRight: <Icon name='new-message' type='entypo' onPress={() => navigation.navigate('NewChat')} style={styles.headerRight}/>, 
    headerLeft: <Icon name='chevron-left' type='MaterialIcons' onPress={() => navigation.goBack()} />  
  });


  constructor(props) {
    super(props);
    this.state = {
      results: [],
      input: '',
    }
  } 

  componentDidMount() {
    // const { friends, actions, screenProps, rooms } = this.props; 
    // for (let i = 0; i < friends.length; i++) {
    //   actions.getPreview(screenProps, friends[i].id);
    //   rooms.map(room => {
    //     if (room.recipient_id === friends[i].id) {
    //       room[name] === friend.name;
    //       room[img] === friends.profile_image_url; 
    //     }
    //   })
    // }
  }

  searchMessages() {
    this.setState({
      results: this.props.rooms.filter(room => {
        if (room.name.includes(this.state.input)) {
          return room; 
        }
      })
    })
  }


  render() {
    // let friend = '';
    // let img = '';
    const {navigate} = this.props.navigation;
    console.log('this is the messages key', this.props.navigation.state.key);
    if (this.state.results.length) {
      return ( 
        <View> 
          <SearchBar 
          lightTheme
          round
          placeholder="Search messages"
          onChangeText={(text) => {
            if (text === '') {
              this.setState({results: []})
            }
            this.setState({input: text});
          }}
          onSubmitEditing={() => this.searchMessages()}
          clearIcon={	{ color: '#86939e', name: 'clear' } }
        /> 
          <List>
          {this.state.results.map(result => {
            return (
              <ListItem 
                roundAvatar
                avatar={{uri: result.img}}
                title={result.name}
                subtitle={result.message}
                onPress={() => {
                // this.props.actions.enterRoom(this.state.chatroom);
                this.props.enterRoom(1);
                navigate('Chat', { friend: room.name});
              }}>
              </ListItem>
            )
          })}
          </List> 
        </View>
       )
    } else if (this.props.rooms.length) {
      return (
      <View>
        <SearchBar 
          lightTheme
          round
          placeholder="Search messages"
          onChangeText={(text) => {
            if (text === '') {
              this.setState({results: []})
            }
            this.setState({input: text});
          }}
          onSubmitEditing={() => this.searchMessages()}
          clearIcon={	{ color: '#86939e', name: 'clear' } }
        /> 
        {/* <Button title="Go back" onPress={() => navigate('Friends')} />   */}
        {/* {this.props.rooms.map((room) => {
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
            return ( */}
              <List>
              {this.props.rooms.map((room) => {
                return (
                  <ListItem 
                    roundAvatar
                    avatar={{uri: room.img}}
                    title={room.name}
                    subtitle={room.message}
                    onPress={() => {
                    // this.props.actions.enterRoom(this.state.chatroom);
                    // this.props.actions.enterRoom(1);
                    navigate('Chat', { friend: room.name});
                  }}>
                  </ListItem>
                )
              })}
              </List> 
            {/* )
          })
          .catch(err => {
            console.log('error getting previews', err);
          })
        })} */}
      </View> 
    )
  } else {
    return( 
      <View> 
      <Text style={styles.text}>No messages</Text> 
    </View> 
    )
  }
}
}

const mapStateToProps = (store) => {
  return {
    rooms: store.Chat.rooms,
    friends: store.Chat.friends
   }
 }

 const chatDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(chatActions, dispatch),
  }
}

export default connect(mapStateToProps, chatDispatch)(Messages);

