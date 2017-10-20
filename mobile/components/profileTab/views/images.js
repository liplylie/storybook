import React from 'react'
import { View, Text, Image, StyleSheet, ScrollView, TouchableHighlight } from 'react-native'


const styles = StyleSheet.create({
	image:{
		width: 60, 
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10
	},
	})

export default images = (props) => {
	console.log(props,'image props')
	let img1 = "https://timedotcom.files.wordpress.com/2014/08/t100_tv_spongebob_free1.jpg?quality=85"
	return (
				<View>
					<Image source={{uri:img1}} style={styles.image}/>
					<Text> {props.url} </Text>
				</View>
			)
}

