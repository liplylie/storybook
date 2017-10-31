const initialState = {
  friends: [],
  err: ''
}

const FriendsReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'GET_FRIEND_LIST': {
      return Object.assign({}, state, {friends: action.payload} )
    }
    case 'FRIEND_LIST_FAIL': {
      return Object.assign({}, state, {err: action.payload} )
    }
    default: {
      return state; 
    }
  }
}

export default FriendsReducer; 