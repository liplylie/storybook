import React from 'react'
import { View, Text, Button, Image } from 'react-native'

const Request = (props) => {
  return (
    <View> 
      <Text>{this.props.name}</Text>
      <Image>{this.props.img}</Image>
      <Button 
        name="Accept"
        onPress={this.props.acceptRequest(this.props.friendId)}
      /> 
      <Button 
        name="Delete"
        onPress={this.props.deleteRequest(this.props.friendId)}
      />
    </View> 
  )
}

export default Request; 