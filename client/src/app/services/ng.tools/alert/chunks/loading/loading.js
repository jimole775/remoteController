/**
 * Created by Andy on 2017/12/23.
 */
import tpl from "./loading.jade";
import "./loading.scss";
export default function(){
    return {
        replace:true,
        restrict:"E",
        template:tpl(),
        controller:Ctrl,
        link:link,
        scope:false
    }
}

class Ctrl{}

function link($scope,$element){
    $scope.alert.loading = function(message="加载...",countDown = 10){
        $scope.message = message;
        $scope.isLongWait = false;
        $scope.promptVisible = false;
        $scope.loadingVisible = true;
        $scope.close = $scope.alert.hide;

        setTimeout(function(){
            $scope.$apply(function(){
                if($scope.loadingVisible === true){
                    $scope.message = "等待时间过长，可以点击取消";
                    $scope.isLongWait = true;
                }
            });
        },countDown * 1000);
    };

    $scope.alert.loading.hide = function(){
        $scope.alert.hide();
    }
}
