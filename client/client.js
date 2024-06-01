const gsNetwork = {}
function start(url, startFunc,commonFunctionForStates) {
  const socket = io(url);

  socket.on("connect", () => {
    if (startFunc) {
      startFunc();
    }
  });
  socket.once("info", (info) => {
    info.forEach((state) => {
      socket.on(state, (data) => {
        gsNetwork[state] = data;
        if(commonFunctionForStates){
            commonFunctionForStates()
        }
      });
    });
  });

  socket.on("info", (info) => {
    console.log(info);
  });

  return socket
}
