/**
 * Created by Andy on 2017/11/15.
 */
import tpl from "./home.jade";
import "./home.scss";

export default function ($stateProvider) {
    $stateProvider
        .state("home", {
            url: '/home',
            title: 'home',
            template: tpl(),
            controller: Ctrl
        });
}

import SimulateSlider  from "SimulateSlider";

class Ctrl {
    constructor($scope,$rootScope) {
        "ngInject";
        new SimulateSlider({
             tabId: "sliderTab"
            , sliderShoeId: "sliderShoe"
            , contextBoxId: "contextBox"
            , sliderBodyId: "sliderBody"
        });
        $rootScope.footBtn({
            btn1Text:"退出"
        });
    }

}

