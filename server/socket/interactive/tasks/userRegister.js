/**
 * Created by Andy on 2017/11/4.
 */

import TR from "wsServer/services/socket.storage/socketStorage";
import emitter from "../../emitter/emitter.js";

// 绑定用户信息
export default function (socket, data) {
    socket.uid = data.uid;
    let namesMap = TR.getStorage("namesMap");
    let clients = TR.getStorage("clients");

    if (namesMap.indexOf(data.uid) < 0) {
        TR.addStorage("namesMap", data.uid);
        TR.setStorage("clients", data.uid, socket);

        // 向所有的用户推送用户名
        // 不过要把包含用户目标的名字去掉
        TR.getStorage("namesMap").forEach(function (item, index) {
            let curNamesMap = Array.prototype.slice.call(TR.getStorage("namesMap"));
            curNamesMap.splice(curNamesMap.indexOf(item), 1);
            let remoteChanelMap = TR.getStorage("remoteChanelMap") || [];
            let curClients = TR.getStorage("clients"); // 由于前面有操作，在推送之前重新获取
            emitter(0x01, {namesMap: curNamesMap, "regPass": true, clientData: data, remoteChanelMap:remoteChanelMap}, curClients[item]);
        });

    }else{
        emitter(0x01, {namesMap: [], "regPass": false, clientData: data}, socket);    //用戶名已經被注冊
    }
};