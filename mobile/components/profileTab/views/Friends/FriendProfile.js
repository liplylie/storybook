//use Jordan's component
//block user
//unfriend
import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import key from '../../../../../sensitive.json'

class FriendProfile extends Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    //get user profile using this.props.navigation.state.params.userId
  }

  deleteFriend(friendId) {
    axios.post(key.flask_server + 'api/remove_friend', {
      userId: this.screenProps,
      friendId: friendId
    })
  }

  blockFriend(friendId) {
    axios.post(key.flask_server + 'api/block_friend', {
      userId: this.screenProps,
      friendId: friendId
    })
  }

  render() {
    if (this.props.navigation.state.params.type === "result") {
      return (
        <View>
          <Text>This profile is private</Text>
        </View>
      )
    } else {
      return (
        <View>
          <Text>Friend's profile</Text> 
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

//  const userDispatch = (dispatch) => {
//    return {
//      actions: bindActionCreators(userActions, dispatch)
//    }
//  }

export default connect(mapStateToProps)(FriendProfile); 