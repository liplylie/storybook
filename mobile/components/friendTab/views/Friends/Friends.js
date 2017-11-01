import React, { Component } from 'react';
import { View, Button, TouchableWithoutFeedback, Text, Image, StyleSheet } from 'react-native'
import { SearchBar, Card, Icon } from 'react-native-elements'

import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'

import axios from 'axios'

import * as friendActions from '../../../../actions/friendActions'

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
	}
})


//import FriendProfile from './FriendProfile'

class Friends extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Friends`,
    headerRight: <Icon name='message' type='entypo' onPress={() => navigation.navigate('Messages')} />  
  });

  constructor(props) {
    super(props); 
    this.state = {
      // friends: [{id: 1, img: "", name: "Angie"}, {id: 2, img: "", name: "Jordan"}  ], 
      // results: [{id: 2, img: "https://ih0.redbubble.net/image.409990999.1253/sticker,375x360-bg,ffffff.u1.png", name: "Jeff"}, {id: 4, img: "http://www.cartoonbrew.com/wp-content/uploads/2016/11/danielchong_webarebears.jpg", name: "Daniel"}],
      results: [],
      input: ''
    }
    // this.state = {
    //   results: [],
    //   input: ''
    // }
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
    // this.props.actions.getFriends(1);
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
            /* onSubmitEditing={() => {
              this.searchFriends(this.state.input.split(' ')[0], this.state.input.split(' ')[1]);
            }} */
            //add icon to clear searches
          /> 
          {this.state.results.map(result => {
            // for (let i = 0; i < this.props.friends.length; i++) {
            //   if (result.id === friends[i].id) {
                return (
                  <Card>
                  <TouchableWithoutFeedback onPress={() => navigate('FriendProfile', {userId: result.id, type: "friend"})}>
                    <Image style={styles.image} resizeMode="cover" source={{uri: result.img}}/>
                  </TouchableWithoutFeedback >
                  <TouchableWithoutFeedback onPress={() => navigate('FriendProfile', {userId: result.id, type: "friend"})}>
                    <Text style={styles.text}>{result.name}</Text>
                  </TouchableWithoutFeedback> 
                  </Card> 
                )
              // } else {
              //   return (
              //     <View>
              //       <TouchableWithoutFeedback onPress={() => navgiate('FriendProfile', {userId: result.id, type: "result"})}>
              //         <Text>{result.name}</Text> 
              //         <Image source={result.img} />
              //       </TouchableWithoutFeedback>
              //       <Button
              //         title="Add friend"
              //         onPress={() => {this.sendRequest(result.id)}}
              //       ></Button>
              //     </View> 
              //   )
              // }
            // }
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
          {this.props.friends.map(friend => {
            return (
              <Card>
              <TouchableWithoutFeedback onPress={() => navigate('FriendProfile', {userId: friend.id, type: "friend"})}>
                <Image style={styles.image} resizeMode="cover" source={{uri: friend.img}}/>
              </TouchableWithoutFeedback >
              <TouchableWithoutFeedback onPress={() => navigate('FriendProfile', {userId: friend.id, type: "friend"})}>
                <Text style={styles.text}>{friend.name}</Text>
              </TouchableWithoutFeedback> 
              </Card>
            ) 
          })} 
        </View> 
      )
    }
  }
}

const mapStateToProps = (store) => {
  return {
    friends: store.Chat.friends
   }
 }

 const friendDispatch = (dispatch) => {
   return {
     actions: bindActionCreators(friendActions, dispatch),
   }
 }

export default connect(mapStateToProps, friendDispatch)(Friends);