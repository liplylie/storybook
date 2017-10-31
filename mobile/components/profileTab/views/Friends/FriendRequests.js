import React, { Component } from 'react'
import { View, Text, Image, Button } from 'react-native'
import axios from 'axios'

import key from '../../../../../sensitive.json'

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
    // axios.get(key.flask_server + 'api/get_friend_requests?userId=' + this.screenProps) 
    axios.get(key.flask_server + 'api/get_friend_requests?userId=' + 1) 
    .then(({ data }) => {
      this.setState({requests: data})
    })
    .catch(err => {
      console.log('error getting friend requests', err); 
    })
  }
  
  acceptRequest(friendId) {
    axios.post(key.flask_server + 'api/accept_friend_request', {
      // userId: this.screenProps,
      userId: 1,
      friendId: friendId
    })
    .then(({ data }) => {
      console.log('success accepting request', data);
      //add alert
    })
    .catch(err => 
      console.log('error accepting request', err)
      //add alert
    )
  }

  removeRequest(request) {
    this.state.requests.splice(indexOf(request), 1);
  }

  // deleteRequest(friendId) {
  //   axios.post(key.flask_server + 'api/deleteRequest', {
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
            <View> 
            <Text>{request.name}</Text>
            <Image>{request.img}</Image>
            <Button 
              title="Accept"
              onPress={() => {
                this.acceptRequest(request.friendId);
                this.removeRequest(request);
              }}
            /> 
            <Button 
              title="Delete"
              /* onPress={() => {
                this.deleteRequest(request.friendId);
                this.removeRequest(request);
              }} */
            />
          </View> 
          )
        })}
      </View>
    )
  }
}



export default FriendRequests;