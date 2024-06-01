import { stateList } from "./globalVariables.js";
import info from "./gsInfo.js";

export default class DynamicState {
  constructor(io, name, check, options = {}) {
    this.name = name;
    this.io = io;
    this.data = {};
    stateList.push(this.name)
    // Listen for events with the specified name
    io.on("connection", (socket) => {
      // Send the initial state to the newly connected client
      socket.emit(this.name, this.data);

      // Listen for data from this specific client
      socket.on(this.name, (data) => {
        try {
          // console.log(check);
          let parsedData = null
          if (data) {
            console.log(data);
            parsedData = JSON.parse(data);
          }
          if (check) {
            socket.bCastInfo = info;
            check(this.data, parsedData, socket);
          }
          this.data[socket.id] = parsedData;
          // Broadcast the updated state to all clients, including the sender
          io.emit(this.name, this.data);
        } catch (error) {
          console.error("Failed to parse data:", error);
        }
      });
    });
  }
}
