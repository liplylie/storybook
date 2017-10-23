import AWS from 'aws-sdk';

export const saveImage = (image) => {
  return function(dispatch) {
    dispatch({type: 'SAVE_IMAGE', payload: image});
  }
}

export const postImage = (obj, creds) => {
  return function(dispatch) {
    let s3 = new AWS.S3({
      params: {Bucket: 'storybooknativeapp'}
    })
  
    let albumPhotosKey = encodeURIComponent('pictures') + '/' + creds.accessKey + '/';
    let photoKey = albumPhotosKey + obj.name;
    
    s3.upload({
      Key: photoKey,
      Body: obj.image.data,
      ACL: 'public-read',
      ContentType: obj.image.mime
    }, (err, data) => {
      err ? 
        console.log('Error uploading photo to AWS: ', err)
        : console.log('Successfully uploaded photo: ', data);
    })
  }
}
