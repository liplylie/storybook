import React, { Component } from 'react';
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'

import SearchBar from './SearchBar'

class Friends extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      friends: [], 
      results: [] 
    }
  }
  
  componentDidMount() {
    axios.get('/friends/' + this.props.userId)
    .then(({ data }) => {
      this.setState({friends: data})
    })
    .catch(err => {
      console.log('failed to retrieve friends', err);
    })
  }

  searchFriends (firstName, lastName) {
    axios.get('/search/' + firstName + lastName)
    .then(({ data }) => {
      this.setState({results: data})
    })
    .catch(err => {
      console.log('failed to search friends', err);
    })
  }

  clearSearches () {
    this.setState({results: []})
  }

  render() {
    if (this.state.results) {
      return ( 
        <View>
          <SearchBar searchFriends={this.searchFriends.bind(this)}/> 
          <Collection users={this.state.results}/> 
        </View> 
      ) 
    }
    else {
      return (
        <View>
          <SearchBar searchFriends={this.searchFriends.bind(this)} /> 
          <Collection users={this.state.friends}/> 
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