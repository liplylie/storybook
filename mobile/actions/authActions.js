import { AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import AWS, { Config, CognitoIdentityCredentials } from 'aws-sdk';

import secret from '../../sensitive.json';

AWS.config.region = "us-west-2";

export const getFBToken = () => {
  return function(dispatch) {
    dispatch({type: 'USER_AUTHORIZATION_PENDING'});
    AccessToken.getCurrentAccessToken()
      .then(data => {
        const { accessToken, userID } = data;
        AWS.config.credentials = new CognitoIdentityCredentials({
          IdentityPoolId: secret.AWS_IDENTITY_ID,
          Logins: {
            'graph.facebook.com': accessToken
          }
        });
      })
      .then(() => {
        AWS.config.credentials.get(() => {
          const authCreds = {
            sessionToken: AWS.config.credentials.sessionToken,
            accessKey: AWS.config.credentials.accessKeyId,
          }
          dispatch({type: 'USER_AUTHORIZED', payload: authCreds})
        })
      })
      .catch(err => {
        dispatch({type: 'USER_UNAUTHORIZED', payload: err});
      })
  }
}

export const getUserInfo = () => {
  return function(dispatch) {
    let req = new GraphRequest('/me', {
      httpMethod: 'GET',
      version: 'v2.5',
      parameters: {
        'fields': {
          'string': 'name,picture,email'
        }
      }
    }, (err, res) => {
      err ? dispatch({type: 'USER_INFO_FAIL', payload: err})
        : null;

      res ? dispatch({type: 'USER_INFO_RETRIEVED', payload: res}) : null;
    });

    new GraphRequestManager().addRequest(req).start();
  }
}

export const logoutUser = () => {
  return function(dispatch) {
    dispatch({type: 'USER_LOGOUT_FULFILLED'});
  }
}