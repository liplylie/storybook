import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import LoginView from './login.js';

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image 
          style={styles.image}
          resizeMethod='resize'
          resizeMode='contain'
          source={require('../logo.jpg')} 
        />
        <LoginView />
      </View>
    );
  }
}

export default App;

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