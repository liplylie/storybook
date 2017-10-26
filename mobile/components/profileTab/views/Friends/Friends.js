import React, { Component } from 'react';
import { View, Button } from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'

import SearchBar from 'react-native-elements'
import FriendsEntry from './FriendsEntry'

class Friends extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      friends: [], 
      results: [],
      input: ''
    }
  }
  
  searchFriends(firstName, lastName) {
    axios.get('api/search/' + firstName + '/' + lastName)
    .then(({ data }) => {
      this.setState({results: data})
    })
    .catch(err => {
      console.log('failed to search friends', err);
    })
  }

  sendRequest(friendId) {
    axios.post('/api/addFriend', {
      friendId: friendId,
      userId: this.props.userId,
      type: 'pending'
    })
    .then(({ data }) => {
      console.log('Success sending request', data);
    })
    .catch(err => {
      console.log('Request failed', err);
    })
  }

  componentDidMount() {
    axios.get('api/friends/' + this.props.userId)
    .then(({ data }) => {
    //   data.map(data => {
    //     if (data.user_id !== this.props.userId) {
    //       this.setState({ friends: this.state.friends.push(data.user_id)})
    //     }
    //     if (data.friend_id !== this.props.userId) {
    //       this.setState({ friends: this.state.friends.push(data.friend_id)})
    //     }
    //   })
    // })
      this.setState({friends: data}); 
    })
    .catch(err => {
      console.log('failed to retrieve friends', err);
    })
  }

  render() {
    const {navigate} = this.props.navigation; 
    if (this.state.results.length) {
      return (
        <View>
          <SearchBar
            placeholder="Search friends"
            onChangeText={(text) => {this.setState({input: text})}}
            onSubmitEditing={this.searchFriends(this.state.input.split(' ')[0], this.state.input.split(' ')[1])}
          /> 
          <Button
            onPress={() => navigate('Messages')}
            title="Messages"
          /> 
          {this.state.results.map(result => {
            <FriendsEntry sendRequest={this.sendRequest.bind(this)} friends={this.state.friends} id={result.id} img={result.profile_img_url} name={result.name} /> 
          })}
      </View> 
      )
    } else {
      return (
        <View>
          <SearchBar 
            searchFriends={this.searchFriends.bind(this)} 
            onChangeText={(text) => {this.setState({input: text})}}
            onSubmitEditing={this.searchFriends(this.state.input.split(' ')[0], this.state.input.split(' ')[1])}
          />
          <Button
            onPress={() => navigate('Messages')}
            title="Messages"
          /> 
          {this.state.friends.map(friend => {
            <FriendsEntry img={friend.profile_img_url} name={friend.name} /> 
          })} 
        </View> 
      )
    }
  }
}

const mapStateToProps = (store) => {
  return {
    userId: store.Auth.userId
   }
 }

export default connect(mapStateToProps)(Friends);