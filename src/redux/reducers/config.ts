import {
  RESET_CONFIG,
  SET_PLAYERS,
  SET_ROOM_ID,
  SET_OWNER_ID,
} from "@/redux/actions/config";
import roomIdGenerator from "@/services/roomIdGenerator";
import _ from "lodash";

const initialState = {
  roomId: roomIdGenerator(),
  players: {
    redSpymaster: "",
    blueSpymaster: "",
    redOperatives: [],
    blueOperatives: [],
  },
  ownerId: "",
};

const configReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_ROOM_ID: {
      return {
        ...state,
        roomId: action.payload || roomIdGenerator(),
      };
    }
    case SET_PLAYERS: {
      return {
        ...state,
        players: action.payload,
      };
    }
    case SET_OWNER_ID: {
      return { ...state, ownerId: action.payload };
    }
    case RESET_CONFIG: {
      return { ...initialState, roomId: roomIdGenerator() };
    }
    default:
      return state;
  }
};
export default configReducers;
