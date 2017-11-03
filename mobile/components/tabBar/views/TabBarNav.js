import React, { Component } from 'react'
import { addNavigationHelpers } from 'react-navigation'
import { TabBarNavigator } from '../navigationConfig'
import { connect } from 'react-redux'

class TabBarNav extends Component {
 
  render() {
    const { dispatch, tabBarState } = this.props
    return (
      <TabBarNavigator
        navigation={
          addNavigationHelpers({
            dispatch: dispatch,
            state: tabBarState,
          })
        }
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
   tabBarState: state.TabBar
   }
 }

export default connect(mapStateToProps)(TabBarNav)