/**
 * Created by Andy on 2016/12/21.
 */
import tpl from "./head.jade";
import "./head.scss";

function headBarDirective() {
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
}

export default headBarDirective;



