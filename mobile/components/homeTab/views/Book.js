import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
	image:{
			marginTop: .5,
			marginLeft: 5, 
			marginRight: 5, 
			marginBottom: 5,
			width: 100, 
			height: 100,
			borderRadius: 10
		},
	text:{
		textAlign: 'center'
	}
})

const Book = (props) => {
	console.log(props, 'book props')
	var test = [];
		 for (var i=0; i < 100; i++){
	      test.push( <View>
    	<Text style={styles.text}> User Name </Text>
    	<Image source={{uri:props.image}} style={styles.image}/>
    </View> )
	    }
  return (
    test
  )
}

export default Book;

