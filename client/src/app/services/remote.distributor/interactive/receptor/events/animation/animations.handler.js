/**
 * Created by Andy on 2017/11/1.
 */
import "animations.scss";
import tpl from "animations.template.jade";
import $ from "jQuery";

export default function (funcName, RMTClickAnimationData, varParams) {

    var dataArr = RMTClickAnimationData.split(",");

    var clickCoords = dataArr[0];
    var clickItem = dataArr[1];
    var theControllerHasScrollBar = dataArr[2];

    var pageX = parseFloat(clickCoords.split("_!_")[0]);
    var pageY = parseFloat(clickCoords.split("_!_")[1]);

    var clickItemType = clickItem.split("_!_")[0];
    var clickItemIndex = parseFloat(clickItem.split("_!_")[1]);

    //在每次远程数据传输过来之后，都会重置win.CONSTANT.CLICK_POSITION_X 和 CLICK_POSITION_Y,
    //所以，当两个值都为0的时候，证明 button 的代理事件没有触发，传送过来的是滑动事件 或者 其他事件，
    //不需要 激活动画，立即读取远程数据就可以了
    if (pageX == "0" && pageY == "0") {
        decodeRMTDataPackage(funcName, varParams);
        return;
    }

    //如果传输过来的点击事件 是 button 或者 input 标签触发的，就寻找对应的标签，改变背景色
    if (clickItemIndex >= 0) {
        var clickElement = $($("body").find(clickItemType).eq(clickItemIndex));

        //disable-RMTActive 意为拒绝远程 点击动画
        if (!clickElement.hasClass("disable-RMTActive")) {
            var scrollBody = clickElement.parents(".scroll-table-body");
            var originalBackground = clickElement.css("backgroundColor");

            //如果对方没有滚动条，而本地有，那就先把需要点击的元素 滚动到页面顶部之后 再执行点击事件
            if (scrollBody.length &&
                theControllerHasScrollBar === "false" &&
                scrollBody[0].scrollHeight - scrollBody.height() > 0) {

                $(scrollBody).animate({scrollTop: clickElement[0].offsetTop}, 300, function () {
                    clickElement.addClass("animation").css({
                        transform: "scale(0.9, 0.9)",
                        backgroundColor: "#002750"
                    });
                });

            }
            else {

                clickElement.addClass("animation").css({
                    transform: "scale(0.9, 0.9)",
                    backgroundColor: "#002750"
                });

            }

            setTimeout(function () {
                clickElement.css({transform: "scale(1, 1)", "backgroundColor": originalBackground});
            }, 200);
        }
    }

    //给500MS的事件运行点击动画，再执行远程事件
    setTimeout(function () {
        decodeRMTDataPackage(funcName, varParams)
    }, 500);
}