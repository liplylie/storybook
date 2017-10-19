import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';

const Profile = ( props ) => {
	console.log(props, 'profile props')
	if (props.profileInfo.name){
		console.log('success')
		let name = props.profileInfo.name;
		let email = props.profileInfo.email;
		let picture = props.profileInfo.picture.data.url;
		let id = props.profileInfo.id;
		return (
    <ScrollView style={styles.profileContainer}>
    	<View style ={styles.profileDetails}>
    		<Image source={{uri:picture}} style={styles.profilePicture}/>
      	<Text style={styles.profileName}>
      		Name: {name}
      		</Text>
      	<Text style={styles.profileEmail}>
      		Email: {email}
      	</Text>
      </View>
      <View style={styles.profileBookCollection}>
      	<Text> 
      	Collection PlaceHolder
      	</Text>
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
    profileInfo: store.Profile
  }
}

const styles = StyleSheet.create({
	profileContainer: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: 'yellow'
	},
	profileDetails: {
		margin: 20,
		backgroundColor: 'green',
		flex: 1
	},
	profilePicture: {
		width: 60, 
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10
	}, 
	profileName: {
		paddingLeft: 10,
		paddingTop: 15
	},
	profileEmail: {
		paddingLeft: 10,
		color:"red",
	},
	profileBookCollection: {
		flexDirection: 'column',
		margin: 20,
		flex: 3,
		backgroundColor:"blue",
		width: (Dimensions.get('window').width) - 40, 
	}
})

// const mapDispatchToProps = (dispatch) =>{
//   return {
//     addToDo: (todo) =>{
//       dispatch(addTodo(todo))
//     }
//   };
// }
// {profileInfo.Profile.profileInfo.name}
// src={{uri:profileInfo.Profile.profileInfo.picture.data.url}}

export default connect(mapStateToProps, null)(Profile);