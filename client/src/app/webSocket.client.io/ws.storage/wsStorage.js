/**
 * Created by Andy on 2017/12/18.
 */

import Rg from "StorageRegister"

let storage = {
    nativeName:null,    // 本地注册者的名字
    oppositeName:null,  // 标识正在与本地注册者通信的目标 [，并不确定谁是控制机（协助者）]
    helperName:null,    // 标识控制机 [，与nativeName，oppositeName匹配可以知道谁是控制机（协助者）]
    askerName:null,     // 标识求助者
    remoteId:0,         // 远程业务中的身份 [，与nativeName，oppositeName匹配的结果]
    userList:[],        // 所有在线用户的列表，由socket服务器实时推送
    newUserCount:0,     // 新增用户数量
    isChatting:false,   // 显示聊天框的标识
    remoteChanelMap:[],  // 标记正在进行远程通讯业务的用户
    name:"userStorage",  // 标记正在进行远程通讯业务的用户
    hostUrl:"127.0.0.1",  // 标记正在进行远程通讯业务的用户
    httpPort:"1110",
    wsPort:"1111"
};

export default new Rg(storage);