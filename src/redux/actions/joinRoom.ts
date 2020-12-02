export const SET_JOIN_ROOM_ID = "JOIN_ROOM_SET_ROOM_ID";
export const SET_JOINING_ROOM = "JOIN_ROOM_SET_JOINING_ROOM";
export const SET_USER_ID = "JOIN_ROOM_SET_USER_ID";
export const SET_USER_TEAM = "JOIN_ROOM_SET_USER_TEAM";
export const RESET_JOIN_ROOM = "JOIN_ROOM_RESET_JOIN_ROOM";

export const setJoinRoomIdAction = (roomId) => ({
  type: SET_JOIN_ROOM_ID,
  payload: roomId,
});

export const setJoinRoomAction = (bool) => ({
  type: SET_JOINING_ROOM,
  payload: bool,
});

export const setUserIdAction = (user) => ({
  type: SET_USER_ID,
  payload: user,
});

export const setUserTeamAction = (team) => ({
  type: SET_USER_TEAM,
  payload: team,
});
export const resetJoinRoomAction = () => ({
  type: RESET_JOIN_ROOM,
});
