import { Server } from "socket.io";
import { stateList } from "./globalVariables.js";

export default function initServer(port,corsUrl,startFunc) {
  const io = new Server({
    cors: {
      origin: corsUrl,
      methods: ["GET", "POST"]
    }
  });

  io.listen(port);
  if(startFunc){
    startFunc()
  }

  io.on("connection",(socket)=>{
    socket.emit("info",stateList)
    console.log("A new connection established");
  })
  return io;
}