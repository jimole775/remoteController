/**
 * Created by Andy on 2017/11/4.
 */
import TR from "wsServer/services/socket.storage/socketStorage"
import emitter from "../../emitter/emitter.js"

//远程交互
export default function (socket, data) {

  const clients = TR.getStorage("clients")
  const asker = clients[data.remoteUid.askerUid]
  const helper = clients[data.remoteUid.helperUid]

  if (data.remoteId == 1) {

    // 求助者，接收的只有 点击事件
    //emitter(0x05, data.items, helper)
  }
  else if (data.remoteId == 2) {

    // 协助者，接收的只有 ajax 数据
    emitter(0x05, data.items, asker)
  }
}
