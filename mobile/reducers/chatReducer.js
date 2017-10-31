const initialState = {
  currentRoom: '', 
  rooms: []
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



export default chatReducer;