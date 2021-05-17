/**
 * Created by Andy on 2018/1/6.
 */
import TR from "wsServer/services/socket.storage/socketStorage"
import emitter from "../../emitter/emitter.js"

// 远程链接询问，把询问信息推给协助者
export default function (data) {
  const toWhom = data.items.oppositeName
  const fromWhom = data.items.nativeName
  const clients = TR.getStorage("clients")
  data.items.oppositeName = fromWhom
  data.items.nativeName = toWhom

  emitter(
    0x08,
    data.items,
    clients[toWhom]
  )
  //  emitter(
  //     0x08,
  //     {
  //         oppositeName: fromWhom
  //       , nativeName: toWhom
  //     },
  //     clients[toWhom]
  // )
}
