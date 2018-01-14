/**
 * Created by Andy on 2017/11/4.
 */

import TR from "wsServer/services/socket.storage/socketStorage";
import emitter from "../../emitter/emitter.js";

export default function (socket, data) {
    let fromUid = socket.uid;
    let clients = TR.getStorage("clients");
    let namesMap = TR.getStorage("namesMap");
    let remoteChanelMap = TR.getStorage("remoteChanelMap") || [];
    let askerUid = null;
    let helperUid = null;

    // 排查断开的用户，检查是否与其他用户有通讯
    // 删除配对通道，并告知通信的另一端
    remoteChanelMap.forEach(function (item, index) {
        if (item.askerUid == fromUid || item.helperUid == fromUid) {

            askerUid = item.askerUid;
            helperUid = item.helperUid;
            emitter(
                0xFF,
                {
                    remoteId:0,
                    remoteChanelMap: TR.delStorage("remoteChanelMap", index).getStorage("remoteChanelMap")
                },
                clients[(askerUid == fromUid ? helperUid : askerUid)]
            );
        }
    });


    // 另行通知其他所有的用户 哪两个用户结束远程业务
    // 解除用户列表中"busing"状态，使其可以被选取
    namesMap.forEach(function (item) {
        if (askerUid == item || helperUid == item)return;
        emitter(0x07,
            {
                remoteChanelMap: TR.getStorage("remoteChanelMap")
            },
            clients[item]
        );
    });
};