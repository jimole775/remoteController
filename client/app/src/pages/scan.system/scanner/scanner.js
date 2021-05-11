/**
 * Created by Andy on 2017/12/1.
 */
import "./scanner.less"
import tpl from "./scanner.jade"
import JRoll from "jroll";
import initViewButtonImg from "../images/scanner_5.png";
export default function ($stateProvider) {
    $stateProvider
        .state("scanner",
        {
            url: '/scanner',
            title: '',
            template: tpl(),
            controller: Ctrl
        }
    )
}

class Ctrl {
    constructor($scope, $element, ngTool, ajax) {
        "ngInject";

        this.scope = $scope;
        $scope.thisCtrl = this;

        $scope.alert = ngTool.alert;
        $scope.ajax = ajax;
        $scope.layout = ngTool.layout;
        $scope.jroll = ngTool.jroll;

        $scope.element = $element;
        $scope.safeApply = ngTool.injectScope($scope).safeApply;

        $scope.scanningIndex = 0;
        $scope.scanProcessText = "扫描器已就绪";
        $scope.scanState = "init";
        $scope.scanButtonText = "开始扫描";

        $scope.itemValues = [];
        $scope.DTCDetailItem = {};

        $scope.enterDTCDetail = function (item) {
            // 点击事件，确定是否进入故障详情页
            $scope.DTCDetailItem = {
                show: (item.info.length && !(item.dtcScanStateText === Ctrl.matchCheckingStateText('checking'))) ? true : false,
                info: item.info
            };
        };

        let that = this;
        $scope.firstHit = function(){
            that.No1_ButtonTrigger();
        };

        // hack for img packing
        $scope.initViewButtonStyle={
            background:`url(${initViewButtonImg}) no-repeat center`,
            backgroundSize:"3.2rem 3.2rem",
            backgroundColor:"#477cb3"
        };

        this.addScrollEvent($element, $scope, "itemValues");
        this.watchDTCDetailState($scope);
        this.bindFootButton($scope);
        this.setScanState("init");
    }

    addScrollEvent($element, $scope, watchedObj) {

        $scope.$watchCollection(watchedObj, function (changed, old, scope) {
            setTimeout(function () {

                // 动态刷新展示盒子的高宽
                scope.jroll($element[0].querySelector(".scroll-table-body"),"bottom");

            }, 500);
        });

    }

    watchDTCDetailState(scope) {
        scope.$watch("DTCDetailItem.show", function (changed, origin, scope) {
            if (changed === false && !(changed === origin)) scope.thisCtrl.bindFootButton(scope);
        });
        return this;
    }

    static matchCheckingStateText(state) {
        const StateList = {
            'hasErr': '故障',
            'noErr': '无故障',
            'checking': '检测中...'
        };
        return StateList[state];
    }

    static matchScanState(btnText) {

        const ScanStateList = {
            '扫描器已就绪':'init',
            '正在扫描模块': 'scanning',
            '暂停中': 'pausing',
            '暂停': 'paused',
            '扫描完毕': 'scanned',
            '正在清除': 'clearing',
            '清除完毕': 'cleared'
        };
        return ScanStateList[btnText];
    }

    getScanState() {
        return Ctrl.matchScanState(this.scope.scanProcessText);
    }

    setScanState(state) {
        const ButtonTextList = {
            init:'开始扫描',
            scanning: '暂停',
            pausing: '暂停中',
            paused: '继续',
            scanned: '重新扫描',
            clearing: '暂停',
            cleared: '重新扫描'
        };

        const ProcessTextList = {
            init:'扫描器已就绪',
            scanning: '正在扫描模块',
            pausing: '暂停中',
            paused: '暂停',
            scanned: '扫描完毕',
            clearing: '正在清除',
            cleared: '清除完毕'
        };

        this.scope.scanState = state;
        this.scope.scanButtonText = ButtonTextList[state];
        this.scope.scanProcessText = ProcessTextList[state];
        this.scope.safeApply();
    }

    reset() {
        this.setScanState('scanning');
        this.scope.itemValues.length = 0;
        this.scope.scanningIndex = 0;
        this.scope.jroll(this.scope.element[0].querySelector(".scroll-table-body"), "top");
    }


    bindFootButton(scope) {
        let that = scope.thisCtrl;
        scope.$root.footBtn({
            btn1Text: function () {
                return scope.scanButtonText;
            },
            btn2Text: '清除故障',
            btn3Text: '退出',
            btn1Disable: function () {
                return Ctrl.isScanBtnDisable(that);
            },
            btn2Disable: function () {
                return Ctrl.isClearBtnDisable(that);
            },
            btn3Disable: function () {
                return Ctrl.isQuitBtnDisable(that);
            },
            btn1Callback: function (RMTScanState) {
                that.No1_ButtonTrigger(RMTScanState);
            },
            btn2Callback: function () {
                that.No2_ButtonTrigger(that);
            },
            btn3Callback: function () {
                that.No3_ButtonTrigger(that);
            }
        })
    }

    //扫描按钮 禁用
    static isScanBtnDisable(that) {
        return that.getScanState() === "clearing" || that.getScanState() === "pausing";
    }

