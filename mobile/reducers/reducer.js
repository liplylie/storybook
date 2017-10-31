import { combineReducers } from 'redux'
import Auth from './authReducer'
import Camera from './cameraReducer'
import Home from './homeReducer'
import Profile from './profileReducer'
import TabBar from './tabBarReducer'
import CameraPost from './cameraPostReducer'
import Chat from './chatReducer'
import Friends from './friendsReducer'
import Comment from './commentReducer'

const reducer = combineReducers({
  Camera,
  Home,
  Profile,
  TabBar,
  Auth,
  CameraPost,
  Chat,
  Friends,
  Comment
});

export default reducer; 
