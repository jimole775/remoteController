/**
 * Created by Andy on 2017/12/16.
 */

export default function ({prayload,userStorage}) {

    userStorage.addStorage("remoteChanelMap",prayload.serverData.remoteChanel);

    return userStorage;
};