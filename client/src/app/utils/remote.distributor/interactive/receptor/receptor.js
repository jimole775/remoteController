/**
 * Created by Andy on 2017/10/31.
 */

(function ($) {
    var win = window;
    var doc = document;
    var body = $("body");
    var split_mark_outer = "_!_";
    var split_mark_inner = "_|_";

    /**
     * 接收APP遥控机的 按钮同步 指令
     * @param action        1:控制端发来的数据 2：业务端发来的数据 3：表示重连不上 业务机重连不上 ，直接退出 4：表示网络不稳定，提示用户是否继续远程

     * @param varFuncName   函数名，类型为字串
     * @param varParams     执行函数时需要的参数，数据格式为 "stringJSON_|_stringJSON_|_stringJSON"
     *                                         动态数据流格式 "stringJSON_|_stringJSON_!_stringJSON_|_stringJSON"
     *                                         以上方案主要是为了兼容当数据里面有 \" 转义符时,两次JSON.stringify造成转义符丢失的BUG
     * */

    win.RecvRMTEventFromApp = function (action, varFuncName, varParams) {

        //远程数据都是以字串的形式传入，所以要使用数字，就需要转换一次
        var action_int = parseFloat(action);

        var funcName = "";
        //转发的函数名有时候不需要拼接_|_
        if (/_|_/.test(varFuncName)) {

            //获取函数名 点击事件坐标(百分比)
            funcName = varFuncName.split("_|_")[0];

            //远程点击动画所需要的数据都拼接在函数名之后，执行远程点击事件之前，激活动画
            var RMTClickAnimationData = varFuncName.split("_|_")[1];

        }
        else {
            funcName = varFuncName;
        }

        switch (action_int) {
            case 1:
                decodeRMTDataPackage(funcName, varParams);
                break;
            case 2:
                if (RMTClickAnimationData) {
                    runClickAnimationFirst(funcName, RMTClickAnimationData, varParams);                //业务机在收到数据时（一般只有点击事件传给业务机），执行点击动画
                }
                else {
                    decodeRMTDataPackage(funcName, varParams);
                }
                break;
            case 3:
                errHandlerAct3();
                break;
            case 4:
                errHandlerAct4();                  //处理网络异常，通知双方断开远程业务
                break;
            case 5:
                uncommunicateForNativeAct5();      //通知业务端取消远程会话（隐藏遮罩层），控制机存在异常会先行退出，APP根据此端口通知业务端手动退出
                break;
            case 6:
                networkDelayAct6(funcName);     //获取网络延迟，显示在左上角
                break;
            default :
                break;
        }
    };

    function HiddenRMTCover() {
        var RMTCover = document.getElementById("RMTCover");
        if (RMTCover) RMTCover.style.display = "none";
    }

    function ShowRMTCover() {
        var RMTCover = document.getElementById("RMTCover");
        if (RMTCover) RMTCover.style.display = "block";
    }

    /*function decodeRMTDataPackage(varFuncName, varParams) {
        var func = eval(varFuncName) || function () {};

        var RMTParams_strArr = [],                                          //存储split(_|_)结果
            wholePageData_strAry = [],                                      //动态数据流--存储split(_!_)的结果
            singleData_strAry = [],                                         //动态数据流--存储split(_!_)之后再split(_|_)的结果
            RMTParams_objArr = [],                                          //最终apply使用参数
            len, innerLen, i, j, deCodeParams;

        try {
            if (/CALC_ONE_ANS/i.test(varFuncName) ||
                /CHANNEL_DATA/i.test(varFuncName) ||
                /DTC_simple/i.test(varFuncName) ||
                /FREEZE_RESULT/i.test(varFuncName)
            ) {
                //从“_!_”里截取出所有参数的base64字串；
                wholePageData_strAry = varParams.split(split_mark_outer);
                i = 0;
                len = wholePageData_strAry.length;
                while (i < len) {
                    //逐个解包base64；
                    deCodeParams = getBse64Decode(wholePageData_strAry[i++]);

                    //从“_|_”里截取出所有参数字串；
                    singleData_strAry = deCodeParams.split(split_mark_inner);

                    j = 0;
                    innerLen = singleData_strAry.length;
                    while (j < innerLen) RMTParams_objArr[j] = JSON.parse(singleData_strAry[j++]);

                    //循环抛出，语句顺序叠加，在CPU空闲时会执行
                    func.apply(func, RMTParams_objArr);
                }
            }
            else {
                deCodeParams = getBse64Decode(varParams);
                RMTParams_strArr = deCodeParams.split(split_mark_inner);
                i = 0;
                len = RMTParams_strArr.length;
                while (i < len) {
                    RMTParams_objArr[i] = /[\[\{]/.test(RMTParams_strArr[i].substr(0, 5)) ?               //如果传过来的参数不是JSON字串,就证明只是普通字串
                        JSON.parse(RMTParams_strArr[i++]) : RMTParams_strArr[i++];
                }                     //,先解析成JSON对象

                //在处理车型数据的时候，延迟100毫秒，避免在【设备重连】的时候，APP推送一堆数据，造成无法预料的BUG
                if (/\.CTYPE/g.test(varFuncName))
                    setTimeout(function () { func.apply(func, RMTParams_objArr); }, 100);
                else
                    func.apply(func, RMTParams_objArr);

            }
        } catch (e) {
            console.log(e.message);
            if (tool.loading.status.display) {
                tool.alert("数据解析出现错误，请点击确定退出程序",
                    function () {
                        win.devService.sendDataToDev("3109FF");
                    })
            }

        }
        console.log("接收远程数据:", "varFuncName:", varFuncName, "varParams:", deCodeParams);
    }*/
    /*
    var cssParams =
    {
        transform: "scale(1, 1)",
        width: "8rem",
        height: "8rem",
        position: "absolute",
        top: "0px",
        left: "0px",
        zIndex: 1000,
        background: "rgba(0, 254, 25, 0.6)",
        borderRadius: "100%",
        display: "none"
    };

    if (!$("#hitAnimation").length) {
        body.append("<div id='hitAnimation' class='animation'></div>");
        $("#hitAnimation").css(cssParams);
    }

    function runClickAnimationFirst(funcName, RMTClickAnimationData, varParams) {

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
                if (scrollBody.length && theControllerHasScrollBar === "false" && scrollBody[0].scrollHeight - scrollBody.height() > 0) {

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
        setTimeout(function () {decodeRMTDataPackage(funcName, varParams)}, 500);
    }*/

    function networkDelayAct6(delay) {
        console.log("网络延迟：", delay);
    }

    function uncommunicateForNativeAct5() {
        HiddenRMTCover();
        tool.alert("协助者已经断开连接，远程协助已经无法继续，点击确定之后，退出协助模式", function () {});
    }

    function errHandlerAct3() {
        HiddenRMTCover();
        setTimeout(function () {
            tool.alert(
                "手机和设备通讯不稳定,远程协助已经无法继续，点击确定之后，退出协助模式",
                function () { win.appService.sendDataToApp(3999, "", ""); });
        }, 500);
    }

    function errHandlerAct4() {
        var loadingTxt = "";
        var tipsParams = "";

        //尝试获取loading的文本,只有loading层在显示状态的时候才执行；用户点击继续等待时，返还loading框
        if (tool.loading.status && tool.loading.status.display)
            loadingTxt = tool.loading.status.text;

        //尝试获取tips的所有参数，只有tips层在显示状态的时候才执行；用户点击继续等待时，返还tips框
        if (tool.alert.status && tool.alert.status.display)
            tipsParams = tool.alert.status.params;

        tool.loading.status.disable = true;

        //远程中，业务端和控制端区分对待
        if (global.RMTID.role == "1") {
            HiddenRMTCover();
            //首先隐藏遮罩，才能让提示框可以点击，如果用户选择【继续等待】，再将遮罩层返还，
            //对于提示网络不稳定之前的 弹框 和 加载遮罩，不管用户如何选择，都必须原样返还
            tool.alert(
                "网络通讯不稳定，远程协助已经无法继续，点击确定之后，退出协助模式",
                function () {
                    tool.loading.status.disable = false;

                    //确保获取文本之后，返还遮罩之前，遮罩层没有做任何的修改；
                    if (loadingTxt && tool.loading.status.text) {
                        tool.loading({text: tool.loading.status.text});
                        loadingTxt = "";
                    }

                    if (tipsParams)
                    //@用延迟来错开当前回调 函数 会关掉tipsBox的冲突，否则，最后的一步操作永远会关闭提示框
                        setTimeout(function () {
                            tool.alert.apply(tool, tipsParams);
                            tipsParams = "";
                        }, 450);

                    //通知APP不要再转发远程数据，让业务机正常退出
                    win.appService.sendDataToApp(win.CONSTANT.JS_TO_APP.INFORM_APP_IS_TIMEOUT, "", "");
                }
            );
        }
        else {
            tool.alert(
                "网络通讯不稳定，远程协助已经无法继续，点击确定之后，退出协助模式",
                //如果是控制机，发送3999，关闭UI窗口
                function () {win.appService.sendDataToApp(3999, "", "");}
            );
        }
    }

})(jQuery);