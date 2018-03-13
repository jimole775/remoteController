/**
 * Created by Andy on 2017/11/21.
 */

import $ from "jquery";
export default class {
    constructor(params) {
        var that = this;
        $("body").ready(function () {
            that.init(params);
            that.run();
        });

        return this;
    }

    init({
        tabId = ""
        , slidingShoeId = "" //导航条的滑块，跟随页面左右滑动
        , contextBoxId = ""   //滑动内容展示窗口,位置,尺寸固定,属于布局层
        , sliderBodyId = ""   //控制左右滑动的盒子,包裹所有的滑动块
        , sliderChunkTagName = "ul"
        , sliderType = 'both'  //column row both
        , pageWidth = window.document.body.clientWidth
        , pageHeight = window.document.body.clientHeight

        , touchStart = "ontouchstart" in window ? "touchstart" : "mousedown"
        , touchMove = "ontouchmove" in window ? "touchmove" : "mousemove"
        , touchEnd = "ontouchend" in window ? "touchend" : "mouseup"

        , RMTHandler = { horizontalSliding: null, verticalSliding: null }
    }) {

        this.touchEvent = {};
        this.touchEvent.start = {};
        this.touchEvent.start.orgX = 0;
        this.touchEvent.start.orgY = 0;
        this.touchEvent.start.flag = false;

        this.touchEvent.move = {};
        this.touchEvent.move.orgX = 0;
        this.touchEvent.move.orgY = 0;

        this.touchEvent.end = {};
        this.touchEvent.end.orgX = 0;
        this.touchEvent.end.orgY = 0;

        this.touchEvent.type = {};
        this.touchEvent.type.start = touchStart;
        this.touchEvent.type.move = touchMove;
        this.touchEvent.type.end = touchEnd;


        this.count = {};
        this.count.endTime = 0;
        this.count.startTime = 0;
        this.count.diff_Time = 0;
        this.count.diff_X = 0;
        this.count.diff_Y = 0;
        this.count.slideLeft = 0;
        this.count.slideTop = 0;
        this.count.curShoeLeft = 0;
        this.count.curPageIndex = 0;

        this.flag = {};
        this.flag.freezeCoord = {};
        this.flag.freezeCoord.X = false;  //冻结X坐标在move事件的获取；
        this.flag.freezeCoord.Y = false;  //冻结Y坐标在move事件的获取；
        this.flag.isVerticalScroll = true;    //页面默认滚动操作为上下滚动，如果左右滑动的动作 大于 页面的1/8宽度+上下滚动的动作，就停止上下滚动的操作，切换到左右滑动
        this.flag.hasHorizontalScroll = true;     //判断是否存在滚动条
        this.flag.hasVerticalScroll = true;   //判断是否存在滚动条

        this.flag.sliderType = sliderType;
        this.flag.sliderChunkTagName = sliderChunkTagName;


        this.monitor = {};
        this.monitor.horizontalScrollingTimer = null;     //左右滑动完毕之后，必须等待300毫秒，才能归零flag.isVerticalScroll值，也就是说：左右滑动需要切换到上下滚动操作需要等待300毫秒
        this.monitor.verticalScrollingWatcher = null;
        this.monitor.interDeceleration = null;

        this.elements = {};


        this.elements.contextBox = $(`\#${contextBoxId}`);

        this.elements.nav = tabId ? $(`\#${tabId}`) : null;
        this.elements.slidingShoe = slidingShoeId ? $(`\#${slidingShoeId}`) : null;

        this.elements.sliderBodyController = sliderBodyId ? $(`\#${sliderBodyId}`) : this.elements.contextBox;

        //必要的滑动前提，暂时先这样处理，有时间再进行代码规整
        //可以用来测试新技术
        this.elements.sliderBodyController.find(sliderChunkTagName).each(function (index, item) {
            $(item).css({
                "position": "relative"
                , "overflow": "hidden"
            })
        });


        this.elements.sliderBodyController.curContentBox = $(this.elements.sliderBodyController.find(sliderChunkTagName)[0]);



        this.sliderType = sliderType;
        this.sliderChunkTagName = sliderChunkTagName;
        this.calcSize();
        this.resize();

    }

