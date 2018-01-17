/**
 * Created by Andy on 2018/1/11.
 */

import $ from "jquery";
import JRoll from "jroll";
let body = document.body;
let wsEmitter = null;
let touchStart = "ontouchstart" in window ? "touchstart" : "mousedown"
    , touchMove = "ontouchmove" in window ? "touchmove" : "mousemove"
    , touchEnd = "ontouchend" in window ? "touchend" : "mouseup"
    , start = false
    , move = false
    , startTime = null
    , endTime = null
    , target = null;

export default function ({prayload, userStorage, wsService}) {

    if (userStorage.getStorage("remoteId") === 2) {
        wsEmitter = wsService.emit;

        //buildScrollEventsToJquery();

        //new JRoll("#wrapper6").on("scrollEnd",function(){
        //    console.log("yeah",arguments);
        //});
        body.addEventListener(touchStart, startHandler);

        //body.addEventListener(touchMove, moveHandler);

        //body.addEventListener(touchEnd, endHandler);
    } else {
        body.removeEventListener(touchStart, startHandler);

        //body.removeEventListener(touchMove, moveHandler);

        //body.removeEventListener(touchEnd, endHandler);
    }

}

function buildScrollEventsToJquery() {
    var special = $.event.special,
        handle = $.event.handle ? $.event.handle : $.event.dispatch,//兼容1.9之后jQuery.event.handle为undefined的BUG
        uid1 = 'D' + (+new Date()),
        uid2 = 'D' + (+new Date() + 1);

    special.scrollStart = {
        setup: function () {

            var timer,
                handler = function (evt) {

                    var _self = this,
                        _args = arguments;

                    if (timer) {
                        clearTimeout(timer);
                    }
                    else {
                        evt.type = 'scrollStart';
                        handle.apply(_self, _args);
                    }

                    timer = setTimeout(function () {
                        timer = null;
                    }, special.scrollStop.latency);

                };

            $(this).bind('scroll', handler).data(uid1, handler);

        },
        teardown: function () {
            $(this).unbind('scroll', $(this).data(uid1));
        }
    };

    special.scrollStop = {
        latency: 300,
        setup: function () {

            var timer,
                handler = function (evt) {

                    var _self = this,
                        _args = arguments;

                    if (timer) {
                        clearTimeout(timer);
                    }

                    timer = setTimeout(function () {

                        timer = null;
                        evt.type = 'scrollStop';
                        handle.apply(_self, _args);

                    }, special.scrollStop.latency);

                };

            $(this).bind('scroll', handler).data(uid2, handler);

        },
        teardown: function () {
            $(this).unbind('scroll', $(this).data(uid2));
        }
    };
}


let jrollIdCache = new Map();

function startHandler(e) {
    //start = true;
    matchTheScrollElement(e.target);
    let target = matchTheScrollElement.target;

    let idDetail = target.attributes["id"];

    // 防止空内容 和 重复绑定事件
    if (!idDetail || jrollIdCache.get(idDetail.value)) return;

    jrollIdCache.set(idDetail.value, true);

    let targetId = idDetail.value;
    let curJroll = new JRoll(`#${targetId}`).on("scrollEnd", function () {
        let jrollX = curJroll.x;
        let jrollY = curJroll.y;
        if (wsEmitter)wsEmitter(0x0A, {targetId, jrollX, jrollY});
    });
}

function matchTheScrollElement(target){
    let idDetail = target.attributes["id"];
    if (idDetail && /(wrapper)/.test(idDetail.value) || target.tagName.toUpperCase() === "BODY") {
        matchTheScrollElement.target = target;
    }else{
        matchTheScrollElement(target.parentNode)
    }
}


function moveHandler(e) {
    if (!start)return;
    move = true;
}

function endHandler(e) {
    if (!move || !start) return;
    start = false;
    move = false;
    endTime = new Date().getTime();

    if (target.scrollHeight > 0 || target.scrollWidth > 0) {
        let targetName = target.tagName.toUpperCase();
        let targetIndex = $("body").find(targetName).index(target);
        let offsetTop = target.offsetTop / target.offsetHeight;
        let offsetLeft = target.offsetLeft / target.offsetWidth;
        let intervalTime = endTime - startTime; // 给自拟定slider使用的属性,用于计算什么时候停止滚动
        if (wsEmitter)wsEmitter(0x0A, {offsetTop, offsetLeft, targetName, targetIndex});
        console.log({offsetTop, offsetLeft, targetName, targetIndex, intervalTime});
    }
}