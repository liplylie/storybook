import React from 'react'
import { View, Text, Image, StyleSheet, ScrollView, TouchableHighlight } from 'react-native'


const styles = StyleSheet.create({
	image:{
		marginTop: .5,
			marginLeft: 5, 
			marginRight: 5, 
			marginBottom: 5,
			width: 100, 
			height: 100,
			borderRadius: 10,
			borderColor: 'black'
		},
	text:{
		textAlign: 'center'
	}
})

export default images = (props) => {
	console.log(props,'image props')
	// let img1 = "https://timedotcom.files.wordpress.com/2014/08/t100_tv_spongebob_free1.jpg?quality=85"
	return (
				<View>
					<Text > User Name </Text>
					<Image style={styles.image} source={{uri:props.url}} alt='picture here'/>
				</View>
			)
}

