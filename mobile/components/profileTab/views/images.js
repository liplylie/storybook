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
	return (
				<View>
					<Text>{props.url.image_user_name}</Text>
					<Image style={{height:30, width: 30}} source={{uri:props.url.image_user_url}}/>
					<Image style={styles.image} source={{uri:props.url.imageUrl}} alt='picture here'/>
				</View>
			)
}

