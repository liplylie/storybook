import React, {Component} from 'react';
import { NavigationActions } from 'react-navigation'
import { View, Text, Image, StyleSheet, ScrollView, TouchableHighlight } from 'react-native'
import axios from 'axios'
import Images from './images'



class PicturesFromMarker extends Component {
	constructor(props){
		super(props)
		this.state = {
			images:[]
		}


	this.backAction = NavigationActions.navigate({routeName:'Profile'});
	console.log(props, 'PicturesFromMarker props')
	
	}

	// make get request, get photos from location
	componentDidMount(){
		let that = this;
		axios.get('https://jsonplaceholder.typicode.com/photos')
		.then(function ({data}) {
    	console.log(data[0]);
    	let useData = data.splice(0,10)
    	that.setState({
    		images: [...useData]
    	})
  	})
  	.catch(function (error) {
    	console.log(error, 'error');
  	});
  	console.log(this.images, 'thisimages in componentDidMount')
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
	  return (
	    <ScrollView>
	    	<View style={styles.backNav}>
		    	<TouchableHighlight onPress={() => {this.props.navigation.dispatch(this.backAction)}}>
		    		<Image source={{uri:backIcon}} style={styles.backIcon}/>
		    	</TouchableHighlight>
	    		<Image source={{uri:mapIcon}} style={styles.image}/>
	    	</View>
	    	<Image source={{uri:img1}} style={styles.image} />
	      {this.state.images.map((img, i) => { return <Images key={i} url={img.url}/> }) }

	    </ScrollView> 
	  )	
	}
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






