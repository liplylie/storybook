import React, { Component } from 'react';
import { View, Text } from 'react-native'
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
    axios.get()
  }
}





export default Friends;