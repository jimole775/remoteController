/**
 * Created by Andy on 2017/11/13.
 */
import conversation from "./conversation/exports";
import footBar from "./foot.bar/exports";
import headBar from "./head.bar/exports";
import digitScroll from "./digit.scroll/exports";
export default angular.module("components",
    [footBar.name,headBar.name,digitScroll.name]
)