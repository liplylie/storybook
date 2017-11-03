import axios from 'axios';
import secret from '../../sensitive.json'

export const getComments = (imageId) => {
  return function(dispatch) {
    dispatch({type: "GETTING_COMMENT"})
    axios.get(secret.flask_server+'api/get_all_comments_by_image?imageId=' + imageId)
      .then(data => {
        dispatch({type: "GOT_COMMENT", payload: data.data.data})
      })
      .catch(err => {
        dispatch({type: "GET_COMMENT_FAILED", payload: err});
      })
  }
}

export const postComments = (commentObj) => {
  return function(dispatch) {
    dispatch({type: "POSTING_COMMENT"});
    axios.post(secret.flask_server + 'api/add_comment', commentObj, {
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