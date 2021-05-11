/**
 * Created by Andy on 2017/12/16.
 */

export default function ({prayload, userStorage}) {
    let list = userStorage.getStorage("userList");
    if(list.length){
        list.forEach(function(item,index){
            if(item.name === prayload.serverData.deadUid){
                list.splice(index,1);
            }
        });
    }
    userStorage.setStorage("userList",list);

    return userStorage;
};