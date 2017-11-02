import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

const Comment = (props) => (
  <View>
    <View>
      <Image source={{uri: props.comment.profileImage}} style={{height:30, width: 30, borderRadius: 20, marginLeft: 3}} />
    </View>
    <View>
      <Text style={{fontWeight: 'bold'}}>{props.comment.userName}{" "}<Text style={{fontWeight: 'normal', fontSize: 12}}>{props.comment.comment}</Text></Text>
    </View>
  </View>
)

export default Comment;