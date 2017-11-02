import React, { Component } from 'react';
import { View, Button, TouchableWithoutFeedback, Text, Image, ScrollView, StyleSheet } from 'react-native'
import { SearchBar, Card, Icon } from 'react-native-elements'

import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'

import axios from 'axios'

import * as chatActions from '../../../../actions/chatActions'

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
  header: {
    paddingRight: 10
  },
  component: {
    backgroundColor: 'white'
  }
})

class Friends extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Friends`,
    headerRight: <Icon name='message' type='entypo' onPress={() => navigation.navigate('Messages')} style={styles.header} />  
  });

  constructor(props) {
    super(props); 
    this.state = {
      // friends: [{id: 1, img: "", name: "Angie"}, {id: 2, img: "", name: "Jordan"}  ], 
      // results: [{id: 2, img: "https://ih0.redbubble.net/image.409990999.1253/sticker,375x360-bg,ffffff.u1.png", name: "Jeff"}, {id: 4, img: "http://www.cartoonbrew.com/wp-content/uploads/2016/11/danielchong_webarebears.jpg", name: "Daniel"}],
      results: [],
      input: ''
    }
  }

  componentWillMount() {
    console.log('screen props to friends', this.props); 
    
    // this.props.actions.getFriends(1);
  }
  

  render() {
    this.props.actions.getFriends(this.props.screenProps);
    const {navigate} = this.props.navigation; 
    console.log('props passed to friends', this.props);
      return (
        <ScrollView style={styles.component}>
          {this.props.friends.map(friend => {
            return (
              <Card>
              <TouchableWithoutFeedback onPress={() => navigate('FriendProfile', {friendId: friend.id, type: "friend", name: friend.name})}>
                <Image style={styles.image} resizeMode="cover" source={{uri: friend.profile_image_url}}/>
              </TouchableWithoutFeedback >
              <TouchableWithoutFeedback onPress={() => navigate('FriendProfile', {friendId: friend.id, type: "friend", name: friend.name})}>
                <Text style={styles.text}>{friend.name}</Text>
              </TouchableWithoutFeedback> 
              </Card>
            ) 
          })} 
        </ScrollView> 
      )
  }
}

const mapStateToProps = (store) => {
  return {
    friends: store.Chat.friends
   }
 }

 const chatDispatch = (dispatch) => {
   return {
     actions: bindActionCreators(chatActions, dispatch),
   }
 }

export default connect(mapStateToProps, chatDispatch)(Friends);

