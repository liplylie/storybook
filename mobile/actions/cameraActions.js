import AWS from 'aws-sdk';

export const saveImage = (image) => {
  return function(dispatch) {
    dispatch({type: 'SAVE_IMAGE', payload: image});
  }
}

export const postImage = (obj) => {
  let s3 = new AWS.S3({
    params: {Bucket: 'storybooknativeapp'}
  })
  
  s3.listObjects({Delimiter: '/'}, function(err, data) {
    if(err) {
      console.log('s3 error: ', err);
    } else {
      console.log('s3 data: ', data);
    }
  })
}
