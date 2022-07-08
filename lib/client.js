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
      ...(token && { "x-sidekick_token": token }),
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
        if (dataJSON.name === "TracePointSnapshotEvent" && tracepointFunction) {
              tracepointFunction(dataJSON);
        }
        if (dataJSON.name === "LogPointEvent" && logpointFunction) {
          let data = {
            id: dataJSON.id,
            fileName: dataJSON.fileName,
            className: dataJSON.className,
            lineNo: dataJSON.lineNo,
            logMessage: dataJSON.logMessage,
            time: dataJSON.time,
          };

          if (lpDetail) data = dataJSON;
          
          logpointFunction(data);
        }

        if (stdout) {
              console.log("Received data from sidekick (detailed): \n", dataJSON);
          }


      } catch(err) {
        console.log(err);
      }
    });

    ws.on("error", function (value) {
        console.log("Socket Error: \n",value)
      setTimeout(connect, reconnectInterval);
    });

    ws.on("close", function () {
      console.log("Socket closed");
      setTimeout(connect, reconnectInterval);
    });
  };

  connect();
};

module.exports = {
  sidekickConnect,
};