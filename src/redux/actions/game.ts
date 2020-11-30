export const SET_STATE = "GAME_SET_STATE";
export const RESET_GAME = "GAME_RESET_GAME";
export const UPDATE_GAME = "GAME_UPDATE_GAME";
export const SET_WORDS = "GAME_SET_WORDS";
export const SET_CURRENT_TEAM = "GAME_SET_CURRENT_TEAM";

export const setStateAction = (state) => ({
  type: SET_STATE,
  payload: state,
});

export const resetGameAction = () => ({
  type: RESET_GAME,
});

export const updateGameAction = (game) => ({
  type: UPDATE_GAME,
  payload: game,
});

export const setWordsAction = (words) => ({
  type: SET_WORDS,
  payload: words,
});

export const setCurrentTeamAction = (team) => ({
  type: SET_CURRENT_TEAM,
  payload: team,
});
