/**
 * Created by Andy on 2018/1/13.
 */
import TR from "wsServer/services/socket.storage/socketStorage";
import emitter from "../../emitter/emitter.js";
export default function(socket, data){
    let clients = TR.getStorage("clients");
    let helperUid = data.remoteUid.helperUid;
    let askerUid = data.remoteUid.askerUid;
    let fromUid = data.uid;

    if(helperUid === fromUid){
        emitter(0x0A,data.items,clients[askerUid]);
    }
}