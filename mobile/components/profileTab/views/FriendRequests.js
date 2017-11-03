import React, { Component } from 'react'
import { View, Text, Image, Button, StyleSheet} from 'react-native'
import { List, ListItem, Icon } from 'react-native-elements'
import axios from 'axios'

import key from '../../../../sensitive.json'

//need function to delete request 

const styles = StyleSheet.create({
	image: {
			marginTop: .5,
			marginLeft: 5, 
			marginRight: 5, 
			marginBottom: 5,
			width: 110, 
			height: 110,
			borderRadius: 10
		},
	text: {
		fontSize: 20,
    textAlign: 'center',
    marginTop: 20
  }, 
  rightIcon: {
    marginLeft: 200
  }
})

class FriendRequests extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Friend Requests`,  
  });

  constructor(props) {
    super(props);
    this.state = {
      // requests: [{id: 1, name: "Daniel", img: "https://cdn.pixabay.com/photo/2016/09/07/16/38/portrait-1652023_960_720.jpg"}]
      requests: []
    }
  }

  componentDidMount() {
    console.log('screen props to friend request', this.props.screenProps)
    axios.get(key.flask_server + 'api/get_friend_requests?userId=' + this.props.screenProps) 
    .then(({ data }) => {
      console.log('friend requests', data.data);
      this.setState({requests: data.data})
    })
    .catch(err => {
      console.log('error getting friend requests', err); 
    })
  }
  
  acceptRequest(friendId) {
    axios.post(key.flask_server + 'api/accept_friend_request', {
      userId: this.props.screenProps,
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

  deleteRequest(friendId) {
    axios.post(key.flask_server + 'api/remove_friend', {
      userId: this.props.screenProps,
      friendId: friendId
    })
  }

  removeRequest(id) {
    this.setState({
      requests: this.state.requests.filter(request => {
        if (request.id !== id) {
          return request;
        }
      })
    })
  }

  // deleteRequest(friendId) {
  //   axios.post(key.flask_server + 'api/deleteRequest', {
  //     friendId: friendId
  //   })
  //   .then({
      
  //   })
  // }

  
  render() {
    if (this.state.requests.length) {
    return ( 
      <List>
        {this.state.requests.map(request => {
          return (
            <ListItem
              roundAvatar
              avatar={{uri:request.profile_image_url}}
              title={request.name}
              /* leftIcon={{name:'delete'}}
                onPressLeftIcon={() => {
                this.deleteRequest(request.id);
                this.removeRequest(request.id);
              }} */
              rightIcon={{name:'check', style: styles.rightIcon}}
              onPressRightIcon={() => {
                this.acceptRequest(request.id);
                this.removeRequest(request.id);
              }}
            > 
            </ListItem>
            // <Button 
            //   title="Delete"
            //   /* onPress={() => {
            //     this.deleteRequest(request.friendId);
            //     this.removeRequest(request);
            //   }} */
            // />
          )
        })}
      </List>
    )
    } else {
      return (
        <View> 
          <Text style={styles.text}>No results</Text> 
        </View> 
      )
    }
  }
}



export default FriendRequests;