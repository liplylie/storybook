import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

const Profile = ( props ) => {
	console.log(props, 'profile props')
	let name = '';
	let picture = '';
	if (props.profileInfo.name){
		console.log('success')
		name = props.profileInfo.name;
		picture = props.profileInfo.picture.data.url
	} 
  return (
<<<<<<< HEAD
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Text>This is profile view</Text>
=======
    <View>
    	<Image source={{uri:picture}} style={styles.profilePicture}/>
      <Text style={styles.profileName}>{name}</Text>
>>>>>>> photo and name from fb renders on profile view
    </View> 
  )
}

const mapStateToProps = (store) =>{
  console.log(store, 'profile js state')
 
  return {
    profileInfo: store.Profile
  }
}

const styles = StyleSheet.create({
	profileName: {
		textAlign: 'center',
		padding: 10
	},
	profilePicture: {
		width: 60, 
		height: 60,
		justifyContent: 'center',
		padding: 10,
		borderRadius: 10
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