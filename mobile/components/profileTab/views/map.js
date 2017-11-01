/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native';
import Marker from './Marker.js'
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import userLocation from '../../../actions/userLocationAction.js'
import axios from 'axios'
import parser from '../../../parser.js'
import key from '../../../../sensitive.json'


const { width, height } =  Dimensions.get('window');
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const PythonServer = key.flask_server

class UserMap extends Component {
  constructor(props){
    super(props)
    console.log(props,'usermap props')
    this.state = {
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      },
      markerPosition: {
        latitude: 0,
        longitude: 0,
      }
    }
    this.location = [];
    this.viewTargetPictures = this.viewTargetPictures.bind(this)
    this.viewUserMarkers = this.viewUserMarkers.bind(this)
    this.viewWorldMarkers = this.viewWorldMarkers.bind(this)
  }

  markerID: ?number = null;

  componentDidMount(){

    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude);
      var long = parseFloat(position.coords.longitude);
      var initialRegion={
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
      this.setState({initialPosition: initialRegion})
      this.setState({markerPosition: initialRegion})
    }, 
    (error) => alert(JSON.stringify(error)),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 })
    
    this.watchID = navigator.geolocation.watchPosition((position) =>{
      var lat = parseFloat(position.coords.latitude);
      var long = parseFloat(position.coords.longitude);
      var initialRegion={
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
      this.props.actions({latitude: lat, longitude: long})
      this.setState({initialPosition: initialRegion})
      this.setState({markerPosition: initialRegion})
    })
    // change this with api/get_all_locations_for_user
      // add filter button that gets all locations
    var that = this
    axios.get(`${PythonServer}api/get_all_locations`)
    .then(function (data) {
      console.log(data, 'api map response');
      // const locations = data.data
      // that.location = [...locations]
    })
    .catch(function (error) {
      console.log(error, 'api map response');
    })
  }
      
  componentWillUnmount(){
    navigator.geolocation.clearWatch(this.watchID)
  }


  viewTargetPictures(){
    // clicking here renders ar view. Leave commented unless ar kit is installed
    this.props.navigation.navigate("ARView")
  }

  viewUserMarkers(){
    console.log('userMarkers')
    // send get request for all locations from user
    // let userId = this.props.profileInfo.userId
    // api/get_all_locations_for_user
      // put user id in request

  }

  viewWorldMarkers(){
    console.log('worldMarker')
    // var that = this
    // axios.get(`${PythonServer}api/get_all_locations`)
    // .then(function (data) {
    //   console.log(data, 'api map response');
    //   // const locations = data.data
    //   // that.location = [...locations]
    // })
    // .catch(function (error) {
    //   console.log(error, 'api map response');
    // })
  }

  render() {
     console.log(this.location, 'this location')
    return (
      <View style={styles.container}>
        <View style={styles.filterButtonContainer}>
          <TouchableOpacity style={{flex:1}} onPress={this.viewUserMarkers}><Image style={styles.filterButtons} source={require('../../../image_icon.png')}/></TouchableOpacity>
          <TouchableOpacity style= {{flex:1}} onPress={this.viewWorldMarkers}><Image style={styles.filterButtons} source={require('../../../worldIcon.png')}/></TouchableOpacity>
        </View>
        <MapView
          style={styles.map}
           region={this.state.initialPosition}>
          <MapView.Marker
            id = 'userMarker'
            onPress={this.viewTargetPictures}
            coordinate={this.state.markerPosition}>
              <View style={styles.radius}>
                <View style={styles.marker}/>
              </View>
          </MapView.Marker>
         {this.location.map((element, i) => {
          return <Marker key={i} location={element} navigation={this.props.navigation}/>
         })}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    left: 0,
    right: 0,
    bottom: 0,
    top: 30,
    position: 'absolute'
  },
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
  },
  filterButtonContainer:{
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'azure'
  },
  filterButtons:{
    height: 20,
    width: 20,
    alignSelf: 'center',
    marginTop: 5,
  }
});

const mapStateToProps = (store) =>{
  console.log(store, 'map js state')
 
  return {
    profileInfo: store
  }
}

const mapDispatch = (dispatch) => {
  return {
    actions: (location) => dispatch(userLocation(location)),
  }
}

export default connect(mapStateToProps, mapDispatch)(UserMap)

