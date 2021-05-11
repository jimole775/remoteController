/**
 * Created by Andy on 2017/12/16.
 */

export default function ({prayload, wsService, ngTool, userStorage}) {

    userStorage.setStorage("askerName", prayload.serverData.remoteUid.askerUid);
    userStorage.setStorage("helperName", prayload.serverData.remoteUid.helperUid);
    ngTool.alert.prompt("【" + prayload.serverData.remoteUid.askerUid + "】请求您的协助！")
        .addConfirmBehavior(function () {
            userStorage.setStorage("oppositeName", prayload.serverData.remoteUid.askerUid);
            window.location.hash = `#!home`;    //远程协助业务开始后，两端都跳回首页
            wsService.emit(0x03);
        })
        .addCancelBehavior(function () {
            wsService.emit(0x04);
        });

    return userStorage;
};
