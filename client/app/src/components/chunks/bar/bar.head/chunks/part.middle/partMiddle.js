/**
 * Created by Andy on 2017/12/24.
 */
import tpl from "./partMiddle.jade";
import "./partMiddle.less";
export default function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        link: link,
        template: tpl()
    }
}

function link($scope) {
    $scope.title = "远程测试机";
}
link.$inject = ['$scope']
