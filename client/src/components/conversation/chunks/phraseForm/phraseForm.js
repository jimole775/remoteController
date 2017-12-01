/**
 * Created by Andy on 2016/12/21.
 */
import tpl from "./phraseForm.jade";
import "./phraseForm.scss";
function phraseFormDirective($scope, $element, $rootScope,angularFactory){
	return {
		restrict:"EA",
		scope:false,
		template:tpl(),
		link:directiveLink
	}
}

function directiveLink($scope, $element, $rootScope){
	//charSate推送
	$scope.charSate = {};
	$scope.charSate.charFormState = false;
	$scope.charSate.phraseFormState = false;
	$scope.charSate.contentsTyped = "";
	$scope.charSate.newSentenceAmount = 0;

	$scope.charSate.phraseAry = [
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

	//charSate对象只在聊天系统下使用
	$rootScope.$on ("charSate", function (scope) {
		$scope.charSate = scope.targetScope[scope.name];
	});

	$scope.$emit ("charSate");

	$scope.isChoseAPhrase = function (item, event, index) {

		$scope.charSate.phraseFormState = false;
		$scope.charSate.contentsTyped = item;
		$scope.$emit ("charSate");

		//广播出去之后，需要重置一下
		$scope.charSate.contentsTyped = "";
	};
}

phraseFormDirective.$inject = [
	"$scope", "$element", "$rootScope","angularFactory"
];

export default phraseFormDirective;