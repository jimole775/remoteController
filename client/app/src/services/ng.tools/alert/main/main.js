/**
 * Created by Andy on 2017/12/2.
 */
import tpl from "./main.jade";
import "./main.less";
import AlertInterface from "../interface/Alert.js";
export default function directive() {
    return {
        replace: true,
        restrict: "E",
        controller: Ctrl,
        link: link,
        template: tpl()
    };
}

class Ctrl {
    constructor($scope) {
        $scope.message = null;
        $scope.promptVisible = null;
        $scope.loadingVisible = null;
        $scope.confirmText = null;
        $scope.confirmBehavior = null;
        $scope.cancelText = null;
        $scope.cancelBehavior = null;
        $scope.alert = AlertInterface;   //指针，已经把$scope.alert指向了 Alert的实例 “alert” 的地址
    }
}
Ctrl.$inject = ['$scope']
function link($scope, $element) {
    $scope.alert.hide = function () {
        $scope.promptVisible = false;
        $scope.loadingVisible = false;
        return $scope.alert;
    };

    $scope.alert.addConfirmBehavior = function (confirmText = "确定", callback = ()=> {
    }) {
        if (typeof confirmText === "function") {
            callback = confirmText;
            confirmText = "确定"
        }
        $scope.confirmText = confirmText;
        $scope.confirmBehavior = (...args)=> {
            $scope.alert.hide();
            callback.apply(this, args);
        };
        return $scope.alert;
    };

    $scope.alert.addCancelBehavior = function (cancelText = "取消", callback = ()=> {
    }) {
        if (typeof cancelText === "function") {
            callback = cancelText;
            cancelText = "取消"
        }
        $scope.cancelText = cancelText;
        $scope.cancelBehavior = (...args) => {
            $scope.alert.hide();
            callback.apply(this, args);
        };
        return $scope.alert;
    };

}
link.$inject = ['$scope', '$element']
