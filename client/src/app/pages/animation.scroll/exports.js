/**
 * Created by Andy on 2017/11/22.
 */
import digitScroll from "./chunks/plugin.scroll/exports.js";
import animation from "./main/animation.js";
export default angular.module("page.animation",[digitScroll.name])
    .config(animation);