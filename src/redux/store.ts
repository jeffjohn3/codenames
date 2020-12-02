import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import config from "@/redux/reducers/config";
import session from "@/redux/reducers/session";
import game from "@/redux/reducers/game";
import joinRoom from "@/redux/reducers/joinRoom";

const persistConfig = {
  key: "persistor",
  storage,
  // blacklist: ["session", "game"],
  // stateReconciler: autoMergeLevel2,
};

const middlewares = [];

const enhancer = compose(
  applyMiddleware(...middlewares),
  // other store enhancers if any
);

const rootReducer = combineReducers({
  config,
  session,
  game,
  joinRoom,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const initialState = {
  config: config(undefined, {}),
  game: game(undefined, {}),
  session: session(undefined, {}),
  joinRoom: joinRoom(undefined, {}),
};

export const store = createStore(persistedReducer, initialState, enhancer);
export const persistor = persistStore(store);
export default { store, persistor };
