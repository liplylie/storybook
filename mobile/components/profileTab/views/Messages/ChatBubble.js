import React from 'react'
import { View, Text } from 'react-native'

const ChatBubble = (props) => {
  return (
    <View>
      <Text>{props.sender}:{props.message}</Text>
    </View>
  )
}