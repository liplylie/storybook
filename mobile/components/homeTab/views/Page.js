import React, { Component } from 'react';
import { View, Text } from 'react-native'
import axios from 'axios'
//import { connect } from 'react-redux'

class Page extends Component{
	componentDidMount(){
	// send get request for all images from clicked user

	}
	render(){
	  return (
	    <View style={{justifyContent: 'center', alignItems: 'center'}}>
	      <Text>This is page view</Text>
	    </View> 
	  )
	}
}

// const mapStateToProps = (store) =>{
 
//   return {
//     profileInfo: store
//   }
// }


export default Page