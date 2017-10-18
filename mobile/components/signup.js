import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import AWS, { Config, CognitoIdentityCredentials } from 'aws-sdk';
import { AuthenticationDetails, CognitoUser, CognitoUserPool, CognitoUserAttribute } from 'react-native-aws-cognito-js';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      pw: '',
    }
  }

  render() {
    const { email, name, pw } = this.state;

    AWS.config.region = "us-west-2";

    console.log('email: ', email, 'name: ', name, 'pw: ', pw)
    return (
      <View>
        <Text style={{textAlign: 'center'}}>SignUp</Text>
        <TextInput
          style={{width: 200}}
          onChangeText={(text) => this.setState({email: text})}
          placeholder="Email goes here"
        />
        <TextInput
          style={{width: 200}}
          onChangeText={(text) => this.setState({name: text})}
          placeholder="Username goes here"
        />
        <TextInput
          style={{width: 200}}
          secureTextEntry={true}
          onChangeText={(text) => this.setState({pw: text})}
          placeholder="Password"
        />
        <Button
          title="Sign Up"
          onPress={() => {
            const authData = {
              Username: name,
              Email: email,
              Password: pw,
            }
        
            const authDetails = new AuthenticationDetails(authData);
        
            const poolData = {
              UserPoolId: 'us-west-2_kSIFKOzYd',
              ClientId: '77nr2enj8fs03f2iouq9dbt3a'
            }
            
            const userPool = new CognitoUserPool(poolData);
        
            const userData = {
              Username: name,
              Pool: userPool
            }
        
            const cognitoUser = new CognitoUser(userData);

            cognitoUser.authenticateUser(authDetails, {
              onSuccess: (result) => {
                console.log('access token: ', result.getAccessToken().getJwtToken());
                Config.credentials = new CognitoIdentityCredentials({
                  IdentityPoolId: 'us-west-2:ce49614a-87c5-48e2-95c9-343d38075481',
                  Logins: {
                    [`cognito-idp.us-west-2.amazonaws.com/us-west-2_kSIFKOzYd`]: result.getIdToken().getJwtToken()
                  }
                });
                alert('Success');
                console.log(Config.credentials);
              }
            })
          }}
        />
      </View>
    )
  }
}

export default Signup;