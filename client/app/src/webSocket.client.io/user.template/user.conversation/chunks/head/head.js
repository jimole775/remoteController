/**
 * Created by Andy on 2016/12/21.
 */
import tpl from "./head.jade";
import "./head.less";

export default function () {
  return {
    restrict: "EA",
    replace: true,
    scope: {},
    template: tpl(),
    controller: Ctrl
  }
}

class Ctrl {
  constructor($scope, ngTool, charState, userStorage) {
    $scope.charState = charState;

    $scope.hideCharForm = function () {
      $scope.charState.charShow = false;
      $scope.charState.phraseFormShow = false;
      $scope.charState.newSentenceAmount = 0;
      $scope.$emit(charState);
    };

    $scope.matchRemoteRole = function () {
      let role = "未通讯";

      if (userStorage.getStorage("remoteId") == 2) {
        role = "求助者";
      }

      if (userStorage.getStorage("remoteId") == 1) {
        role = "协助者";
      }

      return `${userStorage.getStorage("oppositeName")}(${role})`;
    };

  }
}
Ctrl.$inject = ['$scope', 'ngTool', 'charState', 'userStorage']
