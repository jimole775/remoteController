/**
 * Created by Andy on 2017/11/29.
 */

import $ from "jquery";
import "./userRegister.scss";
import tpl from "./userRegister.jade";

export default function () {
    return {
        restrict: "EA",
        transclude: true,
        replace: true,
        template: tpl(),
        controller: Ctrl,
        link: link,
        scope: {}
    }
}

class Ctrl {
    constructor($scope, $element, ngTool, wsService, userStorage) {
        $scope.safeApply = ngTool.injectScope($scope).safeApply;
        $scope.tool = ngTool;
        $scope.wsService = wsService;
        $scope.userStorage = userStorage;
        $scope.userName = "";
        $scope.maxLength = 14;

        $scope.watcher = $scope.$watch("userName", function (changed, old, scope) {
            let zhCount = 0;
            let singleChanged = changed;
            if (singleChanged) {
                singleChanged.split("").forEach(function (item) {

                    // 中文的UNICODE是四位
                    if (item.charCodeAt().toString(16).length >= 4) {
                        zhCount++;
                    }
                });
            }

            // 每有一位中文，长度限制就减一，最终目的：7位中文 or 14位英文
            $scope.safeApply(function(){
                let lastSpace = 14 - zhCount;
                if(lastSpace >= 7){
                    $scope.maxLength = lastSpace;
                }
            });
        });

        $scope.submit = function () {
            if ($scope.userName.toString().trim()) {
                //if ($scope.userStorage.getStorage("userList").indexOf($scope.userName) >= 0) {
                //    $scope.tool.alert.warns("那么帅气的名字已经被抢了");
                //}
                if (/[`~!！?？@#$%^&'"“”\{}\[\]\(\)\\\/\*]/.test($scope.userName)) {
                    $scope.tool.alert.warns("请不要使用特殊字符");
                }
                else {

                    $scope.userStorage.setStorage("nativeName", $scope.userName);
                    $scope.wsService.emit(0x01,function(response){
                        if(response.serverData.regPass){
                            $element.remove();
                            $("section").css("filter", "blur(0)");
                            $scope.watcher();
                        }else{
                            $scope.tool.alert.warns("那么帅气的名字已经被抢了");
                        }
                    });
                }
            } else {
                $scope.tool.alert.warns("不支持黑户");
                $element.find("input")[0].placeholder = "请先取一个名字！";
            }
        };
    }

}

function link($scope, $element, $attr, ctrl) {
    "ngInject";

    // 添加磨砂玻璃效果
    $("section").ready(function () {
        $("section").css("filter", "blur(4px)");
    });

    // 监听回车键
    document.body.onkeydown = function(e){
        if(e.keyCode === 13 && $($element).is(":visible")){
            $scope.submit.call($scope,null);
        }
    }


}