    calcSize() {
        this.size = {};
        this.size.pageHeight = window.document.body.clientHeight;
        this.size.pageWidth = window.document.body.clientWidth;

        this.size.topHeight = this.elements.nav ? this.elements.nav.height() : 0;
        this.size.frameHeight = this.elements.contextBox.height();

        this.size.limitTop = this.size.frameHeight - this.elements.sliderBodyController.curContentBox.height(); //向上滚动的极限距离 = 内容盒子的高度 - 展示窗口的高度
        this.size.initTop = parseFloat(this.elements.sliderBodyController.curContentBox.css("top")) || 0;

        window.onresize = () => {
            // 因为关系高宽的变化，所以需要在窗口变化的时候重新init一遍基础数据
            this.calcSize();
        };
    }

    hSlideTo(index) {
        if (/both|row/.test(this.sliderType)) {
            this.elements.sliderBodyController.animate({ "left": -(index * this.size.pageWidth) }, 300);
            this.elements.slidingShoe.animate({ "left": index * this.size.pageWidth / 2 }, 300);
            this.elements.nav.buttons = this.elements.nav.find("button");
            this.elements.nav.buttons.removeClass("nav-active");
            $(this.elements.nav.buttons[index]).addClass("nav-active");
        }
    }

    vSlideTo(index, offsetPercent) {
        if (/both|row/.test(this.sliderType)) {
            $(this.elements.sliderBodyController.find(this.sliderChunkTagName)[index]).animate({ "top": offsetPercent * this.size.limitTop }, 300);
        }
    }

    resize() {
        if (this.elements.nav) this.elements.nav.off();
        this.elements.contextBox.off();
        this.hSlideTo(0); //如果当前tab在第二页，出现计算错误的情况，先hack一下，如果页面有resize就直接设置为第一页
        //win.sendRMTEventToApp("RMTClickEvent.horizontalSliding", [0]);  //转发当前页面下标

    }

    run() {
        var that = this;

        //nav点击事件
        if (this.elements.nav)
            this.elements.nav.on("click", function (e) {
                console.log("the click event is work");
                var curTargetIndex = $(e.target.parentElement.children).index(e.target);  //获取点击的button的下标
                that.hSlideTo(curTargetIndex);
                //win.sendRMTEventToApp("RMTClickEvent.horizontalSliding", [curTargetIndex]);  //转发当前页面下标
            });

        //content触摸事件

        this.elements.contextBox.on(this.touchEvent.type.start, function (e) {
            that.touchEvent.start.flag = true;
            that.count.startTime = e.timeStamp;

            clearInterval(that.monitor.verticalScrollingWatcher);
            clearInterval(that.monitor.interDeceleration);
            clearTimeout(that.monitor.horizontalScrollingTimer);
            if (that.elements.slidingShoe) that.elements.slidingShoe.stop();
            that.elements.sliderBodyController.curContentBox.stop();
            that.elements.sliderBodyController.stop();
            var target = e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0] : e.originalEvent;

            that.touchEvent.start.orgX = target.pageX;
            that.touchEvent.start.orgY = target.pageY;

            that.count.slideLeft = parseFloat(that.elements.sliderBodyController.css("left"));   //获取 展示窗体 的left值
            that.count.curPageIndex = Math.ceil(Math.abs(that.count.slideLeft) / that.size.pageWidth);  //当前盒子的 下标
            that.elements.sliderBodyController.curContentBox = $(that.elements.sliderBodyController.find(that.flag.sliderChunkTagName)[that.count.curPageIndex]);   //获取当前 正文内容盒子
            that.count.slideTop = parseFloat(that.elements.sliderBodyController.curContentBox.css("top")) || that.size.initTop;    //获取当前 正文内容盒子 的top值
            if (that.elements.slidingShoe) that.count.curShoeLeft = parseFloat(that.elements.slidingShoe.css("left"));    //获取当前 导航滑动块 的left值
            that.size.limitTop = -(that.elements.sliderBodyController.curContentBox.height() - that.size.frameHeight);  //获取当前页面的 滚动条高度

            that.flag.hasVerticalScroll = that.elements.sliderBodyController.curContentBox.height() > that.size.frameHeight;  //水平滑动和垂直滑动 执行的盒子不相同
            that.flag.hasHorizontalScroll = that.elements.sliderBodyController.width() > that.size.pageWidth; //水平滑动和垂直滑动 执行的盒子不相同
        });

