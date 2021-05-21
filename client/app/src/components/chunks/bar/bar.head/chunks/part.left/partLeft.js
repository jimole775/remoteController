/**
 * Created by Andy on 2017/12/24.
 */
import tpl from "./partLeft.jade";
import "./partLeft.less";

export default function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        link: link,
        template: tpl()
    }
}

class Ctrl {
    constructor() {

    }
}

function link() {

}