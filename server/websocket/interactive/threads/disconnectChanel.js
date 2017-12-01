/**
 * Created by Andy on 2017/11/4.
 */

import TR from "/server/websocket/socketRegister/socketRegister";
import emitter from "/server/websocket/interactive/threads/emitter";

export default function (data, socket) {

    let clients = TR.getStorage("clients");
    let namesMap = TR.getStorage("namesMap");
    let remoteChanelMap = TR.getStorage("remoteChanelMap");

    let askerUid = data.items.remoteUid.askerUid;
    let helperUid = data.items.remoteUid.helperUid;

    //如果是协助者的断开讯号,
    //通知所有的用户哪两个用户结束远程业务
    namesMap.forEach(function (item) {
        if (askerUid == item || helperUid == item)return;
        emitter(0x07,
            {
                remoteUid: {
                    askerUid: askerUid,
                    helperUid: helperUid
                }
            },
            clients[item]
        );
    });

    remoteChanelMap.forEach(function (item, index) {

        //不确定请求者或者协助者哪个断开连接，所以两个都要判断
        if (item.askerUid === askerUid || item.helperUid === helperUid) {
            TR.delStorage("remoteChanelMap",index);
        }
    });

    //通知远程业务中的两方
    if (data.items.remoteRole == 1) {
        let helper = clients[helperUid];
        emitter(0xFF, {remoteChanelMap: TR.getStorage("remoteChanelMap")}, helper);
    }
    else if (data.items.remoteRole == 2) {
        let asker = clients[askerUid];
        emitter(0xFF, {remoteChanelMap: TR.getStorage("remoteChanelMap")}, asker);
    }
};