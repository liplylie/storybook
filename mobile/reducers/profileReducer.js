import { ProfileNavigator } from '../components/profileTab/navigationConfig'
import { NavigationActions } from 'react-navigation';

const initialState = {
	profileInfo: []
}
const ProfileReducer = (state, action) => {
	console.log(state, 'profile Reducer')
	if (action.type === 'USER_LOCATION'){
		return Object.assign({}, state, {userLocation: action.payload} )
	}
	if (action.type === 'MARKER_LOCATION'){
		return Object.assign({}, state, {markerLocation: action.payload} )
	}
  return ProfileNavigator.router.getStateForAction(action, state);
}

export default ProfileReducer; 