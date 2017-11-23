import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

class Comment extends Component{
	constructor(props){
		super(props)
		this.hex2a=this.hex2a.bind(this)
	} 

	 hex2a(hexx){
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
   }

	render(){
		let comm = String(this.props.comment.comment.substr(1))
		return(
	  <View>
	    <View>
	      <Image source={{uri: this.props.comment.profileImage}} style={{height:30, width: 30, borderRadius: 20, marginLeft: 3}} />
	    </View>
	    <View>
	      <Text style={{fontWeight: 'bold'}}>{this.props.comment.userName}{" "}<Text style={{fontWeight: 'normal', fontSize: 12}}>{this.hex2a(comm.substr(1))}</Text></Text>
	    </View>
	  </View>
	)
	}
}

export default Comment;