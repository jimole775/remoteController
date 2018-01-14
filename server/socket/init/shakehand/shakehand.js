/**
 * Created by Andy on 2017/11/6.
 */

import TR from "wsServer/services/socket.storage/socketStorage";
import crypto from "crypto";

const mask = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";

//单个用户的握手实例;
export default function (e, socket) {
    let original = e.toString().match(/Sec-WebSocket-Key: (.+)/)[1];
    let key = crypto.createHash("sha1").update(original + mask).digest("base64");
    socket.write("HTTP/1.1 101 Switching Protocols\r\n");
    socket.write("Upgrade:Websocket\r\n");
    socket.write("Connection:Upgrade\r\n");
    socket.write("Sec-WebSocket-Accept:" + key + "\r\n");
    socket.write("\r\n");
}