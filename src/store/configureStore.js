import { createStore, applyMiddleware, compose } from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

const composeEnhancers = (
  window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;

const configureStore = initialState => {
  const logger = createLogger();

  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk, logger))
  );
};

export default configureStore;
