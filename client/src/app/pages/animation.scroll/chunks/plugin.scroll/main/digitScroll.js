/**
 * Created by Andy on 2017/11/26.
 */
import "./digitScroll.scss";
import tpl from "./digitScroll.jade";
import $ from "jquery";
import JRoll from "jroll";

/** 存储最后一个ID号的作用在于：
 在new操作的时候可以无视当前实际HTML中wrapper元素的ID号序列，每次new操作之后，自加就行；
 但是由于在angular渲染阶段，公共方法（SpellWrapper）和（BindEvent）被分成了异步操作，
 同一个模块下的所有（SpellWrapper）都会同时执行，相同的，（BindEvent）也会同一时间执行，
 这样会造成，使用遍历器 构造 or 获取 相应的元素时，ID号先后不分，

 比如：
 在渲染阶段，先构造了 wrapper0-6，但是在异步阶段绑定事件的时候，
 先运行了ID序列为 7-13 的函数，理所当然就找不到元素，绑定失败~

 所以需要区分每次调用不同公共方法时的状态，分别存储或者调用准确的ID
 当然：最好的方法就是用Promise或者generator函数来实现同步化~
 */
let jrollCache = {
    //pluginId: {
    //    instances: [],
    //    slaverId: string | null
    //    spaceInPerHead: int
    //    startId:int
    //    latestId:int
    //}
};

export default function () {
    return {
        restrict: "E",
        scope: {
            fillSpace: "=fillSpace",
            maxRow: "=maxRow",
            maxColumn: "=maxColumn",
            appendTo: "@appendTo",
            pluginId: "@pluginId"
        },
        link: link,
        controller: JrollPlugin,
        template: tpl()
    }
}

function link($scope, $element, $attrs, that) {
    "ngInject";
    let values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    $scope.wrappers = that.spellWrappers(values);

    $scope.liStyle = {height: that.getLineHeight()};

    $scope.initListIndex = that.getInitListIndex();

    $scope.markFlagPosition = {
        top: that.getMarkFlagPosition()
    };

    $scope.wrapperHeight = {
        height: that.getWrapperHeight()
    };

    setTimeout(function () {
        that.definedEvents();
        that.bindEvents();
    });
}

class JrollPlugin {
    constructor($scope, $element, $rootScope, $attrs) {
        "ngInject";
        this.lineHeight = 3 * Number.parseInt($("html").css("fontSize"));  //获取每行的行高，计算方式为 3 * 浏览器默认字体大小
        this.maxColumn = $scope.maxColumn !== undefined ? $scope.maxColumn : 5;
        this.maxRow = $scope.maxRow !== undefined ? $scope.maxRow : $("body").height() > 720 ? 7 : 5;
        this.spaceInPerHead = $scope.fillSpace !== undefined ? $scope.fillSpace : $("body").height() > 720 ? 3 : 2;
        this.jrollEvents = []; //缓存设置
        this.pluginId = $scope.pluginId;
        this.appendTo = $scope.appendTo;
        this.curMiddleIndexOfColumns = [];  //存储每一列的当前显示在中部的元素的下标（从这个获取值）
        this.curTopIndexOfColumns = []; //存储每一列的当前显示在顶部的元素的下标
        this.initJrollCache();
        //this.callback = callback;
        this.scrollStyle = {
            scrolling: {
                wrapper: "wrapper-scrolling",
                scroller: "scroller-scrolling"
            },
            selected: {
                listItem: "listItem-selected"
            }
        };

        this.listenRemoteEvents(this, $rootScope);

    }

