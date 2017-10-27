export const enterRoom = (roomId) => {
  return function(dispatch) {
    dispatch({type: 'ENTER_ROOM', payload: roomId});
  }
}

export const exitRoom = (roomId) => {
  return function(dispatch) {
    dispatch({type: 'EXIT_ROOM', payload: roomId});
  }
}
