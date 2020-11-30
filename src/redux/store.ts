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

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    config,
    session,
    game,
    joinRoom,
  }),
);

export const store = createStore(persistedReducer, undefined, enhancer);
export const persistor = persistStore(store);
export default { store, persistor };
