import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, TextInput, TouchableOpacity } from 'react-native'
import axios from 'axios'
import { connect } from 'react-redux'

import CommentView from './CommentView'

const { width, height } =  Dimensions.get('window')
let visibleHeight = 0
let visibleWidth = 0

class Page extends Component{
	constructor(props){
		super(props)
		console.log(props, 'page props')
		this.state = {
			visibleHeight: 0,
			visibleWidth:0
		}
		
	}
	componentDidMount(){
		// send get request for all images from clicked user
	}

	showTextInput(){
		this.setState({
			visibleHeight: 40,
			visibleWidth: width
		})
	}

	handleComment(comment){
		console.log(comment, 'comment')
	}
	render(){
		let img1 = "https://timedotcom.files.wordpress.com/2014/08/t100_tv_spongebob_free1.jpg?quality=85"
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
				    			<Image style={styles.profilePicture} source={{uri:img1}} />
				    			<Text> SpongeBob </Text>
				    		</View>
				      	<Image style={styles.image} source={{uri:img1}}/>
				      	<Text style={styles.caption}> My Life is Great </Text>
						  	<Text style={styles.likes}> Likes: 0 </Text>
						  	<View>
									<CommentView />
						  		<Text style={styles.userCommentName}> SquidWard <Text style={styles.userComment}> I hate you SpongeBob</Text></Text>
						  	</View>
						  	<TouchableOpacity onPress={this.showTextInput.bind(this)}>
						  		<Text> Add Comment</Text> 
						  	</TouchableOpacity>
					      <TextInput
					        style={{borderColor: 'gray', borderWidth: .8, borderRadius: 10, fontSize: 10, height: this.state.visibleHeight, width: this.state.visibleWidth}}
					        onChangeText={(comment) => this.handleComment(comment)}
					        placeholder='Add a Comment ...'
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
const mapStateToProps = (store) =>{
 
  return {
    pageInfo: store
  }
}
export default connect(mapStateToProps)(Page)
