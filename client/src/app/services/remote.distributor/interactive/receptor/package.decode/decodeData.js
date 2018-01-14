/**
 * Created by Andy on 2017/11/1.
 */

export default function (varFuncName, varParams) {
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
}