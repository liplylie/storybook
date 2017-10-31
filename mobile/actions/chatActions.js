import key from '../../sensitive.json'

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

export const getRooms = (userId) => {
  return function(dispatch) {
    axios.get(key.flask_server + '/api/chat/' + userId)
    .then(({ data }) => {
      dispatch({type: 'GET_ALL_ROOMS', payload: data});
    })
    .catch(err => {
      dispatch({type: 'ROOM_LIST_FAIL', payload: err})
    })
  }
}