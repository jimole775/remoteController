/**
 * Created by Andy on 2016/12/21.
 */
import tpl from "./foot.jade";
import "./foot.scss";

function footBarDirective() {
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
}

export default footBarDirective;


