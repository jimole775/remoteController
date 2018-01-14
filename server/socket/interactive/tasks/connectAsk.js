/**
 * Created by Andy on 2017/11/4.
 */

import TR from "wsServer/services/socket.storage/socketStorage";
import emitter from "../../emitter/emitter.js";

// 远程链接询问，把询问信息推给协助者
export default function (socket, data) {
    let clients = TR.getStorage("clients");
    let helper = clients[data.remoteUid.helperUid];
    emitter(
        0x02,
        {
            uiHref:data.items.uiHref,
            remoteUid: {
                askerUid: data.remoteUid.askerUid,
                helperUid: data.remoteUid.helperUid
            }
        },
        helper
    );
};