    //清除按钮 禁用
    static isClearBtnDisable(that) {
        return that.getScanState() === "scanning" || that.getScanState() === "pausing" || that.getScanState() === "clearing" || that.getScanState() === "init";
    }

    //退出按钮 禁用
    static isQuitBtnDisable(that) {
        return that.getScanState() === "scanning" || that.getScanState() === "pausing" || that.getScanState() === "clearing";
    }

    No1_ButtonTrigger(RMTScanState) {
        var curScanState = RMTScanState ? RMTScanState : this.getScanState();
        switch (curScanState) {
            case 'init':       // 状态 初始化
            case 'paused':     // 状态 已暂停
                this.setScanState('scanning');
                this.serverRequest();
                break;
            case 'scanning':   // 状态 扫描中
                this.setScanState('pausing');
                break;
            case 'pausing':    // 状态 暂停中，不处理

                break;
            case 'scanned':    // 状态 已扫描完成，
            case 'cleared':    // 状态 已清除完成，
                this.setScanState('scanning');
                this.reset();
                this.serverRequest();
                break;
        }

        this.scope.safeApply();
    }

    No2_ButtonTrigger(that) {
        if (that.scope.itemValues.length && !that.scope.itemValues[0].isCleared) {
            that.scope.alert.prompt('清除故障码过程中不提供“暂停”功能，运行时间会稍长，是否继续？')
                .addConfirmBehavior(() => {
                    that.doClearEvent(that.scope.itemValues.length);
                })
                .addCancelBehavior()

        } else {
            that.scope.alert.prompt('设备完好，无需处理')
        }
    }

    No3_ButtonTrigger(that) {
        that.reset();
        history.go(-1);
        return this;
    }

    doClearEvent(itemLength) {
        let that = this;
        let _scanIndex = itemLength - 1;
        if (_scanIndex < 0) {
            that.setScanState('cleared');
            return;
        }

        that.scope.itemValues = Ctrl.clearHandler(that.scope.itemValues, _scanIndex, that.scope);

        that.setScanState("clearing");
        that.scope.safeApply(function () {
            setTimeout(function () {
                that.doClearEvent(_scanIndex);
            }, 1000);
        });
    }


    static clearHandler(itemValues, scanIndex, scope) {
        let item = itemValues[scanIndex];

        if (item.info.length) item.dtcScanStateText = "故障/已清除";

        item.info.length = 0;   // 置空数据 = 清除故障

        item.isCleared = true;  // 标记清除过的项目

        Ctrl.classNameChange(item, scope);  // 提高用户体验

        return itemValues
    }


    static classNameChange(item, scope) {
        item.className = 'clearing';
        setTimeout(function () {
            scope.safeApply(function () {
                item.className = 'default';
            });
        }, 700);
    }

    serverRequest() {

        let that = this;
        let dataPack = {
            index: that.scope.scanningIndex++,
            dataType: "DTCValues"
        };

        that.scope.ajax
            .request("SCANNER", dataPack)
            .bindCallbackRunEnv(that)
            .injectCallback(that.serverCallback)
            .extendsCallbackParams(dataPack)
            .addRetryBehavior(function () {
                that.retryBehavior(dataPack)
            });
    }

    serverCallback(response, extendParams) {

        let that = this;
        that.scope.itemValues[extendParams.index] = {};
        that.scope.itemValues[extendParams.index].index = response.index || 0;
        that.scope.itemValues[extendParams.index].name = response.name || "未知";
        that.scope.itemValues[extendParams.index].dtcScanStateText = Ctrl.matchCheckingStateText('checking');
        that.scope.itemValues[extendParams.index].info = response.info || [];
        that.scope.itemValues[extendParams.index].className = 'default';
        that.scope.safeApply();
        Ctrl.updateDtcScanStateText(that, extendParams.index);
        Ctrl.nextRequest(that, response.itemcount, extendParams.index);

    }

    static nextRequest(that, maxItemCount, index) {

        // 加1之后才能确定是否再次请求服务器
        if (index + 1 < maxItemCount) {
            switch (Ctrl.matchScanState(that.scope.scanProcessText)) {
                case "scanning":
                    // 减缓服务器请求速度，
                    // 制造大量数据访问效果，
                    // 提高用户体验
                    setTimeout(function () {
                        that.serverRequest();
                    }, 1500);
                    break;
                case "pausing":
                    setTimeout(function () {
                        that.setScanState("paused");
                    }, 1500);
                    break;
            }

        } else {
            // 请求完毕，设置关联文本
            that.setScanState('scanned');
        }
    }

    static updateDtcScanStateText(that, index) {
        let item = that.scope.itemValues[index];
        setTimeout(function () {
            item.dtcScanStateText = item.info.length ? "故障" : "无故障";
            that.scope.safeApply();
        }, Math.random() * 5000);   //随机延迟，制造扫描器效果
    }

    retryBehavior(dataPack) {
        let that = this;
        this.scope.ajax
            .request("SCANNER", dataPack)
            .bindCallbackRunEnv(this)
            .injectCallback(this.serverCallback)
            .extendsCallbackParams(dataPack)
            .addRetryBehavior(function () {
                that.retryBehavior(dataPack)
            });
    }
}

// 尝试进行行为归类
// 首先需要进行需求细分
// 确定整体结构
class StateController {

}

class EventHandler {
}

