import React from 'react'
import { View, Text, Button, Image } from 'react-native'

const Request = (props) => (
    <View> 
      <Text>{props.name}</Text>
      <Image>{props.img}</Image>
      <Button 
        title="Accept"
        /* onPress={props.acceptRequest(props.friendId)} */
      /> 
      <Button 
        title="Delete"
        /* onPress={props.deleteRequest(props.friendId)} */
      />
    </View> 
)

export default Request; 