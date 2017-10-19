const initialState = {
  authorizing: false,
  authorized: false,
}

const authReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'USER_AUTHORIZATION_PENDING': {
      return Object.assign({}, state, {
        authorizing: true,
      })
    }
    case 'USER_AUTHORIZED': {
      return Object.assign({}, state, {
        authorizing: false,
        authorized: true,
        
      });
    }
    case 'USER_UNAUTHORIZED': {
      return Object.assign({}, state, {
        authorizing: false,
      })
    }
    default: {
      return state;
    }
  }
}

export default authReducer;