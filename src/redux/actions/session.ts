export const SET_ROOM_CONNECTED = "SESSION_SET_ROOM_CONNECTED";
export const SET_JOINED_ROOM = "SESSION_SET_JOINED_ROOM";
export const RESET_SESSION = "SESSION_RESET_SESSION";

export const setRoomConnectedAction = (connected) => ({
  type: SET_ROOM_CONNECTED,
  payload: connected,
});

export const setJoinedRoomAction = (joined) => ({
  type: SET_JOINED_ROOM,
  payload: joined,
});

export const resetSessionAction = () => ({
  type: RESET_SESSION,
});
