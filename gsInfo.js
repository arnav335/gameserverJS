export default function info(type, message, serverMessage) {
  const msgObj = {};
  msgObj[type] = message;

  this.emit("info", msgObj);
  this.disconnect();
  
  throw new Error(serverMessage);
}
