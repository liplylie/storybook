import React, { Component } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { LoginButton } from 'react-native-fbsdk';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    <View>
      <LoginButton
        publishPermissions={["publish_actions"]}
        onLoginFinished={
          (error, result) => {
            if (error) {
              alert("Login failed with error: " + result.error);
            } else if (result.isCancelled) {
              alert("Login was cancelled");
            } else {
              alert("Login was successful with permissions: " + result.grantedPermissions)
            }
          }
        }
        onLogoutFinished={() => alert("User logged out")}/>
    </View>
  }
}

export default Login;

const styles = StyleSheet.create({

});