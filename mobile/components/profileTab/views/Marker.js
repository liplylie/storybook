import React, { Component } from 'react'
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import markerAction from "../../../actions/markerAction.js"

class Marker extends Component {
	constructor(props){
		super(props)
		console.log(props, "marker props yooooooooo")
		this.viewTargetPictures = this.viewTargetPictures.bind(this)
	}

	 viewTargetPictures(e){
    // e contains coordinate info
    console.log(e.nativeEvent.coordinate, ' second marker pressed')
    let lat = e.nativeEvent.coordinate.latitude;
    let long = e.nativeEvent.coordinate.longitude;
    this.props.navigation.navigate("PicturesFromMarker")
    this.props.actions({latitude: lat, longitude: long})


  }

	render(){
		// when click on marker
			// make get request to server for pictures from this location
				// axios.get - pictures
					// where pictures are from this.props.location
		return(
			<MapView.Marker
        onPress={e => this.viewTargetPictures(e)}
        coordinate={this.props.location}>
      </MapView.Marker>
			)
	}
}

const locationDispatch = (dispatch) => {
  return {
    actions: (location) => dispatch(markerAction(location)),
  }
}

export default connect(null, locationDispatch)(Marker)
