import AWS from 'aws-sdk';
import { Buffer } from 'buffer';

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
      err ? 
        console.log('Error uploading photo to AWS: ', err)
        : console.log('Successfully uploaded photo: ', data);

        //Send img url (data.Location) to database
    })
  }
}