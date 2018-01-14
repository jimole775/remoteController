/**
 * Created by Andy on 2017/11/9.
 */
import tpl from "./headBar.jade";
import "./headBar.scss";

export default function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        //controller: Ctrl,
        link: link,
        template: tpl()
    }
}

function link($scope) {
    $scope.title = "远程测试机";
}
