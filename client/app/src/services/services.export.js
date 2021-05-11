/**
 * Created by Andy on 2017/12/25.
 */

import ngTool from "./ng.tools/tool.exports.js";
import ajax from "./Ajax/ajax.exports.js";

export default angular.module("service",[ngTool.name, ajax.name]);