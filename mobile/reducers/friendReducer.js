import { FriendNavigator } from '../components/friendTab/navigationConfig'
import { NavigationActions } from 'react-navigation'

const FriendReducer = (state, action) => {
  return FriendNavigator.router.getStateForAction(action, state);
}

export default FriendReducer; 
