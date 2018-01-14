/**
 * Created by Andy on 2018/1/10.
 */

import Request from "./Ajax.request/AjaxRequest.js";
import Receiver from "./Ajax.receiver/AjaxReceiver.js";

export default angular.module("ajax", [])
    .service("ajax", function (userStorage, $rootScope, wsService) {
        return new Request(userStorage, new Receiver(), $rootScope, wsService);
    });