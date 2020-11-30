import { SET_ROOM_CONNECTED, SET_JOINED_ROOM } from "@/redux/actions/session";

const initialState = {
  roomConnected: false,
  joinedRoom: false,
};

const session = (state = initialState, action) => {
  switch (action.type) {
    case SET_ROOM_CONNECTED:
      return { ...state, roomConnected: action.payload };
    case SET_JOINED_ROOM:
      return { ...state, joinedRoom: action.payload };
    default:
      return state;
  }
};
export default session;
