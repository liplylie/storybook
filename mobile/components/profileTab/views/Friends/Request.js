import React from 'react'
import { View, Text, Button, Image } from 'react-native'

const Request = ({ fnd }) => (
    <View> 
      <Text>{fnd}</Text>
      {/* <Image>{this.props.img}</Image> */}
      <Button 
        title="Accept"
        /* onPress={this.props.acceptRequest(this.props.friendId)} */
      /> 
      <Button 
        title="Delete"
        /* onPress={this.props.deleteRequest(this.props.friendId)} */
      />
    </View> 
)

export default Request; 