import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

export const Comment = (props) => (
  <View>
    <View>
      {/* User Profile Image goes here */}
    </View>
    <View>
      <Text style={styles.userCommentName}> {'SquidWard' } <Text style={styles.userComment}> {"I hate you SpongeBob"} </Text></Text>
    </View>
  </View>
)