import tool from "wsServer/services/tool/exports";
import host from "wsServer/interactive/host";
import handshake from "./../shakehand/shakehand";
import log from "log";
export default function (port) {
    let netServer = require('net').createServer(function (socket) {
        socket.on('error', function (e) {
            log.error(e);
        });
        socket.on('data', function (e) {
            let frame = tool.frameDecode(e);
            //第一次握手
            if (frame.FIN === 0) {
                console.log("握手");
                handshake(e, socket);
            }
            //数据交互
            else {
                host(frame, socket);
            }
        });

    }).listen(port, () => {});
}
