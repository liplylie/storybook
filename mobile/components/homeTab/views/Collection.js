import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
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
			console.log(this.props, 'collection maps in mount')
	}

	render(){
		// if (this.props.Profile.userLocation){
		// 	latitude = this.props.Profile.userLocation.latitude
		// }
		var test = [];
		 for (var i=0; i < 100; i++){
	      test.push(<Text>This is collection view{this.props.location.latitude}</Text>)
	    }

	  return (
	    <ScrollView>
	    	{test}
	      <Book/>
	    </ScrollView> 
  	)
	}
}
