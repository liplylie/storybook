import React, { Component } from 'react';
import { View, Text } from 'react-native'
import { connect } from 'react-redux'


import SearchBar from './SearchBar'

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      results: [],
    }
  } 

  componentDidMount() {
    axios.get('/chats/' + this.props.userId)
    .then(({ data }) => {
      this.setState({rooms: data})
    })
  }

  render() {
    return (
      <View>

      </View> 
    )
  }
}

const mapStateToProps = (store) => {
  return {
    userId: store.Auth.userId
   }
 }

export default connect(mapStateToProps)(Messages);