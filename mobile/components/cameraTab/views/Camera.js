import React from 'react';
import { View, Text } from 'react-native'

class Camera extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text>This is camera view</Text>
      </View> 
    )
  }
}

export default Camera;