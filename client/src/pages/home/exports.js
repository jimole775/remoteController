/**
 * Created by Andy on 2017/11/20.
 */

import tab from "./chunks/tab/tab.js";
import content from "./chunks/content/content.js";
import homeConfig from "./main/home.js";
export default angular.module("pages.home",[])
    .config(homeConfig)
    .directive("tab",tab)
    .directive("content",content);
