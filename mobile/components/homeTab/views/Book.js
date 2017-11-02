import React from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'

const styles = StyleSheet.create({
	image:{
			marginTop: .5,
			marginLeft: 5, 
			marginRight: 5, 
			marginBottom: 5,
			width: 110, 
			height: 110,
			borderRadius: 10
		},
	text:{
		textAlign: 'center'
	}
})


const Book = (props) => {
	console.log(props, 'book props')
	const viewPage = ()=>{
		props.navigation.navigate("Page", props.image)
  }
  return (
  	<View>
  		<Text style={styles.text}> User Name </Text>
      <TouchableHighlight onPress={viewPage}>
  			<Image source={{uri:props.image}} style={styles.image}/>
  		</TouchableHighlight>
		</View> 
  )
}

export default Book
