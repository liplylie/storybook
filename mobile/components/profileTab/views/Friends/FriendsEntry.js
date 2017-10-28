import React from 'react'
import { View, Text, Image, Button } from 'react-native'


const FriendsEntry = (props) => {
  if (props.friends.includes(props.id)) {
    return (
      <View>
        <Image
          source={props.img}
        />
        <Text>{props.name}</Text> 
      </View> 
    )
  } else {
    return (
      <View>
        <Image
          source={props.img}
        />
        <Text>{props.name}</Text> 
        <Button
          title="Add friend"
          onPress={() => this.props.sendRequest(props.id)}
        /> 
      </View> 
    )
  }
}

export default FriendsEntry; 