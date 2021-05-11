/**
 * Created by Andy on 2017/12/16.
 */

export default function ({prayload, userStorage}) {
    let namesMap = prayload.serverData.namesMap;
    let chanelMap = prayload.serverData.remoteChanelMap;
    let curList = userStorage.getStorage("userList");
    let newUserCount = parseInt(namesMap.length - curList.length);
    let userList = [];

    // 为用户绑定chanelMap
    namesMap.forEach(function(namesItem){
        let curItem = {name:namesItem,connectWith:null};
        chanelMap.forEach(function(chanelItem){
            if(namesItem === chanelItem.askerUid){
                curItem = {name:namesItem, connectWith:chanelItem.askerUid};
            }
            if(namesItem === chanelItem.helperUid){
                curItem = {name:namesItem, connectWith:chanelItem.helperUid};
            }
        });
        userList.push(curItem);
    });

    userStorage
        .setStorage("userList",userList)
        .setStorage("newUserCount",newUserCount);

    return userStorage;
}