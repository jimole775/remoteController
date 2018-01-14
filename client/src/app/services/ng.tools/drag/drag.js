/**
 * Created by Andy on 2017/12/28.
 */

export default class Drag {

    constructor(dragTag, bodyTag, extendTag) {
        this.init(dragTag, bodyTag, extendTag);
        this.bindEvents();
    }

    /***************
     * 绑定拖拽事件 *
     **************/
    init(dragTag, bodyTag, extendTag) {
        this.winHeight = document.body.clientHeight;
        this.winWidth = document.body.clientWidth;

        this.EVENT_TYPE = {};
        this.EVENT_TYPE.START = "ontouchstart" in window ? "touchstart" : "mousedown";
        this.EVENT_TYPE.MOVE = "ontouchmove" in window ? "touchmove" : "mousemove";
        this.EVENT_TYPE.END = "ontouchend" in window ? "touchend" : "mouseup";

        this.extendEvent = {};
        this.dragEvent = {};

        this.edge = {};
        this.edge.bottom = this.winHeight - 2;
        this.edge.right = this.winWidth - 2;
        this.edge.top = 1;
        this.edge.left = 1;

        this.originX = 0;
        this.originY = 0;

        this.initDrag(Drag.queryTag(dragTag));
        this.initBody(Drag.queryTag(bodyTag ? bodyTag : dragTag));
        if (extendTag)this.initExtend(Drag.queryTag(extendTag));
    }


    initBody(bodyTag) {
        this.bodyTag = bodyTag;
        this.bodyWidth = this.bodyTag.clientWidth;
        this.bodyHeight = this.bodyTag.clientHeight;
    }

    initDrag(dragTag) {
        this.dragTag = dragTag;
        this.dragEvent.dragStart = false;
        this.dragEvent.distanceX = 0;
        this.dragEvent.distanceY = 0;
    }

    initExtend(extendTag) {
        this.extendTag = extendTag;
        this.extendEvent.extendStart = false;
        this.extendEvent.distanceX = 0;
        this.extendEvent.distanceY = 0;
    }

    bindEvents() {
        if (this.dragTag)this.bindDragStart();
        if (this.extendTag)this.bindExtendStart();
        this.bindMoveEvent();
        this.bindEndEvent();
    }

    bindMoveEvent() {
        let that = this;
        // 这里把事件绑到body元素，使移动更加舒服
        document.body.addEventListener(that.EVENT_TYPE.MOVE, function (e) {
            if (that.dragEvent.dragStart) {
                Drag.dragMoveEvent(that, e);
            } else if (that.extendEvent.extendStart) {
                Drag.extendMoveEvent(that, e);
            }
        });
    }

    bindEndEvent() {
        let that = this;
        document.body.addEventListener(that.EVENT_TYPE.END, function (e) {

            if (that.dragEvent.dragStart) {
                that.dragEvent.dragStart = false;
                Drag.dragEndEvent(that);
            } else if (that.extendEvent.extendStart) {
                that.extendEvent.extendStart = false;
                Drag.extendEndEvent(that, e);
            }

        });
    }

    bindDragStart() {
        var that = this;
        that.dragTag.addEventListener(that.EVENT_TYPE.START, function (e) {
            that.dragEvent.dragStart = true;

            // 区分 PC 端和 phone 端的浏览器提供的事件
            var target = e.changedTouches ? e.changedTouches[0] : e;
            var startX = target.clientX;    // 获取点击点的X坐标
            var startY = target.clientY;    // 获取点击点的Y坐标
            that.originX = that.bodyTag.offsetLeft;  // 相对于当前窗口X轴的偏移量
            that.originY = that.bodyTag.offsetTop;   // 相对于当前窗口Y轴的偏移量
            that.distanceX = startX - that.originX;   // 鼠标所能移动的最左端是当前鼠标距div左边距的位置
            that.distanceY = startY - that.originY;
        });
    }

    bindExtendStart() {
        /*******************
         * 绑定窗体拉伸事件 *
         *****************/
        var that = this;
        that.extendTag.addEventListener(that.EVENT_TYPE.START, function (e) {
            that.extendEvent.extendStart = true;
            //clearTimeout(that.mouseOutMonitor);
            var target = e.changedTouches ? e.changedTouches[0] : e;
            var startX = target.clientX;    // 获取点击点的X坐标
            var startY = target.clientY;    // 获取点击点的Y坐标
            that.originX = that.bodyTag.offsetLeft; // 相对于当前窗口X轴的偏移量
            that.originY = that.bodyTag.offsetTop;  // 相对于当前窗口Y轴的偏移量
            that.extendEvent.distanceX = startX - that.originX; // 鼠标所能移动的最左端是当前鼠标距div左边距的位置
            that.extendEvent.distanceY = startY - that.originY;
        });

        // 扩展事件的监听器,监听由于在PC端测试时,快速拖拽和点击造成的END的事件无法触发引发的坐标混乱问题
        //that.mouseOutMonitor = null;
        //that.extendTag.addEventListener("mouseout", function (e) {
        //
        //    if (!that.extendEvent.extendStart)return;
        //    that.mouseOutMonitor = setTimeout(function () {
        //        that.extendEvent.extendStart = false;
        //        that.bodyWidth = parseFloat(that.bodyTag.clientWidth);  // 触摸事件完成后，获取盒子的最后高宽，下次再次触摸时，以这个值为初始值；
        //        that.bodyHeight = parseFloat(that.bodyTag.clientHeight);
        //    }, 500);
        //
        //    console.log("extend out");
        //});

    }

