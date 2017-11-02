import axios from 'axios';

export const getComments = (imageId) => {
  return function(dispatch) {
    dispatch({type: "GETTING_COMMENT"})
    axios.get('http://localhost:5000/api/get_all_comments_by_image?imageId=' + imageId)
      .then(data => {
        console.log('I am data: ', data.data);
        dispatch({type: "GOT_COMMENT", payload: data.data.data})
      })
      .catch(err => {
        console.log('Error getting comments from server: ', err);
        dispatch({type: "GET_COMMENT_FAILED", payload: err});
      })
  }
}

export const postComments = (commentObj) => {
  return function(dispatch) {
    dispatch({type: "POSTING_COMMENT"});
    axios.post('http://localhost:5000/api/add_comment', commentObj, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
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