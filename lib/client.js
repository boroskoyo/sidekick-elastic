const WebSocket = require('ws')

var reconnectInterval = 10000;
var ws;

var sidekickConnect = function (clientInfo) {

    const sidekick_host = clientInfo.sidekick_host;
    const sidekick_port = clientInfo.sidekick_port;
    const token = clientInfo.token;
    const tracepointFunction = clientInfo.tracepointFunction;
    const tpIndex = clientInfo.tpIndex;
    const logpointFunction = clientInfo.logpointFunction;
    const lpIndex = clientInfo.lpIndex;
    const lpDetail = clientInfo.lpDetail;

    const options = {
        "headers": {
            "x-sidekick-token": token
        }
    }
    ws = new WebSocket(sidekick_host + ':' + sidekick_port + '/client', options);

    ws.on('open', function open() {
        console.log("Sidekick broker connection : successful")
    });

    ws.on('message', function message(data) {
        var dataJSON = {
            name: ""
        };
        try {
            dataJSON = JSON.parse(data);
            if (dataJSON.name === "TracePointSnapshotEvent" && tpIndex) {
                try {
                    tracepointFunction(tpIndex, dataJSON);
                    //console.log("trace sent", tpIndex)
                }
                catch {
                    console.log("trace send error")
                }
            }
            if (dataJSON.name === "LogPointEvent" && lpIndex) {
                let data = {
                    id: dataJSON._id,
                    fileName: dataJSON.fileName,
                    className: dataJSON.className,
                    lineNo: dataJSON.lineNo,
                    logMessage: dataJSON.logMessage,
                    time: dataJSON.time
                }

                if (lpDetail)
                    data = dataJSON
                    
                try {
                    logpointFunction(lpIndex, data);
                    //console.log("log sent", lpIndex)
                }
                catch {
                    console.log("log send error")
                }
            }
        }
        catch
        {
            console.log("parse error")
        }
    });

    ws.on('error', function () {
        console.log('socket error');
    });

    ws.on('close', function () {
        console.log('socket close');
        setTimeout(connect, reconnectInterval);
    });

};

module.exports = {
    sidekickConnect
}
