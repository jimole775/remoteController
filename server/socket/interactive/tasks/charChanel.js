/**
 * Created by Andy on 2018/1/6.
 */
import TR from "wsServer/services/socket.storage/socketStorage";
import emitter from "../../emitter/emitter.js";

// 远程链接询问，把询问信息推给协助者
export default function (data) {
    let toWhom = data.items.oppositeName;
    let fromWhom = data.items.nativeName;
    let clients = TR.getStorage("clients");

    emitter(
        0x08,
        {
          remoteId:data.items.remoteId
          , oppositeName: fromWhom
          , nativeName: toWhom
          , sentence:data.items.sentence
          , timer:  data.items.timer
        },
        clients[toWhom]
    );
};
