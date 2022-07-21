const WebSocket = require("ws");

var reconnectInterval = 10000;
var ws;

var sidekickConnect = function (clientInfo) {
  const sidekick_host = clientInfo.sidekick_host
    ? clientInfo.sidekick_host
    : "wss://broker.service.runsidekick.com";
  const sidekick_port = clientInfo.sidekick_port
    ? clientInfo.sidekick_port
    : 443;
  const token = clientInfo.sidekick_token;
  const email = clientInfo.sidekick_email;
  const password = clientInfo.sidekick_password;
  const stdout = clientInfo.stdout;
  const tracepointFunction = clientInfo.tracepointFunction;
  const logpointFunction = clientInfo.logpointFunction;
  const lpDetail = clientInfo.lpDetail;

  const options = {
    headers: {
      ...(!token && { "x-sidekick-email": email }),
      ...(!token && { "x-sidekick-password": password }),
      ...(token && { "x-sidekick-token": token }),
    },
  };

  var connect = function () {
    ws = new WebSocket(
      sidekick_host + ":" + sidekick_port + "/client",
      options
    );

    ws.on("open", function open() {
      console.log("Sidekick broker connection : successful");
    });

    ws.on("message", function message(data) {
      var dataJSON = {
        name: "",
      };

      try {
        dataJSON = JSON.parse(data);
        if (dataJSON.name === "TracePointSnapshotEvent") {

          if (tracepointFunction) {
              tracepointFunction(dataJSON);
          }else{
            console.log("Tracepoint function might not be initialized")
          }

        }else if (dataJSON.name === "LogPointEvent") {
        
          if (logpointFunction) {
              logpointFunction(data);
          }else{
            console.log("Logpoint function might not be initialized")
          }
          
        }
        if (stdout) { 
              console.log("Received data from sidekick:\n ",dataJSON);
          }
      } catch(err) {
        console.log(err);
      }


    });

    ws.on("error", function (value) {
        console.log(value)
      setTimeout(connect, reconnectInterval);
    });

    ws.on("close", function () {
      console.log("Sidekick broker connection : closed.");
      setTimeout(connect, reconnectInterval);
    });
  };

  connect();
};

module.exports = {
  sidekickConnect,
};