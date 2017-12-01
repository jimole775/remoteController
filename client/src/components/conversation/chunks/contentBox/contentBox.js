/**
 * Created by Andy on 2016/12/21.
 */
import tpl from "./contentBox.jade";
import "./contentBox.scss";

function contentBoxDirective($scope, $element, $rootScope, angularFactory) {
	return {
		restrict: 'EA',
		scope   : false,
		link    : directiveLink
	}
}

function directiveLink($scope, $element, $rootScope, angularFactory){

	$scope.safeApply = angularFactory.getScope ($scope).safeApply;
	$scope.thisForm = $element;
	$scope.charSate = {};
	$scope.charSate.charFormState = false;
	$scope.charSate.phraseFormState = false;
	$scope.charSate.newSentenceAmount = 0;
	$scope.charSate.contentsTyped = "";
	//$scope.charSate.phraseAry = [];

	//charSate对象只在聊天系统下使用
	$rootScope.$on ("charSate", function (scope) {
		$scope.charSate = scope.targetScope[scope.name];
		if($scope.charSate.contentsTyped){
			$scope.safeApply(function(){
				$scope.contentsTyped = $scope.charSate.contentsTyped;
			});
		}
	});

	$scope.charSentence = [
		//{
		//	remoteRole: "remote",
		//	userName: "诸葛先森",
		//	sentence: "你好！",
		//	timer: "时:分:秒",
		//	_interval: 0
		//},
		//{
		//	remoteRole: "native",
		//	userName: "刘先森",
		//	sentence: "你好！",
		//	timer: "时:分:秒",
		//	_interval: 1
		//}
	];

	var convInfoBox = [];
	win.global.syncRMTConversation = function (charInfo) {

		if(charInfo.remoteRole !== global.RMTID.role){
			if( $scope.charSate.charFormState === false && $scope.charSate.newSentenceAmount < 99) { $scope.charSate.newSentenceAmount ++; }
			else { $scope.charSate.newSentenceAmount = 99; }

			$scope.charSate.charWith = charInfo.userName;
			$scope.$emit ("charSate");

		}


		var _interval = -1;
		var _continuity = false;

		//把时间格式“12:12:12”转换成毫秒数
		var timeSplit = charInfo.timer.split (":");

		//转换成毫秒，方便计算，时间间隔超过2分钟就显示对话的时间
		var getTime = (timeSplit[0] * 60 * 60) + (timeSplit[1] * 60) + (timeSplit[2]*1000);

		convInfoBox.push ({timer: getTime, userName: charInfo.userName});   //把需要用到的数据暂存起来；

		//如果存储的数据超过两个，就进行比对
		if (convInfoBox.length >= 2) {
			_interval = convInfoBox[1].timer - convInfoBox[0].timer;    //比对输入的对话的间隔时间，如果超过2分钟，就显示输入时间；
			_continuity = convInfoBox[1].userName === convInfoBox[0].userName;  //比对输入的对话的相邻的用户名，如果相同，就不需要显示
			convInfoBox.shift ();   //比对完毕之后删除第一个数据
		}

		$scope.safeApply (function () {
			$scope.charSentence.push ({
				remoteRole: charInfo.remoteRole == global.RMTID.role ? "native" : "remote",
				userName: charInfo.userName,
				sentence: charInfo.sentence,
				timer: charInfo.timer,
				_interval: _interval,
				_continuity: _continuity
			});
		});

		//预留45毫秒时间用来渲染，然后再把滚动条拉到底部（使用jq方法或者angular_jqLite）
		setTimeout (function () {
			$element.find(".charBody").animate ({scrollTop:$element.find(".charBody")[0].scrollHeight}, 300);
		}, 45);

	};
}

contentBoxDirective.$inject = [
	"$scope", "$element", "$rootScope", "angularFactory"
];

export default contentBoxDirective;

