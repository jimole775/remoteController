/**
 * Created by Andy on 2017/11/4.
 */

import TR from "/server/websocket/socketRegister/socketRegister";
import emitter from "/server/websocket/interactive/threads/emitter";
export default function (data, socket) {
    let namesMap = TR.getStorage("namesMap");
    let remoteChanelMap = TR.getStorage("remoteChanelMap");
    emitter(0x00, {remoteChanelMap: remoteChanelMap,namesMap: JSON.stringify(namesMap)}, socket);
};