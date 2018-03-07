/**
 * Created by Andy on 2017/10/31.
 */

let RMT = new Proxy({}, {
    set(target, key, val){
        return  Reflect.defineProperty(target,key,{
            configurable:true,
            writable:false,
            value:new Proxy(function() {}, {
                apply: function(target, thisArg, argumentsList) {
                    distributorHandler(key, argumentsList);
                    console.log('called: ' + argumentsList.join(', '));
                    return Reflect.apply(val, thisArg, argumentsList);
                }
            })

        });
    }
});

RMT.uiRouter = function ($state, newUrl, params) {

    if(!newUrl && !params) return;
    let curUrl = window.location.hash.split("/").pop();

    if (curUrl == newUrl.split("/").pop()) {
        console.log("do nothing~");
    } else {
        window.location.replace(window.location.href + newUrl + "?" + JSON.stringify(params?params:""));
    }   
    

};


function distributorHandler(fnName, params){
    //return (...args) => {
    //    console.log("派发数据：", args);
    //    let temp = [], RMT_params = "";
    //    let len = args.length, i = 0;
    //
    //    /**将所有参数处理成字串，（每个参数之间添加“_|_”符号）*/
    //    while (i < len) {
    //        temp[i] = typeof args[i] === "string" ? args[i] : JSON.stringify(args[i]);
    //        if (i === len - 1) RMT_params += temp[i++];                      //如果 是最后一个,就不用加"_|_" 符号
    //        else RMT_params += temp[i++] + "_|_";       //处理传给远程业务的参数!,全部转成字串,以"_|_"为分隔符!
    //    }
    //
    //    dataEmitter(type, fnName, RMT_params);
    //
    //    /**处理本地执行的参数，把arguments拼成数组，然后使用apply进行调用*/
    //    let local_params = [];                                              //直接获取本地函数的执行参数
    //    let local_len = args.length, k = 0;                            //直接获取本地函数的执行参数
    //    while (k < local_len) local_params[k] = args[k++];             //直接获取本地函数的执行参数
    //    //直接获取本地函数的执行参数
    //    callback.apply(window, local_params);
    //};
    console.log(fnName, params);
}

export default RMT;