/**
 * Created by Andy on 2016/12/21.
 */
import tpl from "./foot.jade";
import "./foot.scss";

export default function () {
    return {
        restrict: "EA",
        replace: true,
        scope: {},
        template: tpl(),
        controller: Ctrl,
        link:link
    }
}


class Ctrl {
    constructor($scope, $element, ngTool, charState, wsService, userStorage) {
        "ngInject";
        $scope.safeApply = ngTool.injectScope($scope).safeApply;
        $scope.charState = charState;
        $scope.charState.charParagraphs = [];
        $scope.charState.typeContent = "";
        $scope.charBody = document.body.getElementsByClassName("char-body")[0];

        $scope.send = function (content) {
            if (!content)return;
            //添加时间标识
            var nowDate = new Date();
            var h = nowDate.getHours();
            var m = nowDate.getMinutes();
            var s = nowDate.getSeconds();
            var formatDate = (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);

            let newSentence = {
                remoteId: userStorage.getStorage("remoteId"),
                oppositeName: userStorage.getStorage("oppositeName"),
                nativeName: userStorage.getStorage("nativeName"),
                sentence: content,
                timer: formatDate
            };

            $scope.safeApply(function(){
                // 远端接口
                wsService.emit(0x08,newSentence);

                // 本地接口
                $scope.charState.charParagraphs.push(newSentence);
                $scope.charState.phraseFormShow = false;
                $scope.$emit("charState");

                // 重置输入框
                $scope.charState.typeContent = "";
                // 发送之后滚动到底部
                ngTool.jroll($scope.charBody,"bottom");
            });

        };


        $scope.showPhraseForm = function () {
            $scope.charState.phraseFormShow = !$scope.charState.phraseFormShow;
            $scope.$emit("charState");
        };

        $scope.hidePhraseForm = function(){
            $scope.charState.phraseFormShow = false;
            $scope.$emit("charState");
        }
    }
}


function link($scope,$element){
    window.onkeydown = function(event){
        if(event.keyCode == 13 && $scope.charState.typeContent && $scope.charState.charShow){
            $scope.send($scope.charState.typeContent);
        }
    }


}

