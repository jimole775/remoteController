/**
 * Created by Andy on 2017/11/22.
 */
import tpl from "./animation.jade";
import "./animation.scss";

export default function ($stateProvider) {
    $stateProvider
        .state("animation", {
            url: '/animation',
            title: 'animation',
            template: tpl(),
            controller: Ctrl
        });
}

class Ctrl{
    constructor($rootScope,$state){
        "ngInject";
        $rootScope.footBtn({
            btn1Text:"返回",
            btn1Callback:function(){
                $state.go("home");
            }
        })
    }
}