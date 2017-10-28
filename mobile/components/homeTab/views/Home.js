import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';
import Collection from './Collection';
import { connect } from 'react-redux';
import Spinner from 'react-native-spinkit';


//import Login from '../../auth/Login.js'

class Home extends Component {
  render(){
    if (this.props.profileInfo.userLocation){
      let location = this.props.profileInfo.userLocation;
      return (
          <View style={styles.container}>
              <View style={styles.title}> 
                <Image 
                  style={styles.image}
                  resizeMethod='resize'
                  resizeMode='contain'
                  source={require('../../../logo.jpg')} 
                />
              </View>
              <View style={styles.collection}>
                <Collection location={location}/>
              </View>
          </View>
      );
    } else {
      return (
        <View style={styles.spinnerContainer}>
          <Spinner type='FadingCircle' style={styles.spinner}/>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: 'center'
  },
  title:{
    flexDirection: 'column',
  },
  image: {
    width: 250,
    height: 50,
    margin: 2,
    padding: 5
  },
  collection: {
    backgroundColor: 'skyblue',
    flex:1
  },
  spinnerContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner:{
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = (store) =>{
 
  return {
    profileInfo: store.Profile
  }
}


export default connect(mapStateToProps, null)(Home)