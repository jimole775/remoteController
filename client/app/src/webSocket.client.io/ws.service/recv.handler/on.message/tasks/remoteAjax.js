/**
 * Created by Andy on 2018/1/10.
 */

export default function ({prayload,userStorage}) {
    userStorage.setStorage("ajaxDataRegister",prayload.serverData);
    //ajaxDataRegister.json  = prayload.serverData.json;
    //ajaxDataRegister.status  = prayload.serverData.status;
    //ajaxDataRegister.ajaxCallbackId  = prayload.serverData.ajaxCallbackId;
    return userStorage;
};