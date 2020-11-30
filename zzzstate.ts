export const a = {
  config: {},
};

const config = {
  selectedLocations: defaultSelectedLocations,
  customLocations: {},
  roomId: roomIdGenerator(),
  players: ["P1"],
  time: 480,
  spyCount: 1,
};
const game = {
  state: "new",
  playersRoles: {},
  location: "",
  prevLocation: "",
  spies: [],
  timerRunning: false,
};
const joinRoom = {
  roomId: "",
  player: "",
};
const room = {
  id: roomIdGenerator(),
};
const root = {
  userId: null,
  language: "en-US",
  translations: {},
  translationsImportTime: null,
};
const session = {
  roomConnected: false,
  joinedRoom: false,
};
