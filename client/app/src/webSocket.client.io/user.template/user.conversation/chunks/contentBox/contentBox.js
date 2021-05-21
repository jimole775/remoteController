/**
 * Created by Andy on 2017/12/21.
 */
import tpl from "./contentBox.jade";
import "./contentBox.less";
import avatar from "../../images/avatar_1.png";
export default function () {
    return {
        restrict: 'EA',
        replace: true,
        scope: {},
        template: tpl(),
        controller: Ctrl,
        link: link
    }
}

class Ctrl {
    constructor($scope, $element, $rootScope, ngTool, userStorage, charState) {
        $scope.safeApply = ngTool.injectScope($scope).safeApply;
        $scope.charState = charState;
        $scope.userStorage = userStorage;
        $scope.ngTool = ngTool;

        $rootScope.$on(charState, function () {
            $scope.remoteId = $scope.userStorage.getStorage("remoteId");
            if (charState.charParagraphs.length) {
                ngTool.jroll($element[0], "bottom");
            }
        });
    }
}
Ctrl.$inject = ['$scope', '$element', '$rootScope', 'ngTool', 'userStorage', 'charState']

function link($scope) {
    $scope.avatarStyle = {
        background: `url(${avatar}) no-repeat`,
        backgroundSize: "3rem",
        width: "100%",
        height: "100%"
    };

    $scope.nativeStyle = {
        "flex-direction": "row"
    };

    $scope.oppositeStyle = {
        "flex-direction": "row-reverse"
    }
}
link.$inject = ['$scope']
