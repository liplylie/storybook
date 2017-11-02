import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableHighlight } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import UserMap from './map.js';
import Login from '../../auth/Login'
import secret from '../../../../sensitive.json'


const { width, height } =  Dimensions.get('window');

class Profile extends Component {
	constructor(props){
		super(props)
		this.state = {
			friends:[]
		}
		console.log(props, 'profile props')
		this.viewRequests = this.viewRequests.bind(this)
	}
	static navigationOptions = {
    header: null
  }

  	componentDidMount(){
		// change to component did mount
		let userId = this.props.profileInfo.Auth.userId
		console.log(userId, 'user id in profiel')
		let that = this
		axios.get(`http://localhost:5000/api/get_all_friends`, {
			params:{
				userId: userId
			}
		})
		.then(({data}) =>{
			console.log(data, 'response from getFriends')
			that.setState({
				friends:[...data.data]
			})
			console.log(that.state.friends, 'that friends')

		})
		.catch(err =>{
			console.log(err, 'response from getFriends')
		})
		// get all friends, count them all, return count
		// put user id in get request params
		//'/api/get_all_friends'
	}
	
	viewRequests(){
		this.props.navigation.navigate("FriendRequests")
	}


	render(){
		if (this.props.profileInfo.Auth.name){
			let name = this.props.profileInfo.Auth.name;
			let email = this.props.profileInfo.Auth.email;
			let picture = this.props.profileInfo.Auth.picture;
			let id = this.props.profileInfo.Auth.id;
			let navigation = this.props.navigation

			return (
		    <ScrollView style={styles.profileContainer}>
		    	<View style={{flex:.3, backgroundColor: 'white', marginTop:10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
		    		<Text style={styles.email}>
			      	{email}
			      </Text>
			      <TouchableHighlight onPress={this.viewRequests}>
				      <Image source={require('../../../friendIcon.png')} style={styles.friendIcon}/> 
				    </TouchableHighlight>
		    	</View>
		    	<View style ={styles.profileDetails}>
		    		<View style={{flexDirection: 'row', flex: 1}}>
		    			<View style={{flexDirection: 'column', flex: 1}}>
		    				<View style={{flexDirection: 'row', alignItems: 'center'}}>
				    			<Image source={{uri:picture}} style={styles.profilePicture}/>
				    			<View style={{paddingLeft: 150, justifyContent: 'space-around', flexDirection: 'row'}}>
				    				<View style={{marginRight: 20}}>
					    				<Text> Photos </Text>
					    				<Text style={{textAlign: 'center'}}> 0 </Text>
					    			</View>
					    			<View>
						    			<Text> Friends </Text>
					    				<Text style={{textAlign: 'center'}}> {this.state.friends.length} </Text>
					    			</View>
				    			</View>
				    		</View>
				    		<Text style={styles.profileName}> {name} </Text>
				    	</View>
			    	</View>
			      	<View style={{margin: 5}}>
			      		<Login />
			      	</View>
			    </View>
		      <View style={styles.profileMap}>
		      	<UserMap navigation={navigation}/>
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
		backgroundColor: 'skyblue'
	},
	profilePicture: {
		marginTop: 15,
		marginLeft: 30,
		marginBottom: 10,
		width: 50, 
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 20,
	}, 
	friendIcon: {
		width: 35, 
		height: 25,
		borderRadius: 10,
		
	},
	email: {
		marginRight: 80,
		marginLeft: 110,
		paddingTop: 5,
		fontSize: 14,
		fontFamily: 'Verdana',
		fontWeight: 'bold',
	},
	profileName: {
		fontSize: 14,
		paddingBottom: 5,
		fontFamily: 'Verdana'
	},
	profileMap: {
		flex: 3,
		flexDirection: 'column',
		width: width,
	}
})


export default connect(mapStateToProps, null)(Profile);