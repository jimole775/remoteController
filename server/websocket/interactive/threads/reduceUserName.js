/**
 * Created by Andy on 2017/11/4.
 */

import TR from "/server/websocket/socketRegister/socketRegister";
import emitter from "/server/websocket/interactive/threads/emitter";

//通知前端删除断开的用户
export default function (data, socket) {

    let namesMap = TR.getStorage("nameMap");
    let clients = TR.getStorage("clients");

    socket.destroy();   //删除断线的session，

    if (data.uid) {
        TR.delStorage("clients",data.uid);

        //删除断线的用户名，
        let index = namesMap.indexOf(data.uid);
        TR.delStorage("namesMap",index);
    }

    //刷新用户列表到客户端
    TR.getStorage("nameMap").forEach(function (item, index) {
        let clients = TR.getStorage("clients");
        emitter(0xFE, {deadUid: data.uid}, clients[item]);
    });
};