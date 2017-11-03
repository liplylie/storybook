import { AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk'
import AWS, { Config, CognitoIdentityCredentials } from 'aws-sdk'
import axios from 'axios'
import { fetch } from 'react-native'
import secret from '../../sensitive.json'

AWS.config.region = "us-west-2"

export const getFBToken = () => {
  return function(dispatch) {
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
        dispatch({type: 'USER_AUTHORIZATION_PENDING'});
        AWS.config.credentials.get(() => {
          const authCreds = {
            sessionToken: AWS.config.credentials.sessionToken,
            accessKey: AWS.config.credentials.accessKeyId,
            secretKey: AWS.config.credentials.secretAccessKey,
          }
          dispatch({type: 'USER_AUTHORIZED', payload: authCreds})
        })
      })
      .then(() => {
        let req = new GraphRequest('/me', {
          httpMethod: 'GET',
          version: 'v2.5',
          parameters: {
            'fields': {
              'string': 'name,picture,email'
            }
          }
        }, (err, res) => {
          if (err) {
            dispatch({type: 'USER_INFO_FAIL', payload: err});
          } else {
            const dispatchUser = {
              name: res.name,
              email: res.email,
              profile_image_url: res.picture.data.url
            }
            axios.post(secret.flask_server + 'api/add_user_info', dispatchUser, {
              headers: {
                'Content-Type': 'application/json'
              }
            })
              .then(data => {
                dispatchUser['id'] = data.data.id; 
                dispatch({type: 'USER_INFO_RETRIEVED', payload: dispatchUser});
              })
              .catch(err => {
                axios.get(secret.flask_server + 'api/get_user_info', {
                  params: {
                    email: dispatchUser.email
                  }
                })
                  .then(data => {
                    dispatchUser['id'] = data.data.data[0].userId
                    dispatch({type: 'USER_INFO_RETRIEVED', payload: dispatchUser});
                  })
                  .catch(err => {
                    console.log(err, 'err')
                    dispatch({type: 'USER_INFO_FAIL', payload: err});
                  })
              });
          }
        });
    
        new GraphRequestManager().addRequest(req).start();
      })
      .catch(err => {
        dispatch({type: 'USER_UNAUTHORIZED', payload: err});
      })
  }
}

export const logoutUser = () => {
  return function(dispatch) {
    dispatch({type: 'USER_LOGOUT_PENDING'});
    dispatch({type: 'USER_LOGOUT_FULFILLED'});
  }
}