import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import Book from './Book'

export default class Collection extends Component{
	constructor(props){
		super(props)
		console.log(props, 'collection props homie')
	}

	componentDidMount(){
		// make axios get request for all nearby friends and one photo from each nearby friend.
			// put username and location in get request
	}

	render(){
		let img1 = "https://timedotcom.files.wordpress.com/2014/08/t100_tv_spongebob_free1.jpg?quality=85"
		var test = [];
		 for (var i=0; i < 100; i++){
	      test.push(<Image source={{uri:img1}} style={styles.image}/>)
	    }

	  return (
	    <ScrollView >
	    <View style={styles.container}>
	    	{test}
	      <Book/>
	    </View>
	    </ScrollView> 
  	)
	}
}

const styles = StyleSheet.create({
	container: {
    flex: 1,
    marginTop: 15,
    backgroundColor: 'yellow',
    flexWrap: 'wrap'
  },
	image:{
		width: 100, 
		height: 100,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		
	},
	})
