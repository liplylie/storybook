import React, {Component} from 'react';
import { NavigationActions } from 'react-navigation'
import { View, Text, Image, StyleSheet, ScrollView, TouchableHighlight } from 'react-native'
import axios from 'axios'
import Images from './images'
import { connect } from 'react-redux'
import parser from '../../../parser.js'



class PicturesFromMarker extends Component {
	constructor(props){
		super(props)
		console.log(props, 'PicturesFromMarker props')
		this.state = {
			images: []
		}
	this.backAction = NavigationActions.navigate({routeName:'Profile'});
	console.log(props, 'PicturesFromMarker props')
	
	}

	// make get request, get photos from location
	componentDidMount(){
		let that = this;
		let latitude = this.props.markerLocation.latitude
		let longitude = this.props.markerLocation.longitude
		axios.get('http://localhost:5000/api/get_imgs_by_loc', {
			params:{
				latitude: latitude,
				longitude: longitude
			}
			// that.setState({
			// 	images:
			// })
		})
		.then(function ({data}) {
    	console.log( data, 'data from PicturesFromMarker axios');
    	var splitData = data.replace('[u','[');
    	console.log(splitData, 'splitData')
    	splitData = splitData.split('\'').join('"')
    	console.log(splitData, 'split split join')
    	// splitData = splitData.map(e =>{ return JSON.parse(e)})
    	// console.log(splitData, 'split data parse'
    	splitData = splitData.substr(1, splitData.length-2)
    	splitData = JSON.parse(splitData)
    	console.log(splitData, 'final splitData')
    	that.setState({
    		images:[splitData]
    	})
  	 })
  	.catch(function (error) {
    	console.log(error, 'error from PicturesFromMarker');
  	});
  	//console.log(this.images, 'thisimages in componentDidMount')
	}
		//props.markerLocation
	// store images in an array 

	// iterate through image array
		// imageArr.map(img => { return <Image source={{uri:img}} /> }) 


	render(){
	let img1 = "https://timedotcom.files.wordpress.com/2014/08/t100_tv_spongebob_free1.jpg?quality=85"
	let backIcon = "https://vignette3.wikia.nocookie.net/lionheart-tactics/images/b/b9/Back.png/revision/latest?cb=20150218040942"
	let mapIcon = "https://cdn4.iconfinder.com/data/icons/flatified/512/map.png"
	console.log(this.state.images, 'this images in render')
	console.log(Array.isArray(this.state.images), 'this images array is ')
	  return (
	    <View style={styles.container}>
	    	<View style={styles.backNav}>
		    	<TouchableHighlight onPress={() => {this.props.navigation.dispatch(this.backAction)}}>
		    		<Image source={{uri:backIcon}} style={styles.backIcon}/>
		    	</TouchableHighlight>
	    		<Image source={{uri:mapIcon}} style={styles.mapIcon}/>
	    	</View>
	    	<ScrollView >
	    	<View style={styles.imageContainer}>
	      	{this.state.images.map((img, i) => { return <Images key={i} url={img}/> }) }
	      </View>
	    	</ScrollView> 
	    </View>
	  )	
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
    flex:1,
  },
	imageContainer: {
    width: 330,
    marginTop: 15,
    flexDirection:'row', 
		flexWrap:'wrap',
		backgroundColor: 'skyblue'
  },
  backNav:{
		flexDirection: 'row',
		padding: 10,
	},
	mapIcon:{
		marginTop: 10,
		width: 40, 
		height: 50,
		borderRadius: 10
	},
	backIcon:{
		width: 45,
		height: 45,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 15
	}
})

const mapStateToProps = (store) =>{
  console.log(store, 'map js state')
 
  return {
    markerLocation: store.Profile.markerLocation
  }
}

export default connect(mapStateToProps)(PicturesFromMarker);






