/**
 * Created by Andy on 2017/12/25.
 */
 import foot from "./bar.foot/exports.js";
 import head from "./bar.head/exports.js";
export default angular.module("bar",[foot.name,head.name]);