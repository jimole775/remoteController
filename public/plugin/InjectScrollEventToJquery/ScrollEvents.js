/**
 * Created by Andy on 2017/1/23.
 */

/**
 * 添加JQ事件 scrollstart 和 scrollstop
 * 用于在远程协助功能下,滚动停止之后计算高度发送给对方进行同步
 * 原jq版本是没有这两个事件的!
 * */
(function () {

    var special = jQuery.event.special,
        handle = jQuery.event.handle ? jQuery.event.handle : jQuery.event.dispatch,//兼容1.9之后jQuery.event.handle为undefined的BUG
        uid1 = 'D' + (+new Date ()),
        uid2 = 'D' + (+new Date () + 1);

    special.scrollStart = {
        setup: function () {

            var timer,
                handler = function (evt) {

                    var _self = this;

                    if (timer) {
                        clearTimeout (timer);
                    }
                    else {
                        evt.type = 'scrollStart';
                        handle.apply (_self, arguments);
                    }

                    timer = setTimeout (function () {
                        timer = null;
                    }, special.scrollStop.latency);

                };

            jQuery (this).bind ('scroll', handler).data (uid1, handler);

        },
        teardown: function () {
            jQuery (this).unbind ('scroll', jQuery (this).data (uid1));
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
                        clearTimeout (timer);
                    }

                    timer = setTimeout (function () {

                        timer = null;
                        evt.type = 'scrollStop';
                        handle.apply (_self, _args);

                    }, special.scrollStop.latency);

                };

            jQuery (this).bind ('scroll', handler).data (uid2, handler);

        },
        teardown: function () {
            jQuery (this).unbind ('scroll', jQuery (this).data (uid2));
        }
    };

    var win =window;
    win.global.RMTSlider = {
        getScrollTop: (function () {
            var _watcher = setInterval (function () {
                if ($ (".scroll-table-body").length) {clearInterval (_watcher)}
                var pageHeight = 1, scrollHeight = 1, max_scrollTop = 1;
                $ (".scroll-table-body").on ("scrollStart", function (e) {
                    e.stopPropagation ();
                });
                $ (".scroll-table-body").on ("scrollStop", function () {
                    var ele = $ (this);
                    scrollHeight = ele[0].scrollHeight;
                    pageHeight = ele.height ();
                    max_scrollTop = scrollHeight - pageHeight;
                    var curTop = ele.scrollTop ();
                    if (max_scrollTop > 0 && global.RMTID.role == 2) {     //如果当前页面没有滚动条，最大滚动高度就为零，作为运算式的分母，为0的时候，除运算结果为 “NAN”,所以没必要进行转发
                        win.sendRMTEventToApp ("global.RMTSlider.setScrollTop", [ele.parents (".data-box").attr ("id"), curTop / max_scrollTop]);
                    }
                });
            }, 100);
        }) (),

        setScrollTop: function (boxid, curScrollTopPercent) {
            var ele = $ ("#" + boxid + " .scroll-table-body");
            var pageHeight = ele.height ();
            var scrollHeight = ele[0].scrollHeight;
            var max_scrollTop = scrollHeight - pageHeight;
            ele.animate ({scrollTop: max_scrollTop * curScrollTopPercent}, 500);
        }
    };

}) ();
