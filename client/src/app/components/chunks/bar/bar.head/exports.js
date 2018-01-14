/**
 * Created by Andy on 2017/11/14.
 */
import headBar from "./main/headBar.js";
import partLeft from "./chunks/part.left/partLeft.js";
import partMiddle from "./chunks/part.middle/partMiddle.js";
import partRight from "./chunks/part.right/partRight.js";

export default angular.module("bar.head",[])
    .directive("headBar",headBar)
        .directive("partLeft",partLeft)
        .directive("partMiddle",partMiddle)
        .directive("partRight",partRight);