/**
 * Created by Andy on 2017/11/4.
 */
import TR from "/server/websocket/socketRegister/socketRegister";
import emitter from "/server/websocket/interactive/threads/emitter";

//Ô¶³Ì½»»¥
export default function (data) {

    let clients = TR.getStorage("clients");
    let asker = clients[data.items.remoteUid.askerUid];
    let helper = clients[data.items.remoteUid.helperUid];

    if (data.items.activeData.remoteRole == 1) {
        emitter(0x05, data.items.activeData, helper);
    }
    else if (data.items.activeData.remoteRole == 2) {
        emitter(0x05, data.items.activeData, asker);
    }
};