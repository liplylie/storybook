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
          lightEstimation 
          focusScene
        >
	  			<ARKit.Sprite position={{ x: 0, y: 0, z: -2}}>
	          <Image source={{uri:"https://www.gstatic.com/webp/gallery/1.sm.jpg"}} style={{height: 200, width: 200}}/>
	        </ARKit.Sprite>

        </ARKit>
      </View>
    );
  }
}
