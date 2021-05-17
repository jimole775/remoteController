import tool from "wsServer/services/tool/exports"
import host from "wsServer/interactive/host"
import crypto from "crypto"
import net from 'net'
import log from "log"
export default class WebSocketServer {
  open (port) {
    net.createServer((socket) => {
      socket.on('error', (e) => {
        log.error(e)
      })
      socket.on('data', (e) => {
        const frame = tool.frameDecode(e)
        //第一次握手
        if (frame.FIN === 0) {
          console.log("握手")
          this.handshake(e, socket)
        }
        //数据交互
        else {
          host(frame, socket)
        }
      })
    }).listen(port)
  }

  //单个用户的握手实例
  handshake (e, socket) {
    const mask = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"
    const original = e.toString().match(/Sec-WebSocket-Key: (.+)/)[1]
    const key = crypto.createHash("sha1").update(original + mask).digest("base64")
    socket.write("HTTP/1.1 101 Switching Protocols\r\n")
    socket.write("Upgrade:Websocket\r\n")
    socket.write("Connection:Upgrade\r\n")
    socket.write("Sec-WebSocket-Accept:" + key + "\r\n")
    socket.write("\r\n")
  }
}
