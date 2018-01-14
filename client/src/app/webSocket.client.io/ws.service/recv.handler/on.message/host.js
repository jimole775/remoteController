/**
 * Created by Andy on 2017/12/15.
 */
import addUsers from "./tasks/addUsers.js";
import connectSniff from "./tasks/connectSniff.js";
import signConnectedUser from "./tasks/signConnectedUser.js";
import signDisconnectUser from "./tasks/signDisconnectUser.js";
import acceptConnect from "./tasks/acceptConnect.js";
import rejectConnect from "./tasks/rejectConnect.js";
import reduceUser from "./tasks/reduceUser.js";
import disconnectChanel from "./tasks/disconnectChanel.js";
import heartBeat from "./tasks/heartBeat.js";
import charSystem from "./tasks/charSystem.js";
import remoteAjax from "./tasks/remoteAjax.js";
import receiverClickEvent from "./tasks/receiverClickEvent.js";
import callbackStorage from "../../callback.storage/callbackStorage.js";
import activeRemoteEventsListener from "./tasks/activeRemoteEventsListener.js";
import activeRemoteScrollListener from "./tasks/activeRemoteScrollListener.js";
import takeRemoteScrollCoordinate from "./tasks/takeRemoteScrollCoordinate.js";


export default function ({
    response, $rootScope, wsService, ngTool, wsTool, userStorage, charState
    }) {
    wsTool.blobDiscompiler(response.data, function (prayload) {

        if (!prayload) return;

        // 如果客户端带有回调的，优先处理
        if(prayload.clientData && prayload.clientData.callbackId !== undefined){
            let callbackId = prayload.clientData.callbackId;
            let callback = callbackStorage.getStorage(callbackId)[0] || function(){};
            let callbackParams = callbackStorage.getStorage(callbackId)[1] || [];
            callbackParams.unshift(prayload);
            callback.apply(null,callbackParams);
            callbackStorage.delStorage(callbackId);
        }

        let params = {
            $rootScope,
            ngTool,
            wsTool,
            prayload,
            wsService,
            userStorage,
            charState
        };

        switch (prayload.status) {
            case 0x00:  // 如果是00，就返回一個空數據，實現心跳
                heartBeat(params);
                break;
            case 0x01:  // 刷新用户列表
                $rootScope.$emit(addUsers(params));
                break;
            case 0x02:  // 协助通道的询问
                $rootScope.$emit(connectSniff(params));
                break;
            case 0x03:  // 接受远程协助，并开辟通道(双方执行)
                $rootScope.$emit(acceptConnect(params));
                activeRemoteEventsListener(params);
                activeRemoteScrollListener(params);
                break;
            case 0x04:  // 拒绝远程协助
                $rootScope.$emit(rejectConnect(params));
                break;
            case 0x05:  // 远程协助交互通道
                $rootScope.$emit(receiverClickEvent(params));
                break;
            case 0x06:  // 标记正在远程业务的用户
                $rootScope.$emit(signConnectedUser(params));
                break;
            case 0x07:  // 取消标记正在远程业务的用户
                $rootScope.$emit(signDisconnectUser(params));
                break;
            case 0x08:  // 聊天数据交互
                $rootScope.$emit(charSystem(params));
                break;
            case 0x09:  // 处理远程业务中ajax数据同步
                $rootScope.$emit(remoteAjax(params));
                break;
            case 0x0A:  // 处理远程业务中scroll坐标同步
                $rootScope.$emit(takeRemoteScrollCoordinate(params));
                break;
            case 0xFE:  // 刪除断线了的用户
                $rootScope.$emit(reduceUser(params));
                break;
            case 0xFF:  // 断开协助通道通知
                $rootScope.$emit(disconnectChanel(params));
                break;
            default :
                break;
        }
    });

};
