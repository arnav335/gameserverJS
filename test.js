import {initServer,DynamicState} from './index.js'



const gs = initServer(2000, "http://127.0.0.1:5500", () => {
  console.log("Server started at port 2000");
});

new DynamicState(gs, "playerJoin", (prevData, thisData, thisConnection) => {
  if (!thisData?.name) {
    thisConnection.bCastInfo(
      "err",
      "player name is required",
      `${thisConnection.id} didn't share player name `
    );
  }

  if(!prevData) return

  for(const player in prevData){
    if(prevData[player].name===thisData.name){
      
      thisConnection.bCastInfo("err","duplicate connection attempt","duplicate connection isn't allowed")
    }
  }
});

new DynamicState(gs, "coords");