        this.elements.contextBox.on(this.touchEvent.type.move, function (e) {
            if (!that.touchEvent.start.flag) return;
            /**
             * 阻止move的默认动作,比如滚动条滑动 (现在就在模拟move的滚动条,在CSS里面已经禁止了浏览器滚动条:overflowHidden)
             * 如果不阻止默认动作,某些手机端的浏览器将无法滚动**/
            //e.preventDefault();
            var target = e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0] : e.originalEvent;
            //如果X轴未被冻结，就获取X轴信息；
            if (!that.flag.freezeCoord.X && /both|row/.test(that.flag.sliderType)) {
                that.touchEvent.move.orgX = target.pageX;
                that.count.diff_X = that.touchEvent.move.orgX - that.touchEvent.start.orgX;
            }

            //如果Y轴未被冻结，就获取Y轴信息；
            if (!that.flag.freezeCoord.Y && /both|column/.test(that.flag.sliderType)) {
                that.touchEvent.move.orgY = target.pageY;
                that.count.diff_Y = that.touchEvent.move.orgY - that.touchEvent.start.orgY;
            }

            if (Math.abs(that.count.diff_X) >= that.size.pageWidth / 5) {
                that.flag.freezeCoord.X = false;
                that.flag.freezeCoord.Y = true;
                that.flag.isVerticalScroll = false;
            }

            //一直监听X值和Y值的关系，如果 左右滑动的动作 大于 页面的1/8宽度+上下滚动的动作，就冻结上下滚动的坐标值，并且切换滚动模式为 左右滑动
            var diff_x_y = Math.abs(that.count.diff_X) - Math.abs(that.count.diff_Y);

            //上下滑动 弹力系统
            if (diff_x_y < 0 && that.flag.isVerticalScroll && /both|column/.test(that.flag.sliderType)) {

                if (that.count.slideTop >= that.size.initTop && that.count.diff_Y > 0)
                    that.elements.sliderBodyController.curContentBox.css("top", that.count.slideTop + that.count.diff_Y * 0.3);

                else if (that.count.slideTop <= that.size.limitTop && that.count.diff_Y < 0)
                    that.elements.sliderBodyController.curContentBox.css("top", that.count.slideTop + that.count.diff_Y * 0.3);

                else {
                    that.elements.sliderBodyController.curContentBox.css("top", that.count.slideTop + that.count.diff_Y)
                }

            }

            //左右滑动 弹力系统
            else if ((diff_x_y > 0 && !that.flag.isVerticalScroll) && /both|row/.test(that.flag.sliderType)) {

                //向右滑动
                if (diff_x_y > 0) {
                    that.elements.sliderBodyController.css("left", that.count.slideLeft + that.count.diff_X * 0.3);
                    that.elements.slidingShoe.css("left", that.count.curShoeLeft - that.count.diff_X * 0.3 / 2);
                }

                //向左滑动
                else if (that.count.diff_X < 0) {
                    that.elements.sliderBodyController.css("left", that.count.slideLeft + that.count.diff_X * 0.3);
                    that.elements.slidingShoe.css("left", that.count.curShoeLeft - that.count.diff_X * 0.3 / 2);
                }
            }
        });

        this.elements.contextBox.on(this.touchEvent.type.end, function (e) {
            that.touchEvent.start.flag = false;
            that.count.slideTop = parseFloat(that.elements.sliderBodyController.curContentBox.css("top"));
            that.count.slideLeft = parseFloat(that.elements.sliderBodyController.css("left"));
            var target = e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0] : e.originalEvent;
            that.touchEvent.end.orgX = target.pageX;
            that.touchEvent.end.orgY = target.pageY;
            that.count.diff_X = that.touchEvent.end.orgX - that.touchEvent.start.orgX;
            that.count.diff_Y = that.touchEvent.end.orgY - that.touchEvent.start.orgY;
            that.count.endTime = e.timeStamp;
            that.count.diff_Time = that.count.endTime - that.count.startTime;

            that.monitor.horizontalScrollingTimer = setTimeout(function () {
                that.flag.freezeCoord.X = false;
                that.flag.freezeCoord.Y = false;
                that.flag.isVerticalScroll = true;
            }, 300);

            that.handleEndEvent();
        });
    }

    handleEndEvent() {
        var that = this;
        //水平滑动
        if (!that.flag.isVerticalScroll) {
            //console.log ("coast time:", count.endTime - count.startTime, "slide", count.slideLeft, "size.pageWidth", size.pageWidth);

            //如果左右滑动的值达到屏幕的1/5.就使flag.isVerticalScroll的值为假，进到此代码块，
            //这样的结果就是上下滑动就会暂停，
            //当出现拉扯 事件的时候，就无法还原
            //所以在这里需要重新判断 内容盒子 的top值
            if (that.count.slideTop > that.size.initTop) {
                that.elements.sliderBodyController.curContentBox.animate({ "top": that.size.initTop }, 300, function () {
                });
            }
            else if (that.count.slideTop < that.size.limitTop) {
                if (that.flag.hasVerticalScroll) {
                    that.elements.sliderBodyController.curContentBox.animate({ "top": that.size.limitTop }, 300, function () {
                    });
                }
                else {

                    that.elements.sliderBodyController.curContentBox.animate({ "top": that.size.initTop }, 300, function () {
                    });
                }

            }

            //向左滑动后的翻页事件
            if (that.count.diff_X < 0) {

                //滑动触发距离和滑动时间成反比：
                //计算公式 360/8  * (1 + ((190-250)/250))：
                // 360 代表屏幕宽度，
                // 360/8 代表滑动触发最佳体验（距离），
                // 250 代表滑动触发最佳体验（时间）
                // (1 + ((190-250)/250)) 以250毫秒为基准，计算当前滑动时间的 正负差
                if (Math.abs(that.count.slideLeft) <= that.size.pageWidth / 10 * (1 + ((that.count.diff_Time - 250) / 250))) {
                    this.hSlideTo(0);

                    //只有当前页面在第二页的时候才转发 翻到第一页的事件，count.curPageIndex的值通过start事件获取
                    //if (that.count.curPageIndex === 1) win.sendRMTEventToApp("RMTClickEvent.horizontalSliding", [0]);
                }
                else {
                    if (that.flag.hasHorizontalScroll) {
                        this.hSlideTo(1);

                        //只有当前页面在第一页的时候才转发 翻到第二页的事件，count.curPageIndex的值通过start事件获取
                        //if (that.count.curPageIndex === 0) win.sendRMTEventToApp("RMTClickEvent.horizontalSliding", [1]);
                    }
                    else {
                        this.hSlideTo(0);

                        //只有当前页面在第二页的时候才转发 翻到第一页的事件，count.curPageIndex的值通过start事件获取
                        //if (that.count.curPageIndex === 1) win.sendRMTEventToApp("RMTClickEvent.horizontalSliding", [0]);
                    }
                }

            }

            //向右滑动的翻页事件
            else if (that.count.diff_X > 0) {

                //滑动触发距离和滑动时间成反比：
                //计算公式 360/8  * (1 + ((190-250)/250))：
                // 360 代表屏幕宽度，
                // 360/8 代表滑动触发最佳体验（距离），
                // 250 代表滑动触发最佳体验（时间）
                // (1 + ((190-250)/250)) 以250毫秒为基准，计算当前滑动时间的 正负差
                if (Math.abs(that.count.slideLeft) <= that.size.pageWidth - that.size.pageWidth / 10 * (1 + ((that.count.diff_Time - 250) / 250))) {
                    this.hSlideTo(0);

                    //只有当前页面在第二页的时候才转发 翻到第一页的事件，count.curPageIndex的值通过start事件获取
                    //if (that.count.curPageIndex === 1) win.sendRMTEventToApp("RMTClickEvent.horizontalSliding", [0]);
                }
                else {
                    this.hSlideTo(1);

                    //只有当前页面在第一页的时候才转发 翻到第二页的事件，count.curPageIndex的值通过start事件获取
                    //if (that.count.curPageIndex === 0) win.sendRMTEventToApp("RMTClickEvent.horizontalSliding", [1]);
                }

            }

            //如果在界面左右滑动的过程中 被点击（判断标准为:start坐标和end坐标相同）
            else {
                console.log("进来了", that.count.slideLeft, that.size.pageWidth / 2);

                if (Math.abs(that.count.slideLeft) <= that.size.pageWidth / 2) {

                    this.hSlideTo(1);

                    //只有当前页面在第一页的时候才转发 翻到第二页的事件，count.curPageIndex的值通过start事件获取
                    //if (that.count.curPageIndex === 0) win.sendRMTEventToApp("RMTClickEvent.horizontalSliding", [1]);
                }
                else {

                    this.hSlideTo(0);

                    //只有当前页面在第二页的时候才转发 翻到第一页的事件，count.curPageIndex的值通过start事件获取
                    //if (that.count.curPageIndex === 1) win.sendRMTEventToApp("RMTClickEvent.horizontalSliding", [0]);
                }
            }
        }

        //垂直滑动
        else {
            //防止在向下拉扯时，连续点击无法回弹问题
            if (that.count.slideTop > that.size.initTop && that.count.diff_Y >= 0) {

                that.elements.sliderBodyController.curContentBox.animate({ "top": that.size.initTop }, 300, function () {

                    //在回调里面转发，可以减少转发次数（在用户多次无效点击的情况下）
                    //win.sendRMTEventToApp("RMTClickEvent.verticalSliding", [that.count.curPageIndex, that.size.initTop / Math.abs(that.size.limitTop)]);   //转发百分比
                });
            }

            //防止在向上拉扯时，连续点击无法回弹问题
            else if (that.count.slideTop < that.size.limitTop && that.count.diff_Y <= 0) {
                if (that.flag.hasVerticalScroll) {
                    that.elements.sliderBodyController.curContentBox.animate({ "top": that.size.limitTop }, 300, function () {

                        //在回调里面转发，可以减少转发次数（在用户多次无效点击的情况下）
                        //win.sendRMTEventToApp("RMTClickEvent.verticalSliding", [that.count.curPageIndex, -1]);   //转发百分比
                    });
                }
                else {
                    that.elements.sliderBodyController.curContentBox.animate({ "top": that.size.initTop }, 300, function () {
                        //win.sendRMTEventToApp("RMTClickEvent.verticalSliding", [that.count.curPageIndex, that.size.initTop / Math.abs(that.size.limitTop)]);   //转发百分比
                    });
                }
            }

            //向下滑动
            else {

                var t = that.count.endTime - that.count.startTime;    //手指滑动的距离
                var v = that.count.diff_Y / t; //手指离开屏幕之后的 移动速度
                var intergrator = 0;
                var i = 0.9;    //平均减速量

                if (that.count.diff_Y > 0) {

                    that.monitor.interDeceleration = setInterval(function () {
                        v = v * i;  //匀速降低
                        intergrator += v * 30;  //每15毫秒的移动距离
                        that.elements.sliderBodyController.curContentBox.css("top", that.count.slideTop + intergrator);

                        //速度降低到 0.1 或者已经 拉倒顶部，就停止滑动
                        if (v <= 0.1 || that.count.slideTop + intergrator > 0) {
                            clearInterval(that.monitor.interDeceleration);


                            //如果在最顶部，就执行回弹，回弹结束之后发送 停止坐标 到 远程端
                            if (that.count.slideTop + intergrator > 0) {
                                console.log("count.slideTop", that.count.slideTop, "intergrator", intergrator);
                                that.elements.sliderBodyController.curContentBox.animate({ "top": that.size.initTop }, 300, function () {

                                    //win.sendRMTEventToApp("RMTClickEvent.verticalSliding", [that.count.curPageIndex, that.size.initTop / Math.abs(that.size.limitTop)]);   //转发百分比
                                });
                            }
                            else {
                                //win.sendRMTEventToApp("RMTClickEvent.verticalSliding", [that.count.curPageIndex, (that.count.slideTop + intergrator) / Math.abs(that.size.limitTop)]); //转发百分比
                            }

                        }

                    }, 15);
                }

                //向上滑动
                else {

                    that.monitor.interDeceleration = setInterval(function () {
                        v = v * i;  //匀速降低
                        intergrator += v * 30;  //每15毫秒的移动距离（累加）
                        that.elements.sliderBodyController.curContentBox.css("top", that.count.slideTop + intergrator);

                        //速度降低到 -0.1 或者已经 拉倒底部，就停止滑动
                        if (v >= -0.1 || that.count.slideTop + intergrator < that.size.limitTop) {
                            clearInterval(that.monitor.interDeceleration);


                            //如果在最底部，就执行回弹，回弹结束之后发送 停止坐标 到 远程端
                            if (that.count.slideTop + intergrator < that.size.limitTop) {
                                console.log("count.slideTop", that.count.slideTop, "intergrator", intergrator, "size.limitTop", that.size.limitTop);
                                if (that.flag.hasHorizontalScroll) {
                                    that.elements.sliderBodyController.curContentBox.animate({ "top": that.size.limitTop }, 300, function () {

                                        //win.sendRMTEventToApp("RMTClickEvent.verticalSliding", [that.count.curPageIndex, -1]);   //转发百分比
                                    });
                                }
                                else {
                                    that.elements.sliderBodyController.curContentBox.animate({ "top": that.size.initTop }, 300, function () {

                                        //win.sendRMTEventToApp("RMTClickEvent.verticalSliding", [that.count.curPageIndex, that.size.initTop / Math.abs(that.size.limitTop)]);   //转发百分比
                                    });
                                }
                            }
                            else {
                                //win.sendRMTEventToApp("RMTClickEvent.verticalSliding", [that.count.curPageIndex, (that.count.slideTop + intergrator) / Math.abs(that.size.limitTop)]); //转发百分比
                            }

                        }

                    }, 15);
                }
            }

        }
    }

}