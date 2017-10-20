import React, {Component} from 'react';
import { NavigationActions } from 'react-navigation'
import { View, Text, Image, StyleSheet, ScrollView, TouchableHighlight } from 'react-native'



const PicturesFromMarker = ( props ) => {
	const backAction = NavigationActions.navigate({routeName:'Profile'});
	console.log(props, 'PicturesFromMarker props')
	let img = "https://timedotcom.files.wordpress.com/2014/08/t100_tv_spongebob_free1.jpg?quality=85"
	let backIcon = "https://vignette3.wikia.nocookie.net/lionheart-tactics/images/b/b9/Back.png/revision/latest?cb=20150218040942"
	let mapIcon = "https://cdn4.iconfinder.com/data/icons/flatified/512/map.png"
	  return (
	    <ScrollView>
	    	<View style={styles.backNav}>
		    	<TouchableHighlight onPress={() => {props.navigation.dispatch(backAction)}}>
		    		<Image source={{uri:backIcon}} style={styles.backIcon}/>
		    	</TouchableHighlight>
	    		<Image source={{uri:mapIcon}} style={styles.image}/>
	    	</View>
	    	<Image source={{uri:img}} style={styles.image} />
	      <Text>This is pictures from marker view</Text>
	      
	    </ScrollView> 
	  )	
}

const styles = StyleSheet.create({
	image:{
		width: 60, 
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10
	},
	backNav:{
		flexDirection: 'row',
		padding: 10,
	},
	backIcon:{
		width: 45,
		height: 45,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 15
	}
})

export default PicturesFromMarker;






