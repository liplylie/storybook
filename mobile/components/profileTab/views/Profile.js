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
		      	<Login/>
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
	},
	profileDetails: {
		margin: 20,
		backgroundColor: 'rgba(0, 122, 255, 0.1)',
		flex: 1
	},
	profilePicture: {
		width: 60, 
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10
	}, 
	friendIcon: {
		width: 100, 
		height: 60,
		borderRadius: 10
	},
	profileName: {
		paddingLeft: 10,
		paddingTop: 15
	},
	profileEmail: {
		paddingLeft: 10,
		color:"red"
	},
	profileMap: {
		flexDirection: 'column',
		margin: 20,
		flex: 3,
		backgroundColor:"blue",
		width: (Dimensions.get('window').width) - 40
	}
})


export default connect(mapStateToProps, null)(Profile);