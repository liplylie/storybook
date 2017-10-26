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

  componentDidMount() {
    axios.get('api/friends/' + this.props.userId)
    .then(({ data }) => {
      this.setState({friends: data})
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
            <FriendsEntry img={result.img} name={result.name} /> 
          })}
      </View> 
      )
    // } else {
    //   return (
    //     <View>
    //       <SearchBar searchFriends={this.searchFriends.bind(this)} />
    //       <Button
    //         onPress={() => navigate('Messages')}
    //         title="Messages"
    //       /> 
    //       {this.state.friends.map(friend => {
    //         <FriendsEntry img={friend.img} name={friend.name} /> 
    //       })} 
    //     </View> 
    //   )
    }
  }
}

const mapStateToProps = (store) => {
  return {
    userId: store.Auth.userId
   }
 }

export default connect(mapStateToProps)(Friends);