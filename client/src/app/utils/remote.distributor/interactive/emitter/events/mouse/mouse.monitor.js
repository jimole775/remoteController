/**
 * Created by Andy on 2017/11/9.
 */
import $ from "jquery";
/**
 *全局点击事件的代理方法；
 *区别远程滚动事件的交互模式：
 *点击动画必须在 远程点击事件执行之前运行，所以不能生产独立帧数据，
 *把点击坐标拼接在 sendRMTEventToApp 方法的第一个参数后面，以“_|_”为标识
 * */
body.ready(function () {

    body.delegate("button", "touchstart", function (e) {
        mouseEvent.coord.X = e.originalEvent.changedTouches[0].pageX / win.CONSTANT.WINDOW_WIDTH;
        mouseEvent.coord.Y = e.originalEvent.changedTouches[0].pageY / win.CONSTANT.WINDOW_HEIGHT;
        var curTarget = e.currentTarget;
        mouseEvent.type = "button";
        mouseEvent.index = $("body").find("button").index(curTarget);

        var scrollBody = $(curTarget).parents(".scroll-table-body");
        if (scrollBody.length) {
            if (scrollBody[0].scrollHeight - scrollBody.height() > 0) {
                mouseEvent.hasScrollBar = true;
            }
        }
    });

    body.delegate("input", "touchstart", function (e) {
        mouseEvent.coord.X = e.originalEvent.changedTouches[0].pageX / win.CONSTANT.WINDOW_WIDTH;
        mouseEvent.coord.Y = e.originalEvent.changedTouches[0].pageY / win.CONSTANT.WINDOW_HEIGHT;
        var curTarget = e.currentTarget;
        mouseEvent.type = "input";
        mouseEvent.index = $("body").find("input").index(curTarget);

        var scrollBody = $(curTarget).parents(".scroll-table-body");
        if (scrollBody.length) {
            if (scrollBody[0].scrollHeight - scrollBody.height() > 0) {
                mouseEvent.hasScrollBar = true;
            }
        }
    });
});