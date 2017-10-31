import axios from 'axios';

export const getComments = (imageId) => {
  return function(dispatch) {
    dispatch({type: "GETTING_COMMENT"})
    axios.get('djfa' + imageId)
      .then(data => {
        console.log('I am data: ', data);
        // dispatch({type: "GOT_COMMENT", payload: data.data})
      })
      .catch(err => {
        console.log('Error getting comments from server: ', err);
        dispatch({type: "GET_COMMENT_FAILED", payload: err});
      })
  }
}

export const postComments = (commentObj) => {
  dispatch({type: "POSTING_COMMENT"});
  return function(dispatch) {
    axios.post('asdlkfasdl', commentObj)
      .then(data => {
        console.log('Successfully posted comment and got back: ', data);
        dispatch({type: "POSTED_COMMENT"});
      })
      .catch(err => {
        console.log('Error posting comment to server: ', err);
        dispatch({type: "POSTING_FAILED"});
      })
  }
}