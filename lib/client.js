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
        if (
          dataJSON.name === "TracePointSnapshotEvent" &&
          (tracepointFunction || stdout)
        ) {
          if (tracepointFunction) {
            try {
              tracepointFunction(dataJSON);
            } catch {
              console.log("trace send error");
            }
          }
          if (stdout) {
            try {
              console.log(dataJSON);
            } catch {
              console.log("trace send error");
            }
          }
        }
        if (dataJSON.name === "LogPointEvent" && (logpointFunction || stdout)) {
          let data = {
            id: dataJSON.id,
            fileName: dataJSON.fileName,
            className: dataJSON.className,
            lineNo: dataJSON.lineNo,
            logMessage: dataJSON.logMessage,
            time: dataJSON.time,
          };

          if (lpDetail) data = dataJSON;

          if (logpointFunction) {
            try {
              logpointFunction(data);
              console.log("log sent");
            } catch {
              console.log("log send error");
            }
          }
          if (stdout) {
            try {
              console.log(data);
              console.log("log sent");
            } catch {
              console.log("log send error");
            }
          }
        }
      } catch {
        console.log("parse error");
      }
    });

    ws.on("error", function () {
      console.log("socket error");
      setTimeout(connect, reconnectInterval);
    });

    ws.on("close", function () {
      console.log("socket close");
      setTimeout(connect, reconnectInterval);
    });
  };

  connect();
};

module.exports = {
  sidekickConnect,
};
