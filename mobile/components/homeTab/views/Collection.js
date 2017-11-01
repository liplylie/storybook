import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Dimensions } from 'react-native';
import axios from 'axios';
import Book from './Book';
import { connect } from 'react-redux'
import key from '../../../../sensitive.json'

const { width, height } =  Dimensions.get('window')
const PythonServer = key.flask_server

class Collection extends Component {
	constructor(props){
		super(props)
		console.log(props, 'collection props homie')
		this.state = {
			images: []
		}
	}

	componentDidMount(){
		// make axios get request for all nearby friends and one photo from each nearby friend.
			// put username and location in get request
		let that = this
		let latitude = this.props.location.latitude
		let longitude = this.props.location.longitude
		let userId = this.props.profileInfo.userId

		axios.get('http://localhost:5000/api/get_imgs_by_frs_at_loc', {
			params:{
				latitude: latitude,
				longitude: longitude,
				userId: userId
			}
		})
		.then(response=>{
			console.log(response, 'collection response imgs at location')
			that.setState({
				images: [...that.state.images,...response.data]
			})
		})
		.catch(err => {
			console.log(err, 'err from imgs at location')
		})
	}

	render(){
		//let img1 = "https://timedotcom.files.wordpress.com/2014/08/t100_tv_spongebob_free1.jpg?quality=85"
		let navigation = this.props.navigation
		console.log(this.state.images, 'this state images')
		if (this.state.images.length === 0){
		return (
				<View style={styles.container}>
					<Text> You currently have no images </Text>
				</View>
			)
		} else {
		  return (
		    <ScrollView >
		    <View style={styles.container}>
		    	{this.state.images.map((image,i) => (<Book key={i} image={image} navigation={navigation}/>))}
		    </View>
		    </ScrollView> 
	  	)
		}
	}
}

const styles = StyleSheet.create({
	container: {
    width: width,
    flexDirection:'row', 
		flexWrap:'wrap',
		justifyContent: 'center'
  }
})

const mapStateToProps = (store) =>{
  console.log(store, 'collection js store')
  return {
    profileInfo: store.Auth
  }
}

export default connect(mapStateToProps, null)(Collection)
