import { TabBarNavigator } from '../components/tabBar/navigationConfig'
import { NavigationActions } from 'react-navigation';

const TabBarReducer = (state, action) => {
  return TabBarNavigator.router.getStateForAction(action, state);
}

export default TabBarReducer; 
