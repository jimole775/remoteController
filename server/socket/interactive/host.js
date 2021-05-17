
/**
 * Created by Andy on 2017/3/14.
 */
import TR from "wsServer/services/socket.storage/socketStorage"
import disconnectChanel from "./tasks/disconnectChanel"
import reduceUser from "./tasks/reduceUser"
import heartBeat from "./tasks/heartBeat"
import userRegister from "./tasks/userRegister"
import connectAsk from "./tasks/connectAsk"
import connectAccept from "./tasks/connectAccept"
import connectReject from "./tasks/connectReject"
import interActivePassageway from "./tasks/interActivePassageway"
import charChanel from "./tasks/charChanel"
import ajaxDataRegister from "./tasks/ajaxDataRegister"
import scrollCoordinate from "./tasks/scrollCoordinate"

export default function (frame, socket) {
  switch (frame.Opcode) {
    case 8:
      var data = frame.PayloadData.slice(2).toString()
      console.log("会话已经结束:", socket, data)
      if (socket.uid) disconnectChanel(socket, data)
      if (socket.uid) reduceUser(socket, data)
      socket.end()
      socket.destroy()   //删除断线的session，
      break
    default:
      TR.setStorage("opcode", frame.Opcode)
      var data = JSON.parse(frame.PayloadData.toString()) || ""
      switch (data.port) {
        case 0x00:
          heartBeat(socket, data)
          break
        case 0x01: //返回一個pass信號，並存儲用戶數據
          userRegister(socket, data)
          break
        case 0x02: //协助通道的询问
          connectAsk(socket, data)
          break
        case 0x03: //协助通道的应答
          connectAccept(socket, data)
          break
        case 0x04:
          connectReject(socket, data)
          break
        case 0x05:    //远程协助交互通道
          interActivePassageway(socket, data)
          break
        case 0x06:
          break
        case 0x07:
          break
        case 0x08:
          charChanel(data)
          break
        case 0x09:  //交接callbackID
          ajaxDataRegister(socket, data)
          break
        case 0x0A:  //交接scroll坐标
          scrollCoordinate(socket, data)
          break
        case 0xFE:
          disconnectChanel(socket, data)
          break
        case 0xFF: //断开协助通道//关闭ws
          //that.close(data)
          //console.log("中断远程用户")
          break
        default:
          break
      }
      break
  }
}
