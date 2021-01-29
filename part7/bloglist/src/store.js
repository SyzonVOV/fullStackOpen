import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer } from './reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from 'redux-logger';

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(logger, thunk)),
);
