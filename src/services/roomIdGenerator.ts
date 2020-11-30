const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export const generateRoomId = () => {
  let text = "";

  for (let i = 0; i < 5; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};
export default generateRoomId;
