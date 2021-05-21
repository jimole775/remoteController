/**
 * Created by Andy on 2017/12/2.
 */

import safeApply from "./safe.apply/safeApply.js";
import Layout from "./layout/Layout.js";
import Drag from "./drag/Drag.js";
import alertModule from "./alert/alert.exports.js";
import alertInterface from "./alert/interface/Alert.js";
import jroll from "./jroll/jroll.js";

export default angular.module("ngTool", [alertModule.name])
    .factory("ngTool", function () {
        let scope = {};
        return {

            // 返回函数，可以直接调用
            safeApply: function (fn) {
                safeApply(scope,fn);
                return this;
            },

            // safeApply的前置条件，必须先注入运行环境的scope
            injectScope: function (_scope) {
                scope = _scope;
                return this;
            },

            // 返回构造函数，使用时调用的全是静态方法
            layout:Layout,

            // 返回构造函数，使用时需要实例化
            Drag:Drag,

            // 返回函数，直接调用
            jroll:jroll,

            // 返回实例，直接调用
            alert:alertInterface
        }
    })