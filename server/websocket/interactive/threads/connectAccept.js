/**
 * Created by Andy on 2017/11/4.
 */
import TR from "/server/websocket/socketRegister/socketRegister";
import emitter from "/server/websocket/interactive/threads/emitter";



export default function (data, socket) {

    let namesMap = TR.getStorage("namesMap");
    let clients = TR.getStorage("clients");

    let askerUid = data.items.remoteUid.askerUid;
    let helperUid = data.items.remoteUid.helperUid;

    //存储远程业务中的两端，主要用于在用户未注册的时候，一口气把所有通道发给前端，让前端自己处理
    TR.setStorage("remoteChanelMap",{askerUid: askerUid, helperUid: helperUid});

    //通知所有的用户哪两个用户正在进行远程业务
    namesMap.forEach(function (item) {
        if (askerUid == item || helperUid == item)return;
        emitter(0x06,
            {
                remoteUid: {
                    askerUid: askerUid,
                    helperUid: helperUid
                }
            },
            clients[item]
        );
    });

    var asker = clients[askerUid];
    var helper = clients[helperUid];

    emitter(0x03, {remoteRole: 1}, asker);
    emitter(0x03, {remoteRole: 2}, helper);
};