/**
 * Created by Andy on 2017/11/20.
 */
import tpl from "./content.jade";
import "./content.less";
import scrollImg from "./imags/scroll.png";
import dataImg from "./imags/data.png";
import dataMultiImg from "./imags/data_multi.png";

export default function () {

    return {
        restrict: "E",
        scope: {},
        template: tpl(),
        controller: Ctrl,
        link: link
    }
};

function link($scope, $element, $attrs, req) {



}

link.$inject = ['$scope', '$element', '$attrs', 'req']

class Ctrl {
    constructor($scope, ngTool) {
        $scope.contentItem = [
            {
                title: "动画测试",
                items: [
                    {
                        name: "滚动",
                        picture: scrollImg,
                        uiSref: "animation"
                    }
                ]
            },
            {
                title: "数据测试",
                items: [
                    {
                        name: "单帧",
                        picture: dataImg,
                        uiSref: "scanner"
                    },
                    {
                        name: "并发",
                        picture: dataMultiImg,
                        uiSref: "home"
                    }
                ]
            }
        ];

        $scope.eventHandle = function (itemInfo) {
            if (itemInfo.name === "并发") {
                ngTool.alert.prompt("was building hard~");
            }
        }
    }
}

Ctrl.$inject = ['$scope', 'ngTool']
