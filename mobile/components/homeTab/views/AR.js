import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { ARKit } from 'react-native-arkit';
import { connect } from 'react-redux'
import AREntries from './AREntries'
// debug={true}
          // onPlaneDetected={console.log} // event listener for plane detection
          // onPlaneUpdate={console.log} // event listener for plane update
class ARView extends Component {
  constructor(props){
    super(props)
    this.state = {
      images: []
      //images: ["https://www.gstatic.com/webp/gallery/1.sm.jpg", "https://www.gstatic.com/webp/gallery/1.sm.jpg", "https://www.gstatic.com/webp/gallery/1.sm.jpg", "https://www.gstatic.com/webp/gallery/1.sm.jpg"]
    }
  }
  componentDidMount(){
    console.log(this.props, 'ar props')
    let latitude = this.props.location.latitude
    let longitude = this.props.location.longitude
    // make axios request for images at location
      // axios.get('/api/get_imgs_by_loc', location)
  }
  render() {
  	return (
  		<View style={{ flex: 1 }}> 
  		  <ARKit
          style={{flex: 1}}
          lightEstimation 
          focusScene
        >
        {this.state.images.map((image,i)=>{
          return <AREntries key={i} x={i} image={image} />
        })}
        </ARKit>
      </View>
    );
  }
}

const arState = (state) => {
  return {
    location: state.Profile.userLocation
  }
}

export default connect(arState, null)(ARView)
