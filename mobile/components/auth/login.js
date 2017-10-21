import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, Button, AlertIOS } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LoginButton } from 'react-native-fbsdk';

import * as AuthActions from '../../actions/authActions.js';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.actions.getFBToken();
  }

  render() {
    const { authorized, actions }  = this.props;

    return (
      <View>
        <LoginButton
          readPermissions={["email","public_profile"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log('Error logging in to FB: ', error);
                AlertIOS.alert(
                  '',
                  'Error Logging Into Facebook'
                )
              } else if (result.isCancelled) {
                AlertIOS.alert(
                  '',
                  'Log in was cancelled'
                )
              } else {
                actions.getFBToken();
              }
            }
          }
          onLogoutFinished={() => {
            actions.logoutUser();
            AlertIOS.alert(
              '',
              "User logged out"
            )}
          }
        />
      </View>
    )
  }
}

const loginState = (state) => {
  return {
    authorizing: state.Auth.authorizing,
    authorized: state.Auth.authorized,
  }
}

const loginDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(AuthActions, dispatch),
  }
}

export default connect(loginState, loginDispatch)(Login);

const styles = StyleSheet.create({

});