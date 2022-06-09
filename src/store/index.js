import { applyMiddleware, createStore } from 'redux';
import reducers from './reducers';
import Thunk from 'redux-thunk';

/* eslint-disable no-underscore-dangle */
export const store = createStore(reducers, applyMiddleware(Thunk));
