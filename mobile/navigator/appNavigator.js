import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'

import { addNavigationHelpers, StackNavigator, NavigationActions } from 'react-navigation'

export const AppNavigator = StackNavigator(
  {
    Login: { 
      screen: LoginView,
    },
    Signup: {
      screen: SignupView,
    },
  },
  {
    headerMode: 'screen',
  }
)

class AppNav extends Component {
  constructor(props) {
    super(props); 
  }

  //componentWillMount()

  //componentWillUnmount

  //onBackPress()

  render() {
    const { dispatch, nav } = this.props;
    return <AppNavigator navigator={addNavigationHelpers({ dispatch, store: nav })} />
  }
}

const mapStateToProps = (store) => ({
  nav: store.Nav,
});

export const App = connect(mapStateToProps)(AppNav);
  