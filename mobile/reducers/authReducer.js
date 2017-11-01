const initialState = {
  authorizing: false,
  authorized: false,
  authCreds: {},
  name: '',
  userId: '',
  picture: '',
  email: '',
  error: null
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
        authCreds: action.payload,
      });
    }
    case 'USER_UNAUTHORIZED': {
      return Object.assign({}, state, {
        authorizing: false,
        error: action.payload
      })
    }
    case 'USER_LOGOUT_PENDING': {
      return Object.assign({}, state, {
        authorized: false,
        authorizing: true,
      })
    }
    case 'USER_LOGOUT_FULFILLED': {
      return Object.assign({}, state, {
        authorized: false,
        authorizing: false,
      })
    }
    case 'USER_INFO_RETRIEVED': {
      return Object.assign({}, state, {
        authorized: true,
        name: action.payload.name,
        picture: action.payload.profile_image_url,
        email: action.payload.email,
        userId: action.payload.id
      })
    }
    case 'USER_INFO_FAIL': {
      return Object.assign({}, state, {
        authorized: false,
      })
    }
    default: {
      return state;
    }
  }
}

export default authReducer;