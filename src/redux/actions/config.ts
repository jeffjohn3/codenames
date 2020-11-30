export const SET_ROOM_ID = "CONFIG_SET_ROOM_ID";
export const SET_PLAYERS = "CONFIG_SET_PLAYERS";
export const SET_OWNER_ID = "CONFIG_SET_OWNER_ID";
export const RESET_CONFIG = "CONFIG_RESET_CONFIG";

export const setRoomIdAction = (roomId?) => ({
  type: SET_ROOM_ID,
  payload: roomId,
});

export const setPlayersAction = (players) => ({
  type: SET_PLAYERS,
  payload: players,
});

export const setOwnerIdAction = (ownerId) => ({
  type: SET_OWNER_ID,
  payload: ownerId,
});

export const resetConfigAction = () => ({
  type: RESET_CONFIG,
});
