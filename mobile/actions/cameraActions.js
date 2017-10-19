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