/**
 * Created by Andy on 2017/12/4.
 */
import callbackRegister from "../callback.register/callbackRegister.js";
export default class Receiver{

    constructor() {
    }

    /**
     * APP从服务器获取到数据，转发给Js
     * @param status str
     * @param response obj
     * @param ajaxCallbackId int
     * */
    take(status, response, ajaxCallbackId) {

        let storage = Receiver.getStorage(ajaxCallbackId);

        switch (status) {
            case "success":
                this.successHandler(response, storage.callback, storage.params, storage.callbackRunEnv);
                break;
            case "timeout":
            case "error"://涵盖有服务器繁忙
                this.refreshHandler(response, storage.retryBehavior, storage.params, storage.callbackRunEnv);
                break;
        }
    }

    static getStorage(ajaxCallbackId) {

        let params = callbackRegister.getStorage(ajaxCallbackId)["params"];
        let retryBehavior = callbackRegister.getStorage(ajaxCallbackId)["retryBehavior"];
        let callback = callbackRegister.getStorage(ajaxCallbackId)["callback"];
        let callbackRunEnv = callbackRegister.getStorage(ajaxCallbackId)["callbackRunEnv"];

        callbackRegister.delStorage(ajaxCallbackId);

        return {callback, params, retryBehavior, callbackRunEnv};
    }

    successHandler(response, callback, params, callbackRunEnv) {
        let jsonData =
            typeof response === "string" && response.match(/^[\{\[]/)
                ? JSON.parse(response) : response;

        callback.apply(callbackRunEnv, [jsonData, ...params]);
        return this;
    }

    refreshHandler(response, retryBehavior, params, callbackRunEnv) {
        /**超时回调处理：
         * 如果回调参数传过来的是数组，就是两个函数实体
         * 如果回调参数穿过来的是函数，就是一个函数，直接调用
         * */

        if (retryBehavior instanceof Array) {
            switch (retryBehavior.length) {
                case 0:
                    break;
                case 1:
                    //this.alertTool.alert(
                    //    response,
                    //    function () {
                    //        retryBehavior[0].apply(callbackRunEnv, params);
                    //    }
                    //);
                    break;
                case 2:
                    //this.alertTool.alert([response, "重试", "取消"],
                    //    function () {
                    //        retryBehavior[0].apply(callbackRunEnv, params);
                    //    },
                    //    function () {
                    //        retryBehavior[1].apply(callbackRunEnv, params);
                    //    }
                    //);
                    break;

            }
        } else if (retryBehavior instanceof Function) {
            retryBehavior.apply(callbackRunEnv, []);
        }
        return this;
    }
}