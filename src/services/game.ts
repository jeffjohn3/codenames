import { store } from "@/redux/store";
import { resetGameAction } from "@/redux/actions/game";
import { database, databaseServerTimestamp } from "@/services/firebase";
import _ from "lodash";

const saveGame = (meta = {}) => {
  const state = store.getState();
  const newRoom = {
    ...state.config,
    ...state.game,
    ...meta,
    updatedAt: databaseServerTimestamp,
  };
  return database
    .ref(`rooms/${state.config.roomId}`)
    .update(newRoom)
    .then((result) => {
      return result;
    });
};

export const setGameState = async (gameState) => {
  const state = store.getState();
  await database
    .ref(`rooms/${state.config.roomId}`)
    .update({ state: gameState });
};

export const resetGame = (connected) => {
  store.dispatch(resetGameAction());
  const state = store.getState();
  if (connected || state.session.roomConnected) {
    return saveGame({
      createdAt: databaseServerTimestamp,
    });
  }
};

export const createGame = (connected) => {
  store.dispatch(resetGameAction());
  // store.dispatch(resetConfigAction());
  const state = store.getState();
  if (connected || state.session.roomConnected) {
    return saveGame({
      createdAt: databaseServerTimestamp,
    });
  }
};

export const deleteGame = async () => {
  store.dispatch(resetGameAction());
  const state = store.getState();
  if (state.session.roomConnected) {
    await database.ref(`rooms/${state.config.roomId}`).remove();
  }
  return true;
};

const turns = [
  "blueSpymaster",
  "blueOperatives",
  "redSpymaster",
  "redOperatives",
];

export const nextTeam = async (currentTeam) => {
  const nextTeam = turns[(_.indexOf(turns, currentTeam) + 1) % turns.length];
  const state = store.getState();
  await database
    .ref(`rooms/${state.config.roomId}`)
    .update({ currentTeam: nextTeam });
};
