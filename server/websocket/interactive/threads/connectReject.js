/**
 * Created by Andy on 2017/11/4.
 */

import TR from "/server/websocket/socketRegister/socketRegister";
import emitter from "/server/websocket/interactive/threads/emitter";

    //远程链接,把应答消息推给询问者
export default function (data, socket) {

    let clients = TR.getStorage("clients");
    let asker = clients[data.items.remoteUid.askerUid];

    emitter(
        0x04,
        {},
        asker
    );
};