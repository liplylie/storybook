import React, {Component} from 'react';
import { NavigationActions } from 'react-navigation'
import { View, Text, Image, StyleSheet, ScrollView, TouchableHighlight, Dimensions } from 'react-native'
import axios from 'axios'
import Images from './images'
import { connect } from 'react-redux'
import parser from '../../../parser.js'
import key from '../../../../sensitive.json'
import { Icon } from 'react-native-elements'

const PythonServer = key.flask_server
const { width, height } =  Dimensions.get('window');
class PicturesFromMarker extends Component {
	constructor(props){
		super(props)
		this.state = {
			images: []
		}
	this.backAction = NavigationActions.navigate({routeName:'Profile'});
	console.log(props, 'PicturesFromMarker props')
	}
	static navigationOptions = ({ navigation }) => ({
     headerLeft: <Icon name='chevron-left' type='MaterialIcons' onPress={() => navigation.goBack()} />  
  });

	// make get request, get photos from location
	componentDidMount(){
		let that = this;
		let latitude = this.props.markerLocation.latitude
		let longitude = this.props.markerLocation.longitude
		axios.get(PythonServer + 'api/get_imgs_by_loc', {
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
    	
    	that.setState({
    		images:[...data.data]
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
	console.log(this.state.images, 'this images in render')
	let navigation = this.props.navigation
	  return (
	    <View style={styles.container}>
	    	<ScrollView >
	    	<View style={styles.imageContainer}>
	      	{this.state.images.map((img, i) => { return <Images key={i} url={img} navigation={navigation}/> }) }
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
    width: width,
    flexDirection:'row', 
		flexWrap:'wrap',
		backgroundColor: 'skyblue',
		justifyContent: 'center'
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






