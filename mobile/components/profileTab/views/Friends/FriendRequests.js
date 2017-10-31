import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import axios from 'axios'

import Request from './Request'
//need function to delete request 

class FriendRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // requests: [{friend: "Daniel"}], 
      requests: []
    }
  }

  componentDidMount() {
    // axios.get('/api/get_friend_requests' + '?userId=' + this.screenProps) 
    axios.get('/api/get_friend_requests' + '?userId=' + 1) 
    .then(({ data }) => {
      this.setState({requests: data})
    })
    .catch(err => {
      console.log('error getting friend requests', err); 
    })
  }
  
  acceptRequest(friendId) {
    axios.post('/api/accept_friend_request', {
      userId: this.screenProps,
      friendId: friendId
    })
    .then(({ data }) => {
      // this.setState({requests: this.state.requests.splice(indexOf(data), 1)});
    })
    .catch(err => 
      console.log('error accepting request', err)
    )
  }

  // deleteRequest(friendId) {
  //   axios.post('deleteRequest', {
  //     friendId: friendId
  //   })
  //   .then({
      
  //   })
  // }
  

  render() {
    return ( 
      <View>
        {this.state.requests.map((request) => {
          console.log('inside map: ', request);
          return (
            <Request 
              friendId={request.friend.id}
              name={request.friend.name}
              img={request.friend.profile_image_url}
              acceptRequest={this.acceptRequest.bind(this)}
              //deleteRequest
            />
          )
        })}
      </View>
    )
  }
}



export default FriendRequests;