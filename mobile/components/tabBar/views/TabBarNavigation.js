import React from 'react'

import { addNavigationHelpers } from 'react-navigation'
import { TabBar } from '../navigationConfiguration'

import { connect } from 'react-redux'

class TabBarNavigation extends React.Component {
render(){
    const { dispatch, navigationState } = this.props
    return (
      <TabBar
        navigation={
          addNavigationHelpers({
            dispatch: dispatch,
            state: navigationState,
          })
        }
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
   navigationState: state.tabBar,
   }
 }

export default connect(mapStateToProps)(TabBarNavigation)