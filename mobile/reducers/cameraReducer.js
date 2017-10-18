import { CameraNavigator } from '../components/cameraTab/navigationConfig'
import { NavigationActions } from 'react-navigation';

const CameraReducer = (state, action) => {
  return CameraNavigator.router.getStateForAction(action, state);
}

export default CameraReducer; 