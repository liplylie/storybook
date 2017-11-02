import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native'
import { Card, Button, Icon } from 'react-native-elements'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import axios from 'axios'
import parser from '../../../../parser'

import Marker from '../../../profileTab/views/Marker'
import MapView from 'react-native-maps'
import userLocation from '../../../../actions/userLocationAction'

const { width, height } =  Dimensions.get('window');
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const PythonServer = key.flask_server

import key from '../../../../../sensitive.json'

class FriendProfile extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.name}'s Map`,
    headerRight: <Icon name='message' type='entypo' onPress={() => navigation.goBack()} style={styles.header} />  
  });

  constructor(props) {
    super(props);
    this.state = {
      added: false,
      friend: true,
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

  componentDidMount() {
    if (this.props.navigation.state.params.type === "result") {
      for (let i = 0; i < this.props.friends.length; i++) {
        if (this.props.navigation.state.params.friendId !== this.props.friends[i].id) {
          this.setState({friend: false});
        }
      }
    }
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
    axios.get(`http://localhost:5000/api/get_all_locations`)
    .then(function ({data}) {
      console.log(data, 'api map response');
      const locations = data.data
      console.log(locations, 'location from api')
      that.location = [...locations]
    })
    .catch(function (error) {
      console.log(error, 'api map response');
    })
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  sendRequest(friendId) {
    axios.post('http://localhost:5000/api/add_friend', {
      friendId: friendId,
      // userId: this.screenProps,
      userId: 1
    })
    .then(({ data }) => {
      console.log('Success sending request', data);
    })
    .catch(err => {
      console.log('Request failed', err);
    })
  }
  
  addFriend() {
    axios.post('http://localhost:5000/' + 'api/add_friend', {
      userId: this.props.navigation.state.params.friendId,
      friendId: this.screenProps
    })
  }

  deleteFriend() {
    //axios.post(key.flask_server + 'api/remove_friend', {
    axios.post('http://localhost:5000/'+ 'api/remove_friend', {
      userId: this.screenProps,
      friendId: this.props.navigation.state.params.friendId
    })
  }

  blockFriend() {
    //axios.post(key.flask_server + 'api/block_friend', {
    axios.post('http://localhost:5000/'+ 'api/block_friend', {
      userId: this.screenProps,
      friendId: this.props.navigation.state.params.friendId
    })
  }

  viewTargetPictures() {
    // clicking here renders ar view. Leave commented unless ar kit is installed
    this.props.navigation.navigate("ARView")
  }

  viewUserMarkers() {
    console.log('userMarkers')
    // send get request for all locations from user
    // let userId = this.props.profileInfo.userId
    // api/get_all_locations_for_user
      // put user id in request

  }

  viewWorldMarkers() {
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
    if (!this.state.friend) {
      return (
        <Card
          title='Daniel'
          //title=this.props.state.params.name
          image={{uri: "https://cdn.pixabay.com/photo/2016/09/07/16/38/portrait-1652023_960_720.jpg"}}>
          <Text style={{marginBottom: 10}}>
            Bio?
          </Text>
          <Button
            backgroundColor='#03A9F4'
            //fontFamily='Lato'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title={this.state.added ? 'Request sent' : 'Add friend'} 
            onPress={() => {
              this.addFriend();
              this.setState({added: !this.state.added})
            }}
            /* onPress={this.addFriend(this.props.navigation.state.params.userId)} */
            icon={{name: 'plus', type: 'entypo'}} />
        </Card>
      )
    } else {
      return (
        <View style={styles.container}>
        <View style={styles.filterButtonContainer}>
          <TouchableOpacity style={{flex:1}} onPress={this.viewUserMarkers}><Image style={styles.filterButtons} source={require('../../../../../mobile/image_icon.png')}/></TouchableOpacity>
          <TouchableOpacity style= {{flex:1}} onPress={this.viewWorldMarkers}><Image style={styles.filterButtons} source={require('../../../../../mobile/worldIcon.png')}/></TouchableOpacity>
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
      )
    }
  }
}

//  const userDispatch = (dispatch) => {
//    return {
//      actions: bindActionCreators(userActions, dispatch)
//    }
//  }

const mapStateToProps = (store) =>{
  return {
    profileInfo: store,
    friends: store.Chat.friends
  }
}

const mapDispatch = (dispatch) => {
  return {
    actions: (location) => dispatch(userLocation(location)),
  }
}

export default connect(mapStateToProps, mapDispatch)(FriendProfile)


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
    top: 40,
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
    marginTop: 10,
  }
});


