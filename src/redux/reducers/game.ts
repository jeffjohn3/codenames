import {
  SET_STATE,
  RESET_GAME,
  UPDATE_GAME,
  SET_WORDS,
  SET_CURRENT_TEAM,
} from "@/redux/actions/game";
import { generateWords } from "@/services/wordsGenerator";
import { GAME_STATES } from "@/consts/game";
import _ from "lodash";

const initialState = {
  state: GAME_STATES.NEW,
  words: generateWords(),
  currentTeam: "blueSpymaster",
};

const game = (state = initialState, action) => {
  switch (action.type) {
    case SET_STATE:
      return { ...initialState, state: action.payload };
    case RESET_GAME:
      return { ...initialState, words: generateWords() };
    case UPDATE_GAME:
      return { ...state, ...action.payload };
    case SET_WORDS:
      return { ...state, words: action.payload };
    case SET_CURRENT_TEAM:
      return { ...state, currentTeam: action.payload };
    default:
      return state;
  }
};
export default game;
