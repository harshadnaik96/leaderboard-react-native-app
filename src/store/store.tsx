import { combineReducers, legacy_createStore as createStore } from "redux";
import { rankReducer } from "../reducers";

const rootReducer = combineReducers({
  rankState: rankReducer,
});

export const configureStore = () => {
  const store = createStore(rootReducer);
  return store;
};
