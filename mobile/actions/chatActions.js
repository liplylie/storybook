import key from '../../sensitive.json'
import axios from 'axios'

export const enterRoom = (roomId) => {
  return function(dispatch) {
    dispatch({type: 'ENTER_ROOM', payload: roomId});
  }
}

export const exitRoom = (roomId) => {
  return function(dispatch) {
    dispatch({type: 'EXIT_ROOM', payload: ''});
  }
}

// export const getRooms = (userId) => {
//   return function(dispatch) {
//     axios.get(key.flask_server + 'api/chat/' + userId)
//     .then(({ data }) => {
//       dispatch({type: 'GET_ALL_ROOMS', payload: data});
//     })
//     .catch(err => {
//       dispatch({type: 'ROOM_LIST_FAIL', payload: err})
//     })
//   }
// }


export const getFriends = (userId) => {
  return function(dispatch) {
    axios.get(key.flask_server + 'api/get_all_friends?userId=' + userId)
    .then((response) => {
      dispatch({type: 'GET_FRIEND_LIST', payload: response.data.data});
    })
    .catch(err => {
      dispatch({type: 'FRIEND_LIST_FAIL', payload: err})
    })
  }
}

export const getPreview = (userId, friendId) => {
  return function(dispatch) {
    axios.get(key.flask_server + 'api/get_last_message?senderId=' + userId + '&recipientId=' + friendId)
    .then((response) => {
      dispatch({type: 'GET_CHAT_PREVIEW', payload: response.data});
    })
    .catch(err =>{ 
      dispatch({type: 'GET_PREVIEW_FAILED', payload: response.err});
    })
  }
}