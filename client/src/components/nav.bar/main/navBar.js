/**
 * Created by Andy on 2017/11/15.
 */
import ngView from "./navBar.jade";
import "./navBar.scss";

export default function () {
    //isBack代表从车辆配置或者系统菜单返回；
    if (arguments[0] === -1) {
        $scope.pagesOptionChosenRecord.splice($scope.pagesOptionChosenRecord.length - 1);

        //只使用一次，pagesOptionChosenRecord只要变化，$scope.isBack就会置为假
        $scope.isBack = true;

        //如果在其他界面返回此界面的时候，页面记录为空，在监听器里面会被拦截一次，
        //isBack不能在第一时间重置为false,会造成第一次点击事件无效的BUG！
        if ($scope.pagesDataIndex-- == 1) $scope.isBack = false;
        //tool.processBar("获取车型系统成功");

    }
    else {    //否则就是重新诊断
        $scope.isBack = false;
        reset();
        requestData($scope.pagesOptionChosenRecord);
    }

    safeApply(function () {
        //重新布局需要延后，等待nav列表渲染完毕再进行，否则无法准确计算nav高度
        setTimeout(function () {
            tool.layout(thisBoxId, 1);
        }, 45);
    });
    /**
     * 下拉列表的回调函数,用于承接远程函数
     * @item   回调参数；
     * */
    $scope.handleSelect = function (parentIndex, item) {
        win.RMTClickEvent.carTypeHandleSelect(parentIndex, item);
    };

    /**
     * 正常选择事件
     * @param curClickPageIndex
     * @param item
     * */
    win.RMTClickEvent.carTypeHandleSelect = function (curClickPageIndex, item) {
        //每次翻页，都把滚动条置顶
        thisBox.find(".scroll-table-body").scrollTop(0);

        //远程进入函数，所有数字都转换成了字串
        var curClickPageIndex_int = parseFloat(curClickPageIndex);

        //点击之后马上加1，因为如果选择的项目重复，可能不去请求服务器
        $scope.pagesDataIndex = curClickPageIndex_int + 1;

        var recordIndex = $scope.pagesOptionChosenRecord.length;

        //如果选了不重复的项目，则删除 当前下标之后的 选项记录【$scope.pagesOptionChosenRecord】 和页面数据【$scope.pagesData】，通过监视器把 选项记录 发到服务器

        //第一种情况：如果重新选择车型，当前页面的下标 小于 选项记录的长度
        if ($scope.pagesDataIndex < recordIndex) {

            //选择了不同项，重新修改选项记录；
            if (item.name !== $scope.pagesOptionChosenRecord[$scope.pagesDataIndex - 1]) {

                //record下标和pages下标有1的差别，需要同步显示的情况下，引用pages的下标的时候必须 -1；
                //record下标和pages下标有1的差别，需要同步显示的情况下，引用record的下标的时候必须 +1；
                $scope.pagesOptionChosenRecord.splice($scope.pagesDataIndex - 1);
                $scope.pagesData.splice($scope.pagesDataIndex);

                //global.rootCache.carType[$scope.pagesOptionChosenRecord.length] = item.name;
                $scope.pagesOptionChosenRecord[$scope.pagesOptionChosenRecord.length] = item.name;
                win.global.DTCLog.systemName = item.name;

            }
            else {   //选择了相同项，直接修改show属性；
                showPageDataFromClientChoosen($scope.pagesDataIndex);
            }

        }

        //第二种情况：如果重新选择车型，选到了 选项记录的最后一项
        else if ($scope.pagesDataIndex === recordIndex) {

            //选了不同项，直接修改 选项记录；
            if (item.name !== $scope.pagesOptionChosenRecord[recordIndex - 1]) {
                $scope.pagesOptionChosenRecord[recordIndex - 1] = item.name;
            }
            //选择了相同项，直接修改 show属性；
            else {
                showPageDataFromClientChoosen($scope.pagesDataIndex);
            }

        }

        //第三种情况：正常选择，正常添加记录长度，监听器会做后续工作
        else {

            //手动更改parents的值，让$watchCollection监听器生效
            $scope.pagesOptionChosenRecord[$scope.pagesOptionChosenRecord.length] = item.name;
            win.global.DTCLog.systemName = item.name;
        }

        safeApply(function () {
            //重新布局需要延后，等待nav列表渲染完毕再进行，否则无法准确计算nav高度
            setTimeout(function () {
                tool.layoutTable();
            }, 45);
        });
    };

    $scope.navSelection = function (recordIndex) {
        win.RMTClickEvent.carTypeNavSelection({nav: recordIndex});
    };

    /**
     * 导航条点击事件
     * @param obj ;this param's type like {record:index} || {pagesDataIndex:index}
     * */
    win.RMTClickEvent.carTypeNavSelection = function (obj) {

        //区别从 点击 【导航】 返回 和 点击【上一级】按钮返回
        if (obj.hasOwnProperty("nav")) {
            var record = parseFloat(obj.nav);                //远程端只支持字串形式的数据
            $scope.pagesDataIndex = record + 1;
            showPageDataFromClientChoosen(record + 1);          //record下标和pages下标有1的差别，需要同步显示的情况下，
            //引用record的下标的时候必须 +1；
        }
        else {
            var pagesDataIndex_int = parseFloat(obj.btn);
            showPageDataFromClientChoosen(pagesDataIndex_int);
        }

        checkBtnTextBasisCurIndex();
        safeApply(function () {
        });
    };

    /**
     * 动态刷新按钮文本
     * */
    function checkBtnTextBasisCurIndex() {
        return $scope.pagesDataIndex > 0 ? "上一级" : "返回";
    }

    /**
     * 返回按钮点击事件,分为【上一级】和【退出诊断】两个功能，根据当前页面的Index进行判断
     * */
    function backToPrvLevel() {

        if ($scope.pagesDataIndex <= 0) {
            quit();
        }
        else {
            win.RMTClickEvent.carTypeNavSelection({btn: --$scope.pagesDataIndex});
        }
        safeApply(function () {
        });
    }

    /**
     * 监听是否存在 nodeaddress
     * 结合了业务流程
     * 根据 $scope.pagesOptionChosenRecord 的变化做了相应的处理
     * */
    $scope.$watchCollection('pagesOptionChosenRecord', function () {

        //监听器的执行先于其他代码，所以在此堵截，防止报错
        if (!$scope.pagesOptionChosenRecord[0] || "" == $scope.pagesOptionChosenRecord[0]) {

            return;
        }

        var curRecordIndex = $scope.pagesOptionChosenRecord.length - 1;
        //获取每个列表层级，并循环搜索是否存在nodeaddress；
        var itemLen = $scope.pagesData[curRecordIndex].length;
        if (itemLen > 0) {
            for (var i = 0; i < itemLen; i++) {
                var item = $scope.pagesData[curRecordIndex][i];

                //如果存在，直接跳入下个流程，取消确定按钮
                if (item.name == $scope.pagesOptionChosenRecord[curRecordIndex] && item['N']) {

                    $scope.dbFilename = item['N']['dbfilename'];
                    $scope.publicfilename = item['N']['publicfilename'];

                    safeApply(function () {
                    });
                    outputPrompt(item['N']['nodeaddress']);
                    return;
                }
            }
        }

        //从其他界面返回的时候，直接读取缓存数据，不需要请求服务器
        if ($scope.isBack === true) {
            $scope.isBack = false;
            return;
        }

        requestData($scope.pagesOptionChosenRecord);

    });

    /**
     * 页面的显示隐藏处理
     * 方法为--先全部隐藏，然后显示当前需要显示的
     * */
    function showPageDataFromClientChoosen(pagesDataIndex) {
        //先隐藏所有；
        var j = $scope.pagesData.length;
        while (j--) {
            var k = $scope.pagesData[j].length;
            while (k--) {
                $scope.pagesData[j][k].show = false;
                $scope.pagesData[j][k].imgShow = false;
            }
        }

        //再显示当前；
        var n = $scope.pagesData[pagesDataIndex].length;
        while (n--) $scope.pagesData[pagesDataIndex][n].show = true;
    }

    /**
     * 请求服务器命名封装
     * @param pagesOptionChosenRecord ;把整个选项记录的数组发送给服务器
     * */
    function requestData(pagesOptionChosenRecord) {
        if (showView)win.tool.loading({pos: "body", text: '获取数据...'});
        getItemsByParents(
            pagesOptionChosenRecord,
            win.server.addRetryFn(win.server.addCallbackParam(win.serverRequestCallback.CTYPE, [pagesOptionChosenRecord]),
                [requestData, backToPrvLevel])
        );
    }

    /**
     * 请求服务器初始化数据封装
     * @param pagesOptionChosenRecord ;选项记录
     * @param callback ;数据请求回调
     * */
    function getItemsByParents(pagesOptionChosenRecord, callback) {

        var callbackFunc = callback || function () {
            };
        var DataPack = {
            mkey: '',
            parents: pagesOptionChosenRecord       //服务器解析名为 parents；
        };

        win.server.request(
            global.businessInfo.serverType,
            {
                key: "CTYPE",
                cartype: global.businessInfo.carType
            },
            DataPack,
            win.server.addCallbackParam(callbackFunc, [pagesOptionChosenRecord]),
            [requestData, backToPrvLevel]
        );
    }


}