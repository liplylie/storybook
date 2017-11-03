import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, TextInput, TouchableOpacity, Button } from 'react-native'
import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Icon } from 'react-native-elements'

import CommentView from './CommentView'
import * as commentActions from '../../../actions/commentActions'

const { width, height } =  Dimensions.get('window')
let visibleHeight = 0
let visibleWidth = 0

class Page extends Component{
	static navigationOptions = ({ navigation }) => ({
     headerLeft: <Icon name='chevron-left' type='MaterialIcons' onPress={() => navigation.goBack()} />  
  });
	constructor(props){
		super(props)
		console.log(props, 'page props')
		this.state = {
			visibleHeight: 0,
			visibleWidth:0,
			commentText: '',
			refresh: true
		}
		
	}
	componentDidMount(){
		// send get request for all images from clicked user
		// need clicked user id 
		
	}

	showTextInput(){
		this.setState({
			visibleHeight: 40,
			visibleWidth: width
		})
	}

	render(){
		console.log('this should be image id: ', this.props.navigation.state.params.image_id)
		const { refresh } = this.state;

		return (
			<View style={styles.container}>
				<View style={styles.title}> 
					<Image 
						style={styles.logo}
						resizeMethod='resize'
						resizeMode='contain'
						source={require('../../../logo.jpg')} 
					/>
				</View>
				<ScrollView>
					<View>
						<View style={styles.profileInfo}>
							<Image style={styles.profilePicture} source={{uri:this.props.navigation.state.params.image_user_pic}} />
							<Text> {this.props.navigation.state.params.image_user_name} </Text>
						</View>
						<Image style={styles.image} source={{uri:this.props.navigation.state.params.imageUrl}}/>
						<Text style={styles.caption}> {this.props.navigation.state.params.caption} </Text>
						<Text style={styles.likes}> Likes: 0 </Text>
						<View>
							<CommentView imageId={this.props.navigation.state.params.image_id} />
						</View>
						<TouchableOpacity onPress={this.showTextInput.bind(this)}>
							<Text> Add Comment</Text> 
						</TouchableOpacity>
						<TextInput
							style={{borderColor: 'gray', borderWidth: .8, borderRadius: 10, fontSize: 10, height: this.state.visibleHeight, width: this.state.visibleWidth}}
							onChangeText={(text) => {
								this.setState({
									commentText: text
								})
							}}
							placeholder='Add a Comment ...'
						/>
						<Button
							title="Enter"
							onPress={() => {
								const obj = {
									text: this.state.commentText,
									comment_user_id: this.props.userId,
									comment_image_id: this.props.navigation.state.params.image_id
								}
								console.log(obj)
								this.props.actions.postComments(obj);
								this.props.actions.getComments(this.props.navigation.state.params.image_id)
							}}
						/>
					</View>
				</ScrollView>
			</View> 
	  )
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  title:{
    flexDirection: 'column',
    margin: 10
  },
  logo: {
    width: 250,
    height: 50,
    margin: 2
  }, 
  image: {
  	height: 300,
  	width: width,
  	padding: 5
  }, 
  profilePicture: {
		margin: 5,
		width: 30, 
		height: 30,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 20
	},
	profileInfo: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	caption:{
		fontSize: 14,
		color: 'grey',
		textAlign: 'center',
		fontFamily: 'Verdana'
	},
	likes: {
		padding: 3,
		color: 'grey',
		fontSize: 14,
		fontFamily: 'Verdana',
		fontWeight: 'bold'
	}, 
	userCommentName: {
		fontWeight: 'bold'
	},
	userComment:{
		fontWeight: 'normal',
		fontSize: 13,
		fontFamily: 'Verdana',
	}, 
	hidden:{
		height: visibleHeight,
		width: visibleWidth
	}

})
const mapStateToProps = (store) => {
  return {
		pageInfo: store,
		userId: store.Auth.userId
  }
}

const pageDispatch = (dispatch) => {
	return {
		actions: bindActionCreators(commentActions, dispatch)
	}
}

export default connect(mapStateToProps, pageDispatch)(Page)
