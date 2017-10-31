import AWS from 'aws-sdk';
import { Buffer } from 'buffer';
import axios from 'axios';

export const saveImage = (image) => {
  return function(dispatch) {
    dispatch({type: 'SAVE_IMAGE', payload: image});
  }
}

export const postImage = (obj) => {
  return function(dispatch) {
    let s3 = new AWS.S3({
      params: {Bucket: 'storybooknativeapp'}
    })
  
    let albumPhotosKey = encodeURIComponent('pictures') + '/' + obj.userId + '/';
    let photoKey = albumPhotosKey + obj.name;
    
    s3.upload({
      Key: photoKey + '.jpg',
      Body: new Buffer(obj.image.data, 'base64'),
      ACL: 'public-read',
      ContentType: obj.image.mime
    }, (err, data) => {
      if(err) {
        console.log('Error uploading photo to AWS: ', err)
      } else if(data) {
        console.log('Successfully uploaded photo: ', data);
        let url = data.Location
        let id = obj.userId
        let caption = obj.description
        let imageTags = obj.name
        let latitude = obj.location.latitude
        let longitude = obj.location.longitude
        const image_post = {
          url: url,
          image_user_id: id,
          latitude: latitude,
          longitude: longitude,
          likes_count: 0,
          caption: caption,
          image_tags: imageTags
        }

        // get long and lat from store 
        axios.post('http://localhost:5000/api/add_image', image_post, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
        //Send img url (data.Location) to database
      }
    })
  }
}

// {
//   "url": "adsffad",
//   "image_user_id":"afds",
//   "latitude": 1,
//   "longitude":1,
//   "likes_count": 1,
//   "caption": "afs",
//    "image_tags": 'asdf'
// }