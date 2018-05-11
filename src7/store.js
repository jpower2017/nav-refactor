import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

import data from "./Grid/reducers";

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));

export function configureStore() {
  return createStore(
    combineReducers({
      data
    }),
    enhancer
  ); //creates store
}
