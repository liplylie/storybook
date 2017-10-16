import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import logger from 'redux-logger'

import Reducer from './combineReducers'

const middleware = applyMiddlware(promise(), thunk, logger);

const store = createStore(Reducer, middleware); 

export default store; 

