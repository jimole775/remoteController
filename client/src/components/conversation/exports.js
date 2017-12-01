/**
 * Created by Andy on 2017/11/13.
 */
import conversation from "./main/conversation.js";
import contentBox from "./chunks/contentBox/contentBox.js";
import foot from "./chunks/foot/foot.js";
import head from "./chunks/head/head.js";
import hoverButton from "./chunks/hoverButton/hoverButton.js";
import phraseForm from "./chunks/phraseForm/phraseForm.js";

export default angular.module("conversation",[])
    .directive("conversation",conversation)
    .directive("contentBox",contentBox)
    .directive("foot",foot).factory("")
    .directive("head",head)
    .directive("hoverButton",hoverButton)
    .directive("phraseForm",phraseForm);


