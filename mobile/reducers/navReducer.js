import { NavigationActions } from 'react-navigation'
import AppNavigator from '../components/appNavigation'

// const initialNavState = AppNavigator.router.getStateForAction(
//   AppNavigator.router.getActionForPathAndParams('Main')
// );


// const navReducer = (state=initialNavState, action) => {
//   let nextState;

//   switch(action.type) {
//     case 'Login': {
//       nextState = AppNavigator.router.getStateForAction(
//         NavigationActions.back(),
//         state
//       );
//       break;
//     }
//     case 'Logout': {
//       nextState = AppNavigator.router.getStateForAction(
//         NavigationActions.navigate({ routeName: 'Login' }),
//         state
//       );
//       break;
//     }
//     default: {
//       nextState = AppNavigator.router.getStateForAction(
//         action,
//         state
//       );
//       break;
//     }
//   }

//   return nextState || state;
// };

// export default navReducer;