/**
 * Created by Andy on 2017/12/23.
 */
import tpl from "./prompt.jade";
import "./prompt.scss";

export default function(){
    return {
        restrict:"E",
        template:tpl(),
        controller:Ctrl,
        replace:true,
        link:link,
        scope:false,
        require:"^alertPlugin"
    }
}

class Ctrl{
    constructor($scope){
        "ngInject";
    }
}

function link($scope,$element,$attr,req){

    $scope.alert.prompt = function (message = "信息") {
        $scope.loadingVisble = false;
        $scope.message = message;
        $scope.promptVisible = true;
        $scope.confirmText = "确定";  // 默认值
        $scope.confirmBehavior = () => {
            $scope.alert.hide(); //默认行为
        };
        $scope.cancelText = null;  // 默认值
        $scope.cancelBehavior = null; //默认行为
        return $scope.alert;
    };

}