    listenRemoteEvents(that, $rootScope){
        // 来自ws端口0x0A的数据
        $rootScope.$on("scrollCoordinate",function(){
            let scrollCoordinate = $rootScope["scrollCoordinate"];
            let {targetId, jrollX, jrollY} = scrollCoordinate;
            let index = targetId.replace(/[^0-9]/ig,"");

            let jroll = new JRoll(`#${targetId}`);
            let wrapper = jroll.wrapper;
            let scroller = jroll.scroller;

            that.curTopIndexOfColumns[index] = Math.round((jrollY / that.lineHeight) * (-1));    //计算&存储当前在mark处的li元素的下表
            that.curMiddleIndexOfColumns[index] = that.curTopIndexOfColumns[index] + that.spaceInPerHead;    //计算&存储当前在mark处的li元素的下表

            if (that.scrollStyle) {
                $(wrapper).addClass(that.scrollStyle.scrolling.wrapper);
                $(scroller).addClass(that.scrollStyle.scrolling.scroller);
            }

            let curTopEl = scroller.children[that.curTopIndexOfColumns[index]];
            let curMiddleEl = scroller.children[that.curMiddleIndexOfColumns[index]];


            jroll.scrollToElement(curTopEl, 300, false, function () { //滑动时间300MS，要和transform的渐变时间一致

                if (that.scrollStyle) {
                    $(scroller.children).removeClass(that.scrollStyle.selected.listItem);
                    $(wrapper).removeClass(that.scrollStyle.scrolling.wrapper);
                    $(scroller).removeClass(that.scrollStyle.scrolling.scroller);
                    $(curMiddleEl).addClass(that.scrollStyle.selected.listItem);
                }

                // 这里传index为参数，在autoScroll里面计算附属件的滚动时,需要拼装成 "wrapper" + index,当作html ID号使用
                // 区别 本地端执行 和 远端执行
                that.autoScroll(index, that.curMiddleIndexOfColumns[index]);
            });
        });
    }


    initJrollCache() {
        let startId = 1;

        for (let prop in jrollCache) {
            if (jrollCache.hasOwnProperty(prop)) {
                startId += jrollCache[prop].maxColumn
            }
        }

        if (!jrollCache[this.pluginId]) {
            jrollCache[this.pluginId] = {
                instances: [],
                slaverId: null,
                spaceInPerHead: this.spaceInPerHead,
                maxColumn: this.maxColumn,
                startId: startId,
                latestId: startId + this.maxColumn
            };
        }
    }

    definedEvents() {   //初始化iscroll事件
        let thisPrototype = this;
        let scrollStyle = thisPrototype.scrollStyle;
        for (let i = 0; i < thisPrototype.maxColumn; i++) {
            thisPrototype.jrollEvents[i] = {
                snap: "li",
                momentum: true,
                usetransition: true,
                beforeScrollStart: function (e) {
                    //e.preventDefault();   //兼容手机端move事件
                },
                scrollStart: function (index, scrollEvent) {
                    let wrapper = scrollEvent.wrapper;
                    let scroller = scrollEvent.scroller;

                    if (scrollStyle) {
                        $(wrapper).addClass(scrollStyle.scrolling.wrapper);
                        $(scroller).addClass(scrollStyle.scrolling.scroller);
                    }

                },
                scrollEnd: function (index, scrollEvent) {
                    thisPrototype.curTopIndexOfColumns[index] = Math.round((scrollEvent.y / thisPrototype.lineHeight) * (-1));    //计算&存储当前在mark处的li元素的下表
                    thisPrototype.curMiddleIndexOfColumns[index] = thisPrototype.curTopIndexOfColumns[index] + thisPrototype.spaceInPerHead;    //计算&存储当前在mark处的li元素的下表

                    let wrapper = scrollEvent.wrapper;
                    let scroller = scrollEvent.scroller;

                    let curTopEl = scroller.children[thisPrototype.curTopIndexOfColumns[index]];
                    let curMiddleEl = scroller.children[thisPrototype.curMiddleIndexOfColumns[index]];


                    scrollEvent.scrollToElement(curTopEl, 300, false, function () { //滑动时间300MS，要和transform的渐变时间一致

                        if (scrollStyle) {
                            $(scroller.children).removeClass(scrollStyle.selected.listItem);
                            $(wrapper).removeClass(scrollStyle.scrolling.wrapper);
                            $(scroller).removeClass(scrollStyle.scrolling.scroller);
                            $(curMiddleEl).addClass(scrollStyle.selected.listItem);
                        }

                        //这里传i为参数，就是因为在存储器【jrollCache】里面，所有的主件和附件都已经进行配对，
                        // 只要知道一边的下标，根据这个下标查找另一边，就可以得到对应的wrapper的实例
                        thisPrototype.autoScroll(i, thisPrototype.curMiddleIndexOfColumns[index]);

                        //thisPrototype.callback();
                    });

                }
            }

        }
    }


    bindEvents() {       //绑定iscroll事件
        let thisPrototype = this;
        let thisInstances = [];
        for (let [index, item] of thisPrototype.jrollEvents.entries()) {
            let wrapperId = jrollCache[thisPrototype.pluginId].startId + index;
            thisInstances[index] = new JRoll("#wrapper" + wrapperId, item);

            thisInstances[index].on(
                "scrollStart", (function (_index, _item) {
                    return function () {
                        let scrollEvent = this;
                        _item.scrollStart(_index, scrollEvent)
                    };
                })(index, item)
            ).on(
                "scrollEnd", (function (_index, _item) {
                    return function () {
                        let scrollEvent = this;
                        _item.scrollEnd(_index, scrollEvent)
                    };
                })(index, item)
            )
        }

        this.cacheInstance(thisInstances);
    }

