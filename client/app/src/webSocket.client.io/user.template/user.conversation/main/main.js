/**
 * Created by Andy on 2017/11/13.
 */
import tpl from "./main.jade";
import "./main.less";

export default function (){
    return {
        restrict:"EA",
        replace:true,
        scope:false,
        template:tpl(),
        controller:Ctrl
    }
}

class Ctrl{
    constructor($scope, $element, ngTool, $rootScope, userStorage, charState){
        "ngInject";
        $scope.safeApply = ngTool.injectScope($scope).safeApply;
        // ʵ������ק�¼�
        new ngTool.Drag(
            $element[0].querySelector(".char-head-bar"),
            $element[0].querySelector(".char-form")
        );

        $scope.charShow = false;
        $rootScope.$on(charState, function (scope) {
            $scope.charShow = charState.charShow;
            $scope.remoteId = userStorage.getStorage("remoteId");
        });

    }
}