    static queryTag(tag) {
        let realTag = null;
        if (typeof tag === "string") {
            realTag = document.querySelectorAll(tag);
        }
        else if (typeof tag === "object") {
            if (tag.nodeType) { // 有nodeType值的,确定是Dom对象
                realTag = tag;
            } else {    // 否则是jqLit对象
                realTag = tag[0];
            }
        }

        return realTag;
    }

    static dragMoveEvent(that, e) {

        // 区分 PC 端和 phone 端的浏览器提供的事件
        var target = e.changedTouches ? e.changedTouches[0] : e;

        var moveX = target.clientX; // 移动过程中X轴的坐标
        var moveY = target.clientY; // 移动过程中Y轴的坐标

        // 框体移到最右端
        if (moveX + (that.bodyWidth - that.distanceX) >= that.winWidth) {
            that.bodyTag.style.left = (that.winWidth - that.bodyWidth) + "px";
            that.bodyTag.style.top = (moveY - that.distanceY) + "px";
            return;
        }

        // 框体移到最下端
        if (moveY + (that.bodyHeight - that.distanceY) >= that.winHeight) {
            that.bodyTag.style.left = (moveX - that.distanceX) + "px";
            that.bodyTag.style.top = (that.winHeight - that.bodyHeight) + "px";
            return;
        }

        // 框体移到最左端
        if (moveX <= that.distanceX) {
            that.bodyTag.style.left = 0;
            that.bodyTag.style.top = (moveY - that.distanceY) + "px";
            return;
        }

        // 框体移到最上端
        if (moveY <= that.distanceY) {
            that.bodyTag.style.left = (moveX - that.distanceX) + "px";
            that.bodyTag.style.top = 0;
            return;
        }

        // 当鼠标移出窗口
        if (moveY >= that.edge.bottom || moveY <= that.edge.top || moveX >= that.edge.right || moveX <= that.edge.left) {
            that.dragEvent.dragStart = false;
            console.log("is move out!");
        }

        that.bodyTag.style.left = (moveX - that.distanceX) + "px";
        that.bodyTag.style.top = (moveY - that.distanceY) + "px";
    }

    static dragEndEvent(that) {

        var bodyLeft = that.bodyTag.offsetLeft;
        var bodyTop = that.bodyTag.offsetTop;

        if (bodyTop < 0) {
            that.bodyTag.style.top = 0;
        }
        else if (bodyTop > that.winHeight - that.bodyHeight) {
            that.bodyTag.style.top = (that.winHeight - that.bodyHeight) + "px";
        }

        if (bodyLeft < 0) {
            that.bodyTag.style.left = 0;
        }
        else if (bodyLeft > that.winWidth - that.bodyWidth) {
            that.bodyTag.style.top = (that.winWidth - that.bodyWidth) + "px";
        }

    }

    static extendMoveEvent(that, e) {
        //e.preventDefault(); // 取消move的默认行为 [拉，划，滚动]
        var target = e.changedTouches ? e.changedTouches[0] : e;
        var moveX = target.clientX; // 移动过程中X轴的坐标
        var moveY = target.clientY; // 移动过程中Y轴的坐标

        if (moveX >= that.winWidth) {
            moveX = that.winWidth - 10;
        }
        if (moveX <= 10) {
            moveX = 10;
        }
        if (moveY >= that.winHeight) {
            moveY = that.winHeight - 10;
        }
        if (moveY <= 10) {
            moveY = 10;
        }

        that.bodyTag.style.width = (that.bodyWidth + (moveX - that.extendEvent.distanceX - that.originX)) + "px";
        that.bodyTag.style.height = (that.bodyHeight + (moveY - that.extendEvent.distanceY - that.originY)) + "px";


        //console.log("extend move");
    }

    static extendEndEvent(that, e) {
        //clearTimeout(that.mouseOutMonitor);
        var target = e.changedTouches ? e.changedTouches[0] : e;
        var endX = target.clientX;  // 移动过程中X轴的坐标
        var endY = target.clientY;  // 移动过程中Y轴的坐标

        that.bodyTag.style.width = (that.bodyWidth + (endX - that.extendEvent.distanceX - that.originX)) + "px";
        that.bodyTag.style.height = (that.bodyHeight + (endY - that.extendEvent.distanceY - that.originY)) + "px";

        var endWidth = parseFloat(that.bodyTag.style.width);
        var endHeight = parseFloat(that.bodyTag.style.height);
        if (endWidth < 200) {
            that.bodyTag.style.width = "200px";
        }
        if (endHeight < 200) {
            that.bodyTag.style.height = "200px";
        }
        if (endWidth >= that.winWidth - that.bodyTag.offsetLeft - 10) {
            that.bodyTag.style.width = that.winWidth - that.bodyTag.offsetLeft - 10 + "px";
        }
        if (endHeight >= that.winHeight - that.bodyTag.offsetTop - 10) {
            that.bodyTag.style.height = that.winHeight - that.bodyTag.offsetTop - 10 + "px";
        }

        // 触摸事件完成后，获取盒子的最后高宽，下次再次触摸时，以这个值为初始值；
        that.bodyWidth = parseFloat(that.bodyTag.style.width);
        that.bodyHeight = parseFloat(that.bodyTag.style.height);

        console.log("extend end");
    }


}