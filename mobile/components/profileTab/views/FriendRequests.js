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
		textAlign: 'center'
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
      // requests: [{name: "Daniel", img: "https://cdn.pixabay.com/photo/2016/09/07/16/38/portrait-1652023_960_720.jpg"}]
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

  removeRequest(request, key) {
    this.setState({requests: this.state.requests.splice(key, 1)});
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
      <List>
        {this.state.requests.map((request, i) => {
          console.log('inside map: ', request);
          return (
            <ListItem
              roundAvatar
              key={i}
              avatar={{uri:request.img}}
              title={request.name}
              leftIcon={{name:'delete'}}
                onPressLeftIcon={() => {
                this.deleteRequest(request.id);
                this.removeRequest(request, this.key);
              }}
              rightIcon={{name:'check', style: styles.rightIcon}}
              onPressRightIcon={() => {
                this.acceptRequest(request.id);
                this.removeRequest(request, this.key);
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
  }
}



export default FriendRequests;