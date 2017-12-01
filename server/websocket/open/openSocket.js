import tool from "/server/tool/main";
import host from "/server/websocket/interactive/host/host";
import handshake from "../handshake/handshake";

export default function () {
    require('net').createServer(function (socket) {
        socket.on('error', function (e) {
            console.log(e);
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

    }).listen(81, () => {});
}
