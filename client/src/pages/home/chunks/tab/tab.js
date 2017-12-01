/**
 * Created by Andy on 2017/11/20.
 */

import tpl from "./tab.jade";
import "./tab.scss";

export default function () {
    return {
        restrict:"E",
        scope:{},
        template: tpl(),
        controller: ctrl,
        link:link
    }
};
function link($scope){
    $scope.tabItem = [
        {title:"动画测试"},
        {title:"数据测试"}
    ];
}
class ctrl {
    constructor($scope) {
        "ngInject";

    }

}