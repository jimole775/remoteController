/**
 * Created by Andy on 2017/12/4.
 */
import callbackRegister from "../callback.register/callbackRegister.js";
import $ from "jquery";

export default class AjaxRequest{
    constructor(userStorage, receiver, $rootScope, wsService){
        this.$rootScope = $rootScope;
        this.wsService = wsService;
        this.userStorage = userStorage;
        this.receiver = receiver;
        this.ajaxCallbackId = 0;
        this.cache = {};
    }

    request(pathName, querySearch) {

        callbackRegister.setStorage(this.ajaxCallbackId, this.cache);

        if (this.userStorage.getStorage("remoteId") == 2) {
            this.wsService.emit(0x09,{doneId:this.ajaxCallbackId++});
            this.delegateRemoteHandler();
            return this;
        }
        this.ajaxEmit(pathName, querySearch);
        return this;
    }

    bindCallbackRunEnv(callbackRunEnv = null){
        /***
         *  由于类里面传过来的只是一个普通函数，所以要在这里获取当时运行状态的环境
         *  然后在最后调用callback的时候，进行绑定（使用apply）
         ***/
        this.cache["callbackRunEnv"] = callbackRunEnv;
        return this;
    }

    extendsCallbackParams(...params) {
        this.cache["params"] = params;
        return this;
    }

    addRetryBehavior(retryBehavior = []) {
        this.cache["retryBehavior"] = retryBehavior;
        return this;
    }

    injectCallback(callback = function(){}){
        this.cache["callback"] = callback;
        return this;
    }

    delegateRemoteHandler(){
        let that = this;
        this.doneId = null;
        this.$rootScope.$on(this.userStorage,function(){
            let ajaxDataRegister = that.userStorage.getStorage("ajaxDataRegister");

            // 这里的情况需要说明一下：
            // 由于 $rootScope.$emit() 之后，$rootScope.$on 出现重复响应的情况，
            // 必须暂存一个ID值，如果和上一次的相等，就直接退出
            if(that.doneId === ajaxDataRegister.ajaxCallbackId)return;

            that.doneId = ajaxDataRegister.ajaxCallbackId;
            switch (ajaxDataRegister.status) {
                case "success":
                    that.receiver.take("success", ajaxDataRegister.json, ajaxDataRegister.ajaxCallbackId);
                    break;
                case "timeout":
                    that.receiver.take("timeout", "服务器请求超时", ajaxDataRegister.ajaxCallbackId);
                    break;
                case "error":
                case "parsererror": //数据序列化失败，一般这种情况是服务器数据输出的问题
                    that.receiver.take("error", "服务器请求失败", ajaxDataRegister.ajaxCallbackId);
                    console.log('http请求失败:', XMLHttpRequest);
                    break;
            }
        });

    }

    ajaxEmit(pathName, querySearch) {
        let that = this;
        that.ajaxInstance = $.ajax({
            type: "POST",
            async: true,
            timeout: 10000, //超时时间设置，单位毫秒
            url: that.userStorage.getStorage("hostUrl") + pathName,
            dataType: "json",
            data: querySearch,
            complete: function (XMLHttpRequest, status) {
                let json = XMLHttpRequest.responseJSON;

                // 求助者获取到数据之后，推送给ws服务器，再通过ws服务器传输给 协助者
                if(that.userStorage.getStorage("remoteId") === 1){
                    that.wsService.emit(0x09,{status,json,ajaxCallbackId:that.ajaxCallbackId});
                }

                switch (status) {
                    case "success":
                        that.receiver.take("success", json, that.ajaxCallbackId++);
                        break;
                    case "timeout":
                        that.ajaxInstance.abort();
                        that.receiver.take("timeout", "服务器请求超时", that.ajaxCallbackId++);
                        break;
                    case "error":
                    case "parsererror": //数据序列化失败，一般这种情况是服务器数据输出的问题
                        that.receiver.take("error", "服务器请求失败", that.ajaxCallbackId++);
                        console.log('http请求失败:', XMLHttpRequest);
                        break;
                }
            }
        });

        return that;
    }
}
