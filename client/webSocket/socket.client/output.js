/**
 * Created by Andy on 2017/3/9.
 */
(function (WebSocket) {

    var send = WebSocket.prototype.send;


    WebSocket.prototype.send = function () {

        var formatData = null;
        var that = this;

        switch (arguments[0]) {
            case 0x00://连接之前，通知服务器下发一份当前在线的用户列表
                formatData = {
                    status: arguments[0],
                    uid: ""
                };
                break;
            case 0x01:	//发送用户名，让服务器刷新用户列表
                formatData = {
                    status: arguments[0],
                    uid: that.tool.getUserName()
                };
                break;
            case 0x02:	//协助通道的询问
            case 0x03:  //协助通道的应答
            case 0x04:	//
                formatData = {
                    status: arguments[0],
                    uid: that.tool.getUserName(),
                    items: {
                        remoteUid: {
                            askerUid: that.tool.getAskerName(),
                            helperUid: that.tool.getHelperName()
                        },
                        RMTRequest: arguments[1]
                    }
                };
                break;
            case 0x05:   //远程协助交互通道
                formatData = {
                    status: arguments[0],
                    uid: that.tool.getUserName(),
                    items: {
                        remoteUid: {
                            askerUid: that.tool.getAskerName(),
                            helperUid: that.tool.getHelperName()
                        },
                        activeData: {
                            remoteRole: arguments[1],
                            funcName: arguments[2],
                            expression: arguments[3]
                        }
                    }
                };
                break;
            case 0x06:
                break;
            case 0x07:
                break;
            case 0xFF:  //断开协助通道
                formatData = {
                    status: arguments[0],
                    uid: that.tool.getUserName()
                };
                break;
            default :
                break;
        }

        var data = new Blob([JSON.stringify(formatData)], {type: "text/plain"});
        send.call(this, data);
    };

})(WebSocket ? WebSocket : function WebSocket() {
});
