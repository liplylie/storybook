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

import Login from '../../auth/login.js'

const Home = (props) => {
  console.log(props, 'home props')
    if (props.profileInfo.userLocation){
      let location = props.profileInfo.userLocation;
      return (
          <View style={styles.container}>
            <View>
              <Login />
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
        <View>
        </View>
        )
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: 400,
    height: 100
  },
  collection: {
    backgroundColor: 'skyblue',
    flex:1
  }
});

const mapStateToProps = (store) =>{
 
  return {
    profileInfo: store.Profile
  }
}


export default connect(mapStateToProps, null)(Home)