/**
 * Created by Andy on 2017/3/4.
 */
import "./userList.less";
import tpl from "./userList.jade";
import user_list from "../images/user_list.png";
import avatar from "../images/avatar_default.png";
import sendMsg from "../images/send_1.png";

export default function () {
    return {
        replace: true,
        restrict: "EA",
        controller: Ctrl,
        link: link,
        template: tpl()
    }
}

class Ctrl {
    constructor($scope, $rootScope, ngTool, wsService, userStorage, charState) {
        $scope.safeApply = ngTool.injectScope($scope).safeApply;
        $scope.Drag = ngTool.Drag;
        $scope.alert = ngTool.alert;
        $scope.jroll = ngTool.jroll;
        $scope.wsService = wsService;
        $scope.userStorage = userStorage;
        $scope.charState = charState;
        $scope.showUserList = false;
        $scope.newUserCount = 0;
        $scope.items = [];

        $rootScope.$on(userStorage, function () {
            let startTime = new Date().getTime();

            let userList = userStorage.getStorage("userList");


            if (!userList && !userList.length) return;

            let remoteChanelMap = userStorage.getStorage("remoteChanelMap");
            let askerName = userStorage.getStorage("askerName");
            let helperName = userStorage.getStorage("helperName");

            $scope.safeApply(function () {
                $scope.nativeName = userStorage.getStorage("nativeName");
                $scope.newUserCount = $scope.showUserList ? 0 : userStorage.getStorage("newUserCount");
                $scope.items.length = 0;    //重置
                $scope.isRMT = userStorage.getStorage("remoteId");
                userStorage.getStorage("userList").forEach(function (user, index) {
                    $scope.items.push({
                        isDisabled: $scope.isRMT != 0,
                        isAbleMsgFn: $scope.isRMT != 0 && (user.name === askerName || user.name === helperName),
                        userName: user.name,
                        RMTState: "协助者 || 忙碌中",
                        isBusing: user.connectWith,

                        event: function (oppositeName) {

                            $scope.alert.prompt("是否请求【" + oppositeName + "】的帮助？")
                                .addConfirmBehavior(function () {
                                    userStorage
                                        .setStorage("askerName", userStorage.getStorage("nativeName"))
                                        .setStorage("helperName", oppositeName)
                                        .setStorage("oppositeName", oppositeName);
                                    $scope.alert.loading("等待对方应答...");
                                    $scope.wsService.emit(0x02);

                                })
                                .addCancelBehavior(function () {
                                    userStorage
                                        .setStorage("askerName", null)
                                        .setStorage("helperName", null)
                                        .setStorage("oppositeName", null);
                                });
                        }
                    });
                });

            });

            console.log("刷新列表所需时间：", new Date().getTime() - startTime, "ms");
        });

    }
}
Ctrl.$inject = ['$scope', '$rootScope', 'ngTool', 'wsService', 'userStorage', 'charState']
function link($scope, $element) {

    // 实例化拖拽事件
    setTimeout(function () {
        new $scope.Drag(
            $element[0].querySelector(".user-list-header"),
            $element[0].querySelector(".user-list-frame"),
            $element[0].querySelector(".extend-trigger")
        );
    }, 100);

    // 用户列表关联按钮的样式
    $scope.user_list_style = {
        background: `url(${user_list}) no-repeat center`,
        backgroundSize: '32px 32px'
    };

    // 用户头像的样式
    $scope.avatar_style = {
        background: `url(${avatar}) no-repeat center`,
        backgroundSize: '32px 32px',
        width: '32px',
        height: '32px',
        position: 'absolute',
        top: '3px',
        left: '3px',
        cursor: 'pointer'
    };

    // 用户列表关联按钮的样式
    $scope.send_msg = {
        background: `url(${sendMsg}) no-repeat center`,
        backgroundSize: '3rem 3rem',
        backgroundColor: "#00a96c"
    };

    $scope.hideUserList = function () {
        $scope.showUserList = false;
    };

    $scope.showCharForm = function (oppositeName) {
        $scope.charState.charShow = true;
        $scope.charState.charWith = oppositeName;
        $scope.$root.$emit($scope.charState);
    };

    $scope.mainButtonClick = function () {
        $scope.newUserCount = 0;
        $scope.showUserList = !$scope.showUserList;
        setTimeout(function () {
            $scope.jroll($element[0].querySelectorAll(".user-list-wrapper")[0]);
        }, 100);
    };

}
link.$inject = ['$scope', '$rootScope']
