import React, { Component } from 'react'
import MapView from 'react-native-maps';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native';
// give lat and long to this

export default class Marker extends Component {
	constructor(props){
		super(props)
		console.log(props, "marker props yooooooooo")
		this.viewTargetPictures = this.viewTargetPictures.bind(this)
	}

	 viewTargetPictures(e){
    // e contains coordinate info
    console.log(e.nativeEvent, ' second marker pressed')
    this.props.navigation.navigate("PicturesFromMarker")


  }

	render(){
		// when click on marker
			// make get request to server for pictures from this location
				// axios.get - pictures
					// where pictures are from this.props.location
		return(
			<MapView.Marker
				style={styles.marker}
        onPress={e => this.viewTargetPictures(e)}
        coordinate={this.props.location}>
      </MapView.Marker>
			)
	}
			
}

const styles = StyleSheet.create({
  radius:{
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 112, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center'
  }, 
  marker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20 / 2,
    overflow: 'hidden',
    backgroundColor: '#007AFF'
  }
});