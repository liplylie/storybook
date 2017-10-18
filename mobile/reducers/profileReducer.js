import { ProfileNavigator } from '../components/profileTab/navigationConfig'
import { NavigationActions } from 'react-navigation';

const initialState = {
	profileInfo: []
}
const ProfileReducer = (state, action) => {
	console.log(state, 'profile Reducer')
	if (action.type === 'PROFILE_INFO'){
		return Object.assign({}, state, action.payload )
	}
  return ProfileNavigator.router.getStateForAction(action, state);
}

export default ProfileReducer; 