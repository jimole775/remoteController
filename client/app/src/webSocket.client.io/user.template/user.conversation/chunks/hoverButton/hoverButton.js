/**
 * Created by Andy on 2016/12/19.
 */
import tpl from "./hoverButton.jade";
import "./hoverButton.less";
import hoverButtonImg from "../../images/msg_2.png";

export default function () {
    return {
        replace: true,
        restrict: "EA",
        scope: {},
        template: tpl(),
        controller: Ctrl,
        link: link
    }
}

class Ctrl {
    constructor($scope, $element, $rootScope, ngTool, userStorage, charState) {
        $scope.safeApply = ngTool.injectScope($scope).safeApply;
        $scope.jroll = ngTool.jroll;
        $scope.Drag = ngTool.Drag;

        $scope.remoteId = 0;
        $scope.charShow = false;
        $scope.newMsgCount = 0;

        $scope.showCharForm = function () {
            $scope.charShow = charState.charShow = true;
            $scope.newMsgCount = charState.newMsgCount = 0;
            setTimeout(function () {
                $rootScope.$emit(charState);
            });
            $scope.jroll(document.body.getElementsByClassName("char-body")[0], "bottom");
        };

        $rootScope.$on(charState, function (scope) {
            $scope.safeApply(function () {
                $scope.charShow = charState.charShow;
                $scope.newMsgCount = charState.newMsgCount;
            });
        });

        $rootScope.$on(userStorage, function (scope) {
            $scope.safeApply(function () {
                $scope.remoteId = userStorage.getStorage("remoteId");
                if ($scope.remoteId) {
                    setTimeout(function () {
                        new $scope.Drag(
                            $element[0]
                        );
                    });
                }
            });
        });

    }
}
Ctrl.$inject = ['$scope', '$element', '$rootScope', 'ngTool', 'userStorage', 'charState']
function link($scope, $element) {
    $scope.hoverStyle = {
        width: "inherit",
        height: "inherit",
        background: `url(${hoverButtonImg}) no-repeat center`,
        backgroundSize: "3.2rem 3.2rem",
        backgroundColor: "rgb(85, 139, 212)",
        borderRadius: "4px",
        boxShadow: "3px 3px 7px #202c3a"
    };
}
link.$inject = ['$scope', '$element']
