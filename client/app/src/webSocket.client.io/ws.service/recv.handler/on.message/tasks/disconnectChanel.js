/**
 * Created by Andy on 2017/12/16.
 */
import storage from "wsClient/ws.storage/wsStorage";
import wsTool from "wsClient/ws.tools/exports";
export default function ({prayload, ngTool, userStorage}) {
    document.body.getElementsByTagName("section")[0].style.pointerEvents = null;
    document.body.getElementsByTagName("footer")[0].style.pointerEvents = null;
    userStorage.setStorage("remoteId",prayload.serverData.remoteId);
    userStorage.setStorage("remoteChanelMap",prayload.serverData.remoteChanelMap);
    ngTool.alert.loading.hide();
    ngTool.alert.prompt("对方已经断开连接");
    return userStorage;
};