/*(function () {

	var win = window;
	App.controller ("RMTCharController", ["$scope", "$element", "$rootScope", "angularFactory",
		function ($scope, $element, $rootScope, angularFactory) {
			$scope.safeApply = angularFactory.getScope ($scope).safeApply;
			$scope.thisForm = $element;
			$scope.charSate = {};
			$scope.charSate.charFormState = false;
			$scope.charSate.phraseFormState = false;
			$scope.charSate.newSentenceAmount = 0;
			$scope.charSate.contentsTyped = "";
			//$scope.charSate.phraseAry = [];

			//charSate对象只在聊天系统下使用
			$rootScope.$on ("charSate", function (scope) {
				$scope.charSate = scope.targetScope[scope.name];
				if($scope.charSate.contentsTyped){
					$scope.safeApply(function(){
							$scope.contentsTyped = $scope.charSate.contentsTyped;
					});
				}
			});

			$scope.charSentence = [
				//{
				//	remoteRole: "remote",
				//	userName: "诸葛先森",
				//	sentence: "你好！",
				//	timer: "时:分:秒",
				//	_interval: 0
				//},
				//{
				//	remoteRole: "native",
				//	userName: "刘先森",
				//	sentence: "你好！",
				//	timer: "时:分:秒",
				//	_interval: 1
				//}
			];

			var convInfoBox = [];
			win.global.syncRMTConversation = function (charInfo) {

				if(charInfo.remoteRole !== global.RMTID.role){
					if( $scope.charSate.charFormState === false && $scope.charSate.newSentenceAmount < 99) { $scope.charSate.newSentenceAmount ++; }
					else { $scope.charSate.newSentenceAmount = 99; }

					$scope.charSate.charWith = charInfo.userName;
					$scope.$emit ("charSate");

				}


				var _interval = -1;
				var _continuity = false;

				//把时间格式“12:12:12”转换成毫秒数
				var timeSplit = charInfo.timer.split (":");

				//转换成毫秒，方便计算，时间间隔超过2分钟就显示对话的时间
				var getTime = (timeSplit[0] * 60 * 60) + (timeSplit[1] * 60) + (timeSplit[2]*1000);

				convInfoBox.push ({timer: getTime, userName: charInfo.userName});   //把需要用到的数据暂存起来；

				//如果存储的数据超过两个，就进行比对
				if (convInfoBox.length >= 2) {
					_interval = convInfoBox[1].timer - convInfoBox[0].timer;    //比对输入的对话的间隔时间，如果超过2分钟，就显示输入时间；
					_continuity = convInfoBox[1].userName === convInfoBox[0].userName;  //比对输入的对话的相邻的用户名，如果相同，就不需要显示
					convInfoBox.shift ();   //比对完毕之后删除第一个数据
				}

				$scope.safeApply (function () {
					$scope.charSentence.push ({
						remoteRole: charInfo.remoteRole == global.RMTID.role ? "native" : "remote",
						userName: charInfo.userName,
						sentence: charInfo.sentence,
						timer: charInfo.timer,
						_interval: _interval,
						_continuity: _continuity
					});
				});

				//预留45毫秒时间用来渲染，然后再把滚动条拉到底部（使用jq方法或者angular_jqLite）
				setTimeout (function () {
					$element.find(".charBody").animate ({scrollTop:$element.find(".charBody")[0].scrollHeight}, 300);
				}, 45);

			};


		}])

		.directive ("headBar",function(){
		var template = [
			'   <div id="charHead" class="charHeadForm">',
			'       <div class="char-back-btn" ng-click="hideCharForm()">',
			'           <span class="table-cell">',
			'               <i class="arrow-left arrow-layout-middle" style="border-color:#fff"></i>',
			'           </span>',
			'       </div>',
			'       <div class="char-title">',
			'           <span ng-bind="charSate.charWith">远程对象</span>',
			'       </div>',
			'       <div class="char-close-btn" ng-click="hideCharForm()">',
			'           <span class="table-cell">',
			'           </span>',
			'       </div>',
			'   </div>'
		].join("");
		return {
			restrict:"ECMA",
			scope:false,
			template:template,
			link:function(scope){
				scope.hideCharForm = function () {
					scope.charSate.charFormState = false;
					scope.charSate.phraseFormState = false;
					scope.charSate.newSentenceAmount = 0;
					scope.$emit ("charSate");
				};
			}
		}
	})

		.directive ("footBar", function () {
		var template = [
			'   <div id="type-form" class="charFooter">',
			'       <div class="left-side" ng-click="showPhraseForm($event)">',
			'           <span>短语</span>',
			'       </div>',
			'       <div class="middle-side">',
			'           <input type="text" ng-model="contentsTyped" class="disable-RMTActive disable-plugin type-entering">',//disable-plugin拒绝被插件包装的开关
			'       </div>',
			'       <div class="clear-button table" ng-click="contentsTyped = \'\'">',
			'           <div class="table-cell" style="text-align: center">',
			'               <img src="./images/common/refresh_2.png">',
			'           </div>',
			'       </div>',
			'       <div class="right-side type-send">',
			'           <span ng-click="sendContents(contentsTyped,$event)">发送</span>',
			'       </div>',
			'   </div>'
		].join("");
		return {
			restrict:"ECMA",
			scope:false,
			template:template,
			link:function(scope,element){

				scope.sendContents = function(contents, $event){
					if(!contents)return;
					//添加时间标识
					var nowDate = new Date ();
					var h = nowDate.getHours ();
					var m = nowDate.getMinutes ();
					var s = nowDate.getSeconds ();
					var formatDate = (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
					var charInfo = {
						remoteRole: global.RMTID.role,
						userName: global.userName || "远程对象",
						sentence: contents,
						timer: formatDate
					};
					win.global.syncRMTConversation (charInfo);
					win.sendRMTEventToApp("global.syncRMTConversation",[charInfo]);

					scope.contentsTyped = "";
				};

				scope.showPhraseForm = function(event){
					tool.stopPropagation(event);
					scope.charSate.phraseFormState = true;
					scope.$emit ("charSate");
				}
			}
		}
	})



}) ();*/


