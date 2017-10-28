import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { ARKit } from 'react-native-arkit';

// debug={true}
          // onPlaneDetected={console.log} // event listener for plane detection
          // onPlaneUpdate={console.log} // event listener for plane update
export default class ARView extends Component {
  render() {
  	return (
  		<View style={{ flex: 1 }}> 
  		  <ARKit
          style={{ flex: 1}}
          //lightEstimation
          
        >
  			<ARKit.Sprite position={{ x: 0, y: 0, z: -0.5 }}>
          <Image source={{uri:"https://www.gstatic.com/webp/gallery/1.sm.jpg"}} style={{height: 100, width: 100}}/>
        </ARKit.Sprite>

        <ARKit.Sprite position={{ x: 0, y: 0, z: -0.3 }}>
          <Text> ar sprite text</Text>
        </ARKit.Sprite> 
        
        </ARKit>
      </View>
    );
  }
}
