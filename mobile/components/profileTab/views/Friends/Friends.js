import React, { Component } from 'react';
import { View, Button, TouchableWithoutFeedback, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import axios from 'axios'

import * as friendActions from '../../../../actions/friendActions'

import { SearchBar } from 'react-native-elements'


//import FriendProfile from './FriendProfile'

class Friends extends Component {
  constructor(props) {
    super(props); 
    // this.state = {
    //   friends: [{id: 1, img: "", name: "Angie"}, {id: 2, img: "", name: "Jordan"}  ], 
    //   results: [{id: 2, img: "", name: "Jeff"}, {id: 4, img: "", name: "Daniel"}],
    //   input: ''
    // }
    this.state = {
      results: [],
      input: ''
    }
  }

  componentDidMount() {
    // axios.get('api/friends/' + this.props.userId)
    // .then(({ data }) => {
    //   data.map(data => {
    //     if (data.user_id !== this.props.userId) {
    //       this.setState({ friends: this.state.friends.concat(data.user_id)})
    //     }
    //     if (data.friend_id !== this.props.userId) {
    //       this.setState({ friends: this.state.friends.concat(data.friend_id)})
    //     }
    //   })
    // })
    // .catch(err => {
    //   console.log('failed to retrieve friends', err);
    // })
    // console.log('userId', this.screenProps);
    // this.props.actions.getFriends(this.screenProps);
    this.props.actions.getFriends(1);
  }
  
  searchUsers(name) {
    // this.setState({
    //   results: this.props.friends.filter(friend => {
    //     if (friend.name.includes(name)) {
    //       return friend; 
    //     }
    //   })
    // });
    
  }

  sendRequest(friendId) {
    axios.post('http://localhost:5000/api/add_friend', {
      friendId: friendId,
      // userId: this.screenProps,
      userId: 1
    })
    .then(({ data }) => {
      console.log('Success sending request', data);
    })
    .catch(err => {
      console.log('Request failed', err);
    })
  }

  clearSearch() {
    this.setState({results: []});
  }

  render() {
    const {navigate} = this.props.navigation; 
    console.log('props passed to friends', this.props);
    if (this.state.results.length) {
      return (
        <View>
          <SearchBar
            placeholder="Search"
            onChangeText={(text) => {this.setState({input: text})}}
            onSubmitEditing={() => {
              this.searchFriends(this.state.input.split(' ')[0], this.state.input.split(' ')[1]);
            }}
            //add icon to clear searches
          /> 
          <Button
            onPress={() => navigate('Messages')}
            title="Go to messages"
          /> 
          <Button
            onPress={() => navigate('FriendRequests')}
            title="Go to friend requests"
          /> 
          <Button
            onPress={() => navigate('Profile')}
            title="Go back to profile"
          /> 
          {this.state.results.map(result => {
            for (let i = 0; i < this.props.friends.length; i++) {
              if (result.id === friends[i].id) {
                return (
                  <TouchableWithoutFeedback onPress={() => navgiate('FriendProfile', {userId: result.id, type: "friend"})}>
                    <Text>{result.name}</Text> 
                    <Image source={result.img} />
                  </TouchableWithoutFeedback>
                )
              } else {
                return (
                  <View>
                    <TouchableWithoutFeedback onPress={() => navgiate('FriendProfile', {userId: result.id, type: "result"})}>
                      <Text>{result.name}</Text> 
                      <Image source={result.img} />
                    </TouchableWithoutFeedback>
                    <Button
                      title="Add friend"
                      onPress={() => {this.sendRequest(result.id)}}
                    ></Button>
                  </View> 
                )
              }
            }
          })}
      </View> 
      )
    } else {
      return (
        <View>
          <SearchBar 
            placeholder="Search"
            onChangeText={(text) => {this.setState({input: text})}}
            onSubmitEditing={() => {
              this.searchUsers(this.state.input);
            }}
            //add icon to clear searches
          />
          <Button
            onPress={() => navigate('Messages')}
            title="Go to messages"
          /> 
          <Button
            onPress={() => navigate('FriendRequests')}
            title="Go to friend requests"
          /> 
          {this.props.friends.map(friend => {
            return (
              <TouchableWithoutFeedback onPress={() => navgiate('FriendProfile', {userId: friend.id, type: "friend"})}>
                  <View>
                    <Text>{friend.name}</Text>
                    <Image source={friend.profile_img_url}/> 
                  </View> 
              </TouchableWithoutFeedback>
            ) 
          })} 
        </View> 
      )
    }
  }
}

const mapStateToProps = (store) => {
  return {
    friends: store.Friends.friends
   }
 }

 const friendDispatch = (dispatch) => {
   return {
     actions: bindActionCreators(friendActions, dispatch),
   }
 }

export default connect(mapStateToProps, friendDispatch)(Friends);