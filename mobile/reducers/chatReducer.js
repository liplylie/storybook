const initialState = {
  currentRoom: ''
}

const chatReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'ENTER_ROOM': {
      return Object.assign({}, state, {
        currentRoom: action.payload,
      })
    }
    case 'EXIT_ROOM': {
      return Object.assign({}, state, {
        currentRoom: '',
      })
    }
    default: {
      return state
    }
  }
}     

export const getRooms = (userId) => {
  return function(dispatch) {
    axios.get('/api/chat/' + userId)
    .then(({ data }) => {
      dispatch({type: 'GET_ALL_ROOMS', payload: data});
    })
    .catch(err => {
      dispatch({type: 'ROOM_LIST_FAIL', payload: err})
    })
  }
}


export default chatReducer;