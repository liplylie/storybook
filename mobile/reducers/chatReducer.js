const initialState = {
  currentRoom: '', 
  rooms: [],
  friends: [
    {name: "Daniel", img: "https://cdn.pixabay.com/photo/2016/09/07/16/38/portrait-1652023_960_720.jpg"}, 
    {name: "Daniel", img: "https://cdn.pixabay.com/photo/2016/09/07/16/38/portrait-1652023_960_720.jpg"}, 
    {name: "Daniel", img: "https://cdn.pixabay.com/photo/2016/09/07/16/38/portrait-1652023_960_720.jpg"}, 
    {name: "Daniel", img: "https://cdn.pixabay.com/photo/2016/09/07/16/38/portrait-1652023_960_720.jpg"}
  ],
  err: ''
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
      return Object.assign({}, state, {friends: action.payload} )
    }
    case 'FRIEND_LIST_FAIL': {
      return Object.assign({}, state, {err: action.payload} )
    }
    default: {
      return state
    }
  }
}     



export default chatReducer;