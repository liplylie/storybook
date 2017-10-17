import React, { Component } from 'react';
import FontAwesome, { Icons } from 'react-native-fontawesome';

class Camera extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;
    
    return (
      <ActionButton buttonColor="rgba(205, 178, 135, 1)" position="right">
        <ActionButton.Item buttonColor="rgba(205, 178, 135, 1)"
          onPress={() => {
            navigation.navigate('Cart')
        }}>
          <FontAwesome>{Icons.shoppingCart}</FontAwesome>
        </ActionButton.Item>
        <ActionButton.Item buttonColor="rgba(205, 178, 135, 1)">
          <FontAwesome>{Icons.userMd}</FontAwesome>
        </ActionButton.Item>
      </ActionButton>
    )
  }
}

export default ActionBtn;