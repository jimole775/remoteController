/**
 * Created by Andy on 2017/12/15.
 */

let _$rootScope_, _wsService_, _userStorage_;
export default function ({
    response, $rootScope, wsService, ngTool, wsTool, userStorage
    }) {
    _$rootScope_ = $rootScope;
    _wsService_ = wsService;
    _userStorage_ = userStorage;
    // 处理服务器的主动断开请求, 服务器断开之后考虑，需不需要重连 new wsService = new WebSocket("127.0.0.1:1111");
    console.log(response, "ws关闭信号！");
    //$("#RMTCover").hide();
    if (_userStorage_.getStorage("remoteId")) {
        _userStorage_.setStorage("remoteId",null);
        _$rootScope_.$emit(_userStorage_);
    }

    preClose(_$rootScope_, _wsService_, _userStorage_);
};

window.onbeforeunload = function () {
    console.log("关闭或者刷新窗口");
    console.log("刷新窗口",_$rootScope_, _wsService_, _userStorage_);
    //preClose(_$rootScope_, _wsService_, _userStorage_);
    wsService.close(1000, JSON.stringify({"msg":"close"}));
};

window.onunload = function () {
    console.log("刷新窗口",_$rootScope_, _wsService_, _userStorage_);
    //preClose(_$rootScope_, _wsService_, _userStorage_);
    wsService.close(1000, JSON.stringify({"msg":"refresh"}));
};

function preClose($rootScope, wsService, userStorage) {
    var PayloadData = {};
    PayloadData.uid = userStorage.getStorage("userName");
    PayloadData.items = {};
    PayloadData.items.remoteId = userStorage.getStorage("remoteId");
    //$rootScope.$emit(userStorage);
    PayloadData.items.remoteUid = {};
    if (userStorage.getStorage("remoteId")) {
        PayloadData.items.remoteUid.askerUid = userStorage.getStorage("askerName");
        PayloadData.items.remoteUid.helperUid = userStorage.getStorage("helperName");
    }

    wsService.close(1000, JSON.stringify(PayloadData)); //关闭TCP连接
}