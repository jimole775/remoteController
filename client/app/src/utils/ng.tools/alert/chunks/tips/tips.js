/**
 * Created by Andy on 2017/12/30.
 */
import tpl from "./tips.jade";
import "./tips.less";
import $ from "jquery";
export default function () {
    return {
        replace: true,
        restrict: "E",
        template: tpl(),
        controller: Ctrl,
        link: link,
        scope: false,
        require: "^alertPlugin"
    }
}

class Ctrl {
    constructor($scope) {
        $scope.tip = "提示";
    }
}
Ctrl.$inject = ['$scope']
function link($scope, $element) {

    let _element = $($element);
    let $target = null; // 这个元素用于计算和定位元素
    let timer = null;   // 淡出淡入的计时器
    $scope.alert.tips = function (target = null, msg = "") {

        if (!target) throw new Error("the alert.warns function's params is not defined!");

        // 绑定文本，并显示
        $scope.tip = msg;

        // 根据当前时间匹配问候语
        $scope.welcomes = dynamicGreet();

        // 筛选出正确的jq对象;
        $target = queryDom(target);

        appendElement($target, _element);

        // 计算高宽, 定位元素
        calcSize($target, _element);

        // 实现淡出淡入效果
        fadeInOut(timer, _element);

    };
}
link.$inject = ['$scope', '$element']
function calcSize(fatherTarget, thisElement) {

    let offsetLeft = fatherTarget.offset().left;
    let offsetTop = fatherTarget.offset().top;
    let width = fatherTarget.innerWidth();
    let height = fatherTarget.innerHeight();
    thisElement.stop().show().css({
        opacity: 1,
        left: offsetLeft + width * (3 / 4)
        , top: offsetTop - (thisElement.innerHeight() + 12)
    });
}

function queryDom(target) {
    let res = null;
    if (typeof target === "string") {

        // 如果字串第一位是“#”，判断输入为ID名
        if (target.indexOf("#") === 0) {
            res = $(target);
        }

        // 否则就是class或者标签名
        else {
            res = (function () {
                var visElement = null;

                // 筛选出第一个显示的
                $(target).each(function (index, item) {
                    if ($(item).is(":visible")) {
                        visElement = item;
                        return false;
                    }
                });

                return $(visElement);
            })();
        }
    }

    // document类型
    else {

        // dom数组 类型
        if (target.length > 1) {
            res = (function () {
                var result = null;

                //获取并返回第一个显示的
                $(target).each(function (index, item) {
                    if ($(item).is(":visible")) {
                        result = item;
                        return false;
                    }
                });

                return $(result);
            })();
        }

        // 标签 类型
        else {

            // htmlDom 类型
            if (target.nodeType === 1) {
                res = $(target);
            }

            // jQuery 类型
            else if (target.__proto__ && target.__proto__.jquery) {
                res = target;
            }
        }
    }

    return res;

}

function fadeInOut(timer, thisElement) {
    clearTimeout(timer); // 先清除上一个timer，再设置下一个
    timer = setTimeout(function () {
        thisElement.animate({ opacity: 0 }, 500, function () {
            thisElement.remove();  // 最后删除元素
        });
    }, 500);
}

function appendElement($target, _element) {

    // 先删除, 再append, 防止用户多次点击, 多次创建P标签
    _element.remove();

    if ($target[0].tagName === "INPUT" || $target[0].tagName === "IMG") {
        $target.parent().append(_element[0]);
    } else {
        $target.append(_element[0]);
    }

}

function dynamicGreet() {
    let welcomes = "你好";
    let curHour = (new Date).getHours();
    let morning = [5, 6, 7, 8, 9, 10, 11];
    let noon = [12, 13];
    let afterNoon = [14, 15, 16, 17, 18];
    let night = [19, 20, 21, 22];
    let goodNight = [23, 0, 1, 2, 3, 4];

    let map = new Map();
    map.set(morning, "早上好");
    map.set(noon, "中午好");
    map.set(afterNoon, "下午好");
    map.set(night, "晚上好");
    map.set(goodNight, "晚安");

    for (let item of map.keys()) {
        if (item.indexOf(curHour) > 0) {
            welcomes = map.get(item);
        }
    }

    return welcomes;

}