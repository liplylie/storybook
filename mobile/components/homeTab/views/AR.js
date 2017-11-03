import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
// import { ARKit } from 'react-native-arkit';
import { connect } from 'react-redux';
import AREntries from './AREntries';
import axios from 'axios';
import key from '../../../../sensitive.json'

const PythonServer = key.flask_server

class ARView extends Component {
  constructor(props){
    super(props)
    this.state = {
      images: []
    }
  }

  componentDidMount(){
    let that = this;
    let userId = this.props.screenProps
    axios.get(PythonServer + 'api/get_all_images_by_user', {
      params:{
        userId: userId
      }
    })
    .then(function ({data}) {
      console.log( data, 'data from UserPhotos axios');
      that.setState({
        images:[...data.data]
      })
     })
    .catch(function (error) {
      console.log(error, 'error from UserPhotos');
    });
    console.log(this.images, 'thisimages in componentDidMount')
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
