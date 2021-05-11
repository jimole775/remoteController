/**
 * Created by Andy on 2017/12/15.
 */
import closeHandler from "../on.close/close.js";
export default function ({
    response, $rootScope, wsService, ngTool, wsTool, userStorage
}) {
    console.log(response, "ws错误信号！");
    closeHandler({
        response, $rootScope, wsService, ngTool, wsTool, userStorage
    });
};