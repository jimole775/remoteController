/**
 * Created by Andy on 2017/3/9.
 */
import userStorage from "wsClient/ws.storage/wsStorage";
import blobCompiler from "../../ws.tools/blob.compiler/blobCompiler.js";
import callbackStorage from "../callback.storage/callbackStorage.js";

let callbackIdCount = 0;
export default new class WebSocketEmitQuery {
    constructor() {

    }

    query(port, data, callback, callbackParams){

        this.formatParams(port, data, callback, callbackParams).cacheCallback();

        return blobCompiler(this.data);
    }


    /**
     * 处理接口参数，使满足多种调用需求
     * 最后把所有数据格式定义到 this.data 中
     * */
    formatParams(port, data, callback, callbackParams) {
        if (typeof port === "object") {
            if(typeof data === "function"){
                callbackParams = callback || [];
                callback = data;
            }
            data = port;
            port = data.port;
            this.callback = data.callback || callback || function(){};
            this.callbackParams = data.callbackParams || callbackParams || [];
        }

        if (typeof port === "number" && typeof data === "function"){
            this.callback = data;
            this.callbackParams = callback || [];
            data = {};
        }

        if (typeof callback === "function") {
            this.callback = callback;
            this.callbackParams = callbackParams || [];
        }

        this.data = {
            port: port || 0xFF  //如果port未定义，就直接推送 关闭 指令
            , uid: userStorage.getStorage("nativeName")
            , remoteId: userStorage.getStorage("remoteId")
            , remoteUid: {
                askerUid: userStorage.getStorage("askerName")
                , helperUid: userStorage.getStorage("helperName")
            }
            , items: data || {}
        };

        return this;
    }

    cacheCallback() {
        callbackStorage.setStorage(WebSocketEmitQuery.calcCallbackId(), [this.callback,this.callbackParams]);
        this.data = Object.assign(this.data,{callbackId:WebSocketEmitQuery.calcCallbackId(true)});
    }

    static calcCallbackId(add) {
        return add ? callbackIdCount++ : callbackIdCount;
    }

};

