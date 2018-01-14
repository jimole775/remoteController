/**
 * Created by Andy on 2017/12/16.
 */
import wsService from "wsClient/ws.service/exports";
import wsStorage from "wsClient/ws.storage/wsStorage";
import wsTool from "wsClient/ws.tools/exports";
import user from "wsClient/user.template/exports";
export default angular.module("wsClient",[user.name])
    .config(function($provide){
        $provide.service("wsService",wsService);
        $provide.factory("wsTool",wsTool);
        $provide.constant("userStorage",wsStorage);
    });
