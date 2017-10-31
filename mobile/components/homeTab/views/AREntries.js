import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { ARKit } from 'react-native-arkit';

export default class AREntries extends Component {
	constructor(props){
		super(props)
	}

	render(){
		let x = this.props.x
		let image = this.props.image
		return(
					<ARKit.Sprite position={{ x: x, y: 0, z: -2}}>
	          <Image source={{uri:image}} style={{height: 200, width: 200}}/>
	        </ARKit.Sprite>
		)
	}
}