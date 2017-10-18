import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import LoginView from '../../auth/login.js';
import SignupView from '../../auth/signup.js';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {} = this.props;

    let showLogin = true;

    return (
      <View style={styles.container}>
        <Image 
          style={styles.image}
          resizeMethod='resize'
          resizeMode='contain'
          source={require('../../../logo.jpg')} 
        />
        {showLogin ? <LoginView /> : <SignupView />}
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