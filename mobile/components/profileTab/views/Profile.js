import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import UserMap from './map.js';
import Login from '../../auth/Login'


const Profile = ( props ) => {
	console.log(props, 'profile props')
	if (props.profileInfo.Auth.name){
		let name = props.profileInfo.Auth.name;
		let email = props.profileInfo.Auth.email;
		let picture = props.profileInfo.Auth.picture;
		let id = props.profileInfo.Auth.id;
		let friendIcon = "https://cdn.iconscout.com/public/images/icon/premium/png-512/profile-group-friend-team-user-avatar-3d104201ce065c29-512x512.png"

		const viewFriends = () => {
    	props.navigation.navigate("Friends")
  	}

		return (
	    <ScrollView style={styles.profileContainer}>

	    	<View style ={styles.profileDetails}>
	    		<View style={{flexDirection: 'row', flex: 1}}>
		    		<Image source={{uri:picture}} style={styles.profilePicture}/>
		    		<View style={{ marginLeft: 180}}>
			    		<TouchableHighlight onPress={viewFriends}>
			      		<Image source={{uri:friendIcon}} style ={styles.friendIcon}/> 
			      	</TouchableHighlight>
		      	</View>
		    	</View>
		      	<Text style={styles.profileName}>
		      		Name: {name}
		      		</Text>
		      	<Text style={styles.profileEmail}>
		      		Email: {email}
		      	</Text>
		      	<View style={{margin: 5}}>
		      		<Login />
		      	</View>
		    </View>






	      <View style={styles.profileMap}>
	      	<UserMap navigation={props.navigation}/>
	      </View>
	    </ScrollView> 
	  )
	}	else {
		  return (
		    <View>
		    </View> 
	  	)
	}
}

const mapStateToProps = (store) =>{
  console.log(store, 'profile js state')
 
  return {
    profileInfo: store
  }
}

const styles = StyleSheet.create({
	profileContainer: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: 'white'
	},
	profileDetails: {
		flex: 1,
		marginTop: 20, 
		marginLeft:20, 
		marginRight: 20,
		marginBottom: 10,
		backgroundColor: 'skyblue',
		borderRadius: 5
	},
	profilePicture: {
		margin: 5,
		width: 60, 
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10
	}, 
	friendIcon: {
		width: 85, 
		height: 60,
		borderRadius: 10
	},
	profileName: {
		paddingLeft: 10,
		paddingTop: 5,
		fontSize: 14,
		fontFamily: 'Verdana',
		fontWeight: 'bold'
	},
	profileEmail: {
		paddingLeft: 10,
		fontSize: 14,
		paddingBottom: 5,
		fontFamily: 'Verdana',
		fontWeight: 'bold'
	},
	profileMap: {
		flex: 3,
		flexDirection: 'column',
		marginLeft: 20,
		width: (Dimensions.get('window').width) - 40,
	}
})


export default connect(mapStateToProps, null)(Profile);