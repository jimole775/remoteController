/**
 * Created by Andy on 2017/11/14.
 */
import footBar from "./main/footBar.js";
import footButton from "./chunks/footButton/footButton.js";

//import footnote from "./chunks/footnote/footnote.js";

export default angular.module("bar.foot",[])
    .directive("footBar",footBar)
    .directive("footButton",footButton)
    //.directive("footnote",footnote);