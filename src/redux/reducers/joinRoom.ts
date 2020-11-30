import {
  SET_JOIN_ROOM_ID,
  SET_JOINING_ROOM,
  SET_USER_ID,
  SET_USER_TEAM,
} from "@/redux/actions/joinRoom";

const initialState = {
  roomId: "",
  joiningRoom: false,
  userId: "",
  userTeam: "blueOperatives",
};

const joinRoom = (state = initialState, action) => {
  switch (action.type) {
    case SET_JOIN_ROOM_ID:
      return {
        ...state,
        roomId: (action.payload || "").toUpperCase(),
      };
    case SET_JOINING_ROOM:
      return { ...state, joiningRoom: action.payload };
    case SET_USER_ID: {
      return {
        ...state,
        userId: action.payload,
      };
    }
    case SET_USER_TEAM: {
      return { ...state, userTeam: action.payload };
    }

    default:
      return state;
  }
};
export default joinRoom;
