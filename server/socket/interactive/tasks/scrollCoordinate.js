/**
 * Created by Andy on 2018/1/13.
 */
import TR from "wsServer/services/socket.storage/socketStorage"
import emitter from "../../emitter/emitter.js"
export default function (socket, data) {
  const clients = TR.getStorage("clients")
  const helperUid = data.remoteUid.helperUid
  const askerUid = data.remoteUid.askerUid
  const fromUid = data.uid

  if (helperUid === fromUid) {
    emitter(0x0A, data.items, clients[askerUid])
  }
}