    cacheInstance(instances) {
        jrollCache[this.pluginId]["instances"] = instances;

        // 如果现在渲染的是附属件，
        // 就往主件里存储附属件的ID和jroll实例
        if (this.appendTo) {
            let thatMasterPluginId = this.appendTo;
            jrollCache[thatMasterPluginId]["slaverId"] = this.pluginId;
            jrollCache[this.pluginId]["masterId"] = this.appendTo;
            jrollCache[this.appendTo]["slaverInstances"] = instances;
        }

        // 反之,就往附属件里存储主件的jroll实例
        else{
            let slaverId = jrollCache[this.pluginId]["slaverId"];
            jrollCache[slaverId]["masterInstances"] = instances;
        }
    }

    // 这里只处理 关联滚动条 的滚动状态
    // 需要区分两处调用:
    // 1, 远程端调用 - instanceIndex是主件ID,
    // 2, 本地端调用 - instanceIndex是附件ID,
    autoScroll(instanceIndex, curMiddleIndex) {

        let slaverId = jrollCache[this.pluginId]["slaverId"];

        // 如果找不到关联插件的ID，就判定本身就是关联插件，
        // 然后再从主插件那里获取 slaverId，
        // 虽然这让有点绕，但是这样可以保持缜密的逻辑状态，不会出现异常
        if(!slaverId) {
            //let masterPluginId = jrollCache[this.pluginId]["appendTo"];
            //slaverId = jrollCache[masterPluginId]["slaverId"];
            slaverId = this.pluginId;
        }

        let slaverInstance = jrollCache[slaverId]["instances"][instanceIndex];

        if(!slaverInstance){
            let masterInstances = jrollCache[slaverId]["masterInstances"];
            let wrapperId = "wrapper" + instanceIndex;
            masterInstances.forEach(function(item,index){
                if(wrapperId === item.wrapper.id){
                    let slaverInstances = jrollCache[slaverId]["instances"];
                    slaverInstance = slaverInstances[index];
                }
            });
        }

        let slaverSpaceInPerHead = jrollCache[slaverId]["spaceInPerHead"];
        let slaverScroll = slaverInstance.scroller;
        let curMiddleIndexAfterQuerySpace = curMiddleIndex - this.spaceInPerHead;
        let slaverMiddleIndex = curMiddleIndexAfterQuerySpace + slaverSpaceInPerHead;
        let slaverMiddleEl = slaverScroll.children[slaverMiddleIndex];
        let slaverMiddleHigh = slaverMiddleIndex * this.lineHeight * -1;

        if (slaverId) {
            let scrollStyle = this.scrollStyle;
            slaverInstance.scrollTo(0, slaverMiddleHigh, 300, false, function () { //滑动时间300MS，要和transform的渐变时间一致
                if (scrollStyle) {
                    $(slaverScroll.children).removeClass(scrollStyle.selected.listItem);
                    $(slaverMiddleEl).addClass(scrollStyle.selected.listItem);
                }
            });
        }
    }

    spellWrappers(_wrapperItems) {
        let wrappers = [];
        let wrapperItems = this.fillSpace(_wrapperItems);
        for (let i = jrollCache[this.pluginId].startId; i < jrollCache[this.pluginId].latestId; i++) {
            wrappers.push({id: "wrapper" + i, values: wrapperItems});
        }

        return wrappers;
    }

    getLineHeight() {
        return this.lineHeight + "px";
    }

    getMarkFlagPosition() {
        return (this.lineHeight * (( this.maxRow - this.maxRow % 2) / 2 + 1) - 2) + "px";    //设置在中间滑动块的底部， -2PX是mark自身的边框高度
    }

    getInitListIndex() {
        return 0 + this.spaceInPerHead;
    }

    getWrapperHeight() {
        return (this.lineHeight * this.maxRow) + "px";
    }

    fillSpace(wrapperItems) {
        //根据插件大小决定头脚的空元素的数量
        for (let i of new Array(this.spaceInPerHead)) {
            wrapperItems.unshift("");
            wrapperItems.push("");
        }
        return wrapperItems;
    }

}