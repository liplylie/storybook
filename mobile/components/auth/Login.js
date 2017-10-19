import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as AuthActions from '../../actions/authActions.js';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    AccessToken.getCurrentAccessToken()
    .then(data => {
      const { accessToken, userID } = data;
      AWS.config.region = "us-west-2";
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-west-2:ce49614a-87c5-48e2-95c9-343d38075481',
        Logins: {
          'graph.facebook.com': accessToken
        }
      });
    })
    .then(() => {
      AWS.config.credentials.get(function() {
        console.log('aws session token: ', AWS.config.credentials.sessionToken);
        console.log('aws access key Id: ', AWS.config.credentials.accessKeyId);
      })
    })
  }

  render() {
    return (
      <View>
        <LoginButton
          readPermissions={["email","public_profile"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login failed with error: " + result.error);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
                AccessToken.getCurrentAccessToken()
                  .then(data => {
                    const { accessToken, userID } = data;
                    let req = new GraphRequest('/me', {
                      httpMethod: 'GET',
                      version: 'v2.5',
                      parameters: {
                        'fields': {
                            'string' : 'name,picture,email'
                        }
                      }
                      }, (err, res) => {
                          console.log('results: ', res);
                          err ? console.log('error: ', err) : null;
                      }); 
                    new GraphRequestManager().addRequest(req).start();
                    AWS.config.region = "us-west-2";
                    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                      IdentityPoolId: 'us-west-2:ce49614a-87c5-48e2-95c9-343d38075481',
                      Logins: {
                        'graph.facebook.com': accessToken
                      }
                    });
                  })
                  .then(() => {
                    AWS.config.credentials.get(function() {
                      console.log('aws session token: ', AWS.config.credentials.sessionToken);
                      console.log('aws access key Id: ', AWS.config.credentials.accessKeyId);
                    })
                  })
                  .then(() => {
                    let s3 = new AWS.S3({
                      params: {Bucket: 'storybooknativeapp'}
                    })

                    s3.listObjects({Delimiter: '/'}, function(err, data) {
                      if(err) {
                        console.log('s3 error: ', err);
                      } else {
                        console.log('s3 data: ', data);
                      }
                    })
                  })
              }
            }
          }
          onLogoutFinished={() => alert("User logged out")}
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