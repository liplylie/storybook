const initialState = {
  currentRoom: '', 
  rooms: [
    {name: "Daniel Chong", img: "https://0.soompi.io/wp-content/uploads/2016/01/26035801/han-seung-yeon.png", message: "Please talk to me"}, 
  ],
  friends: [
  //   {name: "Daniel Chong", img: "https://cdn.pixabay.com/photo/2016/09/07/16/38/portrait-1652023_960_720.jpg"}, 
  //   {name: "Daniel Chong", img: "https://cdn.pixabay.com/photo/2016/09/07/16/38/portrait-1652023_960_720.jpg"}, 
  //   {name: "Daniel Chong", img: "https://cdn.pixabay.com/photo/2016/09/07/16/38/portrait-1652023_960_720.jpg"}, 
  //   {name: "Daniel Chong", img: "https://cdn.pixabay.com/photo/2016/09/07/16/38/portrait-1652023_960_720.jpg"}
  ],
  err: '', 
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
    case 'GET_FRIEND_LIST': {
      return Object.assign({}, state, {friends: action.payload})
    }
    case 'FRIEND_LIST_FAIL': {
      return Object.assign({}, state, {err: action.payload})
    }
    case 'GET_CHAT_PREVIEW': {
      return Object.assign({}, state, {rooms: action.payload})
    }
    case 'GET_PREVIEW_FAILED': {
      return Object.assign({}, state, {err: action.payload})
    }
    default: {
      return state
    }
  }
}     

export default chatReducer;