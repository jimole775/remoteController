/**
 * Created by Andy on 2017/11/4.
 */

import TR from "wsServer/services/socket.storage/socketStorage"
import emitter from "../../emitter/emitter.js"

//通知前端删除断开的用户
export default function (socket) {

  const namesMap = TR.getStorage("namesMap")
  const clients = TR.getStorage("clients")
  const deadUid = socket.uid

  if (deadUid) {
    //删除断线的会话，
    TR.delStorage("clients", deadUid)

    //删除断线的用户名，
    const index = namesMap.indexOf(deadUid)
    console.log("删除了用户：", namesMap[index])
    TR.delStorage("namesMap", index)
    console.log("删除之后剩余的用户：", TR.getStorage("namesMap"))
  }

  //刷新用户列表到客户端
  TR.getStorage("namesMap").forEach(function (item, index) {
    const clients = TR.getStorage("clients")
    emitter(0xFE, { deadUid: socket.uid }, clients[item])
  })
}
