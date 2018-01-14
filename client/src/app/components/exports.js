/**
 * Created by Andy on 2017/11/13.
 */
import bar from "./chunks/bar/exports.js";
import componentsDirective from "./main/main.js";
export default angular.module("components",
    [bar.name]
)
.directive("components",componentsDirective)