/**
 * Created by Andy on 2017/11/20.
 */

import tpl from "./tab.jade";
import "./tab.less";

export default function () {
    return {
        restrict: "E",
        scope: {},
        template: tpl(),
        controller: Ctrl,
        link: link
    }
}

function link() {
}

class Ctrl {
    constructor($scope) {
        $scope.tabItem = [
            { title: "动画测试" },
            { title: "数据测试" }
        ];
    }
}

Ctrl.$inject = ['$scope']
