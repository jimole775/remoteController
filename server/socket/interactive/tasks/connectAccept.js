/**
 * Created by Andy on 2017/11/4.
 */
import TR from "wsServer/services/socket.storage/socketStorage"
import emitter from "../../emitter/emitter.js"

export default function (socket, data) {

  const namesMap = TR.getStorage("namesMap")
  const clients = TR.getStorage("clients")

  const askerUid = data.remoteUid.askerUid
  const helperUid = data.remoteUid.helperUid

  // 存储远程业务中的两端，主要用于在用户未注册的时候，一口气把所有通道发给前端，让前端自己处理
  TR.addStorage("remoteChanelMap", { "askerUid": askerUid, "helperUid": helperUid })

  // 通知所有的用户哪两个用户正在进行远程业务
  namesMap.forEach(function (item) {
    if (askerUid === item || helperUid === item) return
    emitter(0x06,
      {
        remoteChanel: { "askerUid": askerUid, "helperUid": helperUid }
      },
      clients[item]
    )
  })

  var asker = clients[askerUid]
  var helper = clients[helperUid]

  // 给通讯中的用户派发身份标识 （求助者ID：1，协助者ID：2）
  emitter(0x03, {
    remoteId: 1, remoteUid: {
      "askerUid": askerUid,
      "helperUid": helperUid
    }
  }, asker)

  emitter(0x03, {
    remoteId: 2, remoteUid: {
      "askerUid": askerUid,
      "helperUid": helperUid
    }
  }, helper)
}
