/**
 * Created by Andy on 2017/12/24.
 */
import tpl from "./partRight.jade";
import "./partRight.less";
import disconnect from "../../images/disconnect.png";
import connect from "../../images/connect.png";
export default function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        controller: Ctrl,
        template: tpl(),
        link:link
    }
}

class Ctrl {
    constructor($scope, $rootScope, wsService, ngTool, userStorage){

        $scope.safeApply = ngTool.injectScope().safeApply;
        $scope.style = {
            background:`url(${disconnect}) no-repeat center`,
            backgroundSize:'22px 22px'
        };

        $scope.ngTool = ngTool;
        $scope.userStorage = userStorage;
        $scope.wsService = wsService;

        $rootScope.$on(userStorage,function(){

            $scope.safeApply(function(){
                if(userStorage.getStorage("remoteId")){
                    $scope.style = {
                        background:`url(${connect}) no-repeat center`,
                        backgroundSize:'22px 22px'
                    };
                }else{
                    $scope.style = {
                        background:`url(${disconnect}) no-repeat center`,
                        backgroundSize:'22px 22px'
                    };
                }
            });

        });

    }
}
Ctrl.$inject = ['$scope', '$rootScope', 'wsService', 'ngTool', 'userStorage']
function link($scope) {
    $scope.disConnect = function(){
        if($scope.userStorage.getStorage("remoteId")){
            $scope.ngTool.alert.prompt("是否取消远程连接?")
            .addConfirmBehavior("是",function(){
                    document.body.getElementsByTagName("section")[0].style.pointerEvents = null;
                    document.body.getElementsByTagName("footer")[0].style.pointerEvents = null;
                    $scope.userStorage.setStorage("remoteId",0);
                    $scope.wsService.emit(0xFE);
                    $scope.$emit($scope.userStorage);
                })
            .addCancelBehavior("否")

        }
    }
}
link.$inject = ['$scope']
