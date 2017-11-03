import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { ARKit } from 'react-native-arkit';
import { connect } from 'react-redux';
import AREntries from './AREntries';
import axios from 'axios';

class ARView extends Component {
  constructor(props){
    super(props)
    this.state = {
      images: ['https://avatars2.githubusercontent.com/u/5573488?s=460&v=4', 'https://avatars3.githubusercontent.com/u/19437498?s=460&v=4', 'https://avatars1.githubusercontent.com/u/28817645?s=460&v=4','https://avatars1.githubusercontent.com/u/8886222?s=460&v=4']
    }
  }

  componentDidMount(){
    console.log(this.props, 'ar props')
    let latitude = this.props.location.latitude
    let longitude = this.props.location.longitude
    let that = this
    axios.get('http://localhost:5000/api/get_imgs_by_loc', {
      params:{
        latitude: latitude,
        longitude: longitude
      }
    })
    .then(response=>{
      console.log(response, 'react-native-arkit imgs at location')
      that.setState({
        images: [...response.data.data]
      })
    })
    .catch(err => {
      console.log(err, 'err from ar kit imgs at location')
    })
  }
  render() {
    console.log(this.state.images, 'ar kit images')
  	return (
  		<View style={{ flex: 1 }}> 
  		  <ARKit
          style={{flex: 1}}
          lightEstimation 
          focusScene
        >
        {this.state.images.map((image,i)=>{
          return <AREntries key={i} x={i} image={image.imageUrl} />
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
