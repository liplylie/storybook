import React, { Component } from 'react';
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'

//import Convo

class Friends extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      friends: []
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

  render() {
    <View>
      <Search friends={this.state.friends}/> 
      <Collection users={this.state.friends}/> 
    </View> 
  }
}


const mapStateToProps = (store) => {
  return {
    userId: store.Auth.userId
   }
 }

export default connect(mapStateToProps)(Friends);