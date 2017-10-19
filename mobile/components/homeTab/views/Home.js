import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

<<<<<<< HEAD
import Login from '../../auth/Login.js'
=======
import LoginView from '../../login'
import SignupView from '../../signup';
>>>>>>> Add Python and pip.

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image 
          style={styles.image}
          resizeMethod='resize'
          resizeMode='contain'
          source={require('../../../logo.jpg')} 
        />
        <Text>Yes, This is Home View</Text>
        <Login />
      </View>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: 400,
    height: 200
  }
});