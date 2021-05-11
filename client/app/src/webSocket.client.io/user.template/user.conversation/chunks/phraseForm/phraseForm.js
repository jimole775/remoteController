/**
 * Created by Andy on 2016/12/21.
 */
import tpl from "./phraseForm.jade";
import "./phraseForm.less";
export default function(){
	return {
		restrict:"EA",
		scope:{},
		template:tpl(),
		controller:Ctrl
	}
}
class Ctrl{
	constructor($scope, $element, $rootScope, charState){
		"ngInject";
		//charSate推送
		$scope.charState = charState;
		$scope.charState.phraseFormShow = false;
		$scope.phraseAry = [
			{
				title: "感谢...",
				content: "非常感谢您的帮助！"
			},
			{
				title: "催促...",
				content: "快点吧，我等的花儿都谢了！"
			},
			{
				title: "稍等...",
				content: "稍等一下，现在忙不过来。"
			},
			{
				title: "暂离...",
				content: "我现在有事，先离开一下。"
			},
			{
				title: "结束...",
				content: "操作已完成，可以结束业务了。"
			}
		];


		$scope.chosePhrase = function (content, event, index) {
			$scope.charState.phraseFormShow = false;
			$scope.charState.typeContent = content;
			$scope.$emit ("charState");
		};
	}
}