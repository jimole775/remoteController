/**
 * Created by Andy on 2017/12/5.
 */
import "./dtcDetail.less"
import tpl from "./dtcDetail.jade"
export default function () {
    return {
        restrict: "E",
        replace:true,
        template: tpl(),
        lick: link,
        scope: {
            show:"=ngShow"
            ,itemInfo:"=ngMode"
        },
        controller: Ctrl
    }
}

class Ctrl {
    constructor($scope, $element, ngTool, ajax) {
        "ngInject";

        this.scope = $scope;
        $scope.element = $element;
        $scope.thisCtrl = this;
        $scope.tool = ngTool;
        $scope.ajax = ajax;
        $scope.layout = ngTool.layout;
        $scope.safeApply = ngTool.injectScope($scope).safeApply;
        this.watchDetailState($scope);
        //this.dtcBindBottomBtn($scope.$root);
    }

    watchDetailState(scope){
        scope.$watch("show",function(changed,origin,scope){
            if(changed === true && !(changed === origin)) {
                scope.layout.init(scope.element);
                scope.thisCtrl.dtcBindBottomBtn(scope)
            }
        });
        return this;
    }

    dtcBindBottomBtn(scope) {
        scope.$root.footBtn({
            btn1Text: function () {
                return "返回";
            },
            btn1Callback: function () {
                scope.show = false;
            }
        })
    }
}
function link() {

}