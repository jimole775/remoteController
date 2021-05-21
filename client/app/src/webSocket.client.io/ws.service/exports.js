/**
 * Created by Andy on 2017/12/16.
 */

import openHandler from "./recv.handler/on.open/open.js";
import closeHandler from "./recv.handler/on.close/close.js";
import errHandler from "./recv.handler/on.err/err.js";
import msgHandler from "./recv.handler/on.message/host.js";
import emitHandler from "./emit.handler/emitHandler.js";

/**
 * 把ws注册成服务的目的在于：
 * 可以使用 $rootScope.$emit 实时刷新获取的数据给其他模块使用
 * */
export default function service($rootScope, ngTool, wsTool, userStorage, charState) {
    let that = this;
    // let hostUrl = userStorage.getStorage("hostUrl");
    let hostName = location.hostname || userStorage.getStorage("hostUrl");
    let wsPort = userStorage.getStorage("wsPort");
    let wsService = new WebSocket(`ws://${hostName}:${wsPort}`);

    // 这里的wsService是提供给ng-service注入之前的模块使用的
    this.emit = wsService.emit = function (...arg) {
        let blob = emitHandler.query.apply(emitHandler, arg);
        wsService.send(blob);
        return that;
    };

    this.wsService = wsService;
    this.openHandler = openHandler;
    this.errHandler = errHandler;
    this.closeHandler = closeHandler;
    this.msgHandler = msgHandler;

    this.reConnect = function (url) {
        that.wsService = new WebSocket(url);
        that.bindListener();
    };

    // 下面这一堆是   用来提供 websocket 重连机制的
    this.scopeParams = {$rootScope, wsService, ngTool, wsTool, userStorage, charState};
    this.bindListener = function () {
        that.wsService.onopen = function (res) {
            that.openHandler(Object.assign({response: res}, that.scopeParams))
        };
        that.wsService.onerror = function (res) {
            that.errHandler(Object.assign({response: res}, that.scopeParams))
        };
        that.wsService.onclose = function (res) {
            that.closeHandler(Object.assign({response: res}, that.scopeParams))
        };
        that.wsService.onmessage = function (res) {
            that.msgHandler(Object.assign({response: res}, that.scopeParams))
        };
    };

    return this.bindListener();
}
service.$inject = ['$rootScope', 'ngTool', 'wsTool', 'userStorage', 'charState']
