/**
 * Created by Andy on 2017/12/14.
 */
export default function ({
        response, $rootScope, wsService, ngTool, wsTool, userStorage
    }) {
    console.log(response);
    console.log("握手成功", global.env);

    // 监听ws状态,通过条件后,发送00,获取用户列表
    var loop = setInterval(function () {
        if (wsService.readyState === 1 && wsService.emit) {
            wsService.emit(0x00,function(){console.log("ws心跳")});
            clearInterval(loop);
        }
    }, 300);
};
