//use Jordan's component
//block user
//unfriend
import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class FriendProfile extends Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    //get user profile using this.props.navigation.state.params.userId
  }

  render() {
    return (
      <View>
        <Text>This is friend's profile</Text>
      </View>
    )
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