/**
 * Created by Andy on 2017/12/16.
 */

export default function ({prayload,userStorage}) {
    userStorage.setStorage("remoteChanelMap",prayload.serverData.remoteChanelMap);
    return userStorage;
}