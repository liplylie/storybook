const initialState = {
  posting: false,
  retrieving: false,
  error: null,
  comments: []
}

const commentReducer = (state=initialState, action) => {
  switch(action.type) {
    case "POSTING_COMMENT": {
      return Object.assign({}, state, {
        posting: true,

      })
    }
    case "POSTED_COMMENT": {
      return Object.assign({}, state, {
        posting: false,
      })
    }
    case "POSTING_FAILED": {
      return Object.assign({}, state, {
        posting: false,
        error: action.payload
      })
    }
    case "GETTING_COMMENT": {
      return Object.assign({}, state, {
        retrieving: true
      })
    }
    case "GOT_COMMENT": {
      return Object.assign({}, state, {
        retrieving: false,
        comments: action.payload
      })
    }
    case "GET_COMMMENT_FAILED": {
      return Object.assign({}, state, {
        retrieving: false,
        error: action.payload
      })
    }
    default: {
      return state
    }
  }
}

export default commentReducer;