const initialState = {
  uploading: false,
  image: null,
}

const cameraPostReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'SAVE_IMAGE': {
      return Object.assign({}, state, {
        image: action.payload,
      })
    }
    default: {
      return state
    }
  }
}

export default cameraPostReducer;