import { combineReducers } from 'redux'
import Auth from './authReducer'
import Camera from './cameraReducer'
import Home from './homeReducer'
import Profile from './profileReducer'
import TabBar from './tabBarReducer'
import CameraPost from './cameraPostReducer'
import Chat from './chatReducer'

const reducer = combineReducers({
  Camera,
  Home,
  Profile,
  TabBar,
  Auth,
  CameraPost,
  Chat
});

export default reducer; 
