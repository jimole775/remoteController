/**
 * Created by Andy on 2017/11/4.
 */

import TR from "/server/websocket/socketRegister/socketRegister";
import emitter from "/server/websocket/interactive/threads/emitter";

//绑定用户信息
export default function (data, socket) {
    socket.uid = data.uid;

    let namesMap = TR.getStorage("namesMap");
    let clients = TR.getStorage("clients");

    if (namesMap.indexOf(data.uid) < 0) {
        TR.setStorage("namesMap",data.uid);
    }

    TR.setStorage("clients",data.uid, socket);
    //clients[data.uid] = socket;

    //向所有的用户推送用户名
    TR.getStorage("namesMap").forEach(function (item, index) {
        clients = TR.getStorage("clients"); //由于前面有操作，在推送之前重新获取
        emitter(0x01, {namesMap: JSON.stringify(namesMap)}, clients[item]);
    });
};