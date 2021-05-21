/**
 * Created by Andy on 2017/11/14.
 */
import tpl from "./footBar.jade";
import "./footBar.less";

export default function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        link: link,
        template: tpl()
    }
}

function link() {

}