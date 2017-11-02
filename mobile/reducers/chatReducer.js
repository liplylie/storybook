const initialState = {
  currentRoom: '', 
  rooms: [
    {name: "Daniel Chong", img: "https://cdn.pixabay.com/photo/2016/09/07/16/38/portrait-1652023_960_720.jpg", message: "Daniel: Please"}, 
    // {name: "Daniel", img: "https://cdn.pixabay.com/photo/2016/09/07/16/38/portrait-1652023_960_720.jpg", message: "How are you"}, 
    // {name: "Daniel", img: "https://cdn.pixabay.com/photo/2016/09/07/16/38/portrait-1652023_960_720.jpg", message: "Please talk to me"}, 
    // {name: "Daniel", img: "https://cdn.pixabay.com/photo/2016/09/07/16/38/portrait-1652023_960_720.jpg", message: "Please"}
  ],
  // friends: [
  //   {name: "Daniel Chong", img: "https://cdn.pixabay.com/photo/2016/09/07/16/38/portrait-1652023_960_720.jpg"}, 
  //   {name: "Daniel Chong", img: "https://cdn.pixabay.com/photo/2016/09/07/16/38/portrait-1652023_960_720.jpg"}, 
  //   {name: "Daniel Chong", img: "https://cdn.pixabay.com/photo/2016/09/07/16/38/portrait-1652023_960_720.jpg"}, 
  //   {name: "Daniel Chong", img: "https://cdn.pixabay.com/photo/2016/09/07/16/38/portrait-1652023_960_720.jpg"}
  // ],
  friends: [],
  // searchResults: [
  //   {name: "Daniel Chong", img: "https://cdn.pixabay.com/photo/2016/09/07/16/38/portrait-1652023_960_720.jpg"}, 
  //   {name: "Daniel Lien", img: "https://img1.etsystatic.com/181/0/12072196/il_570xN.1282613201_91qn.jpg"}, 
  // ],
  err: '',
  searchErr: '',
  results: []
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