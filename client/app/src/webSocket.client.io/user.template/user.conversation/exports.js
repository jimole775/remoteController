/**
 * Created by Andy on 2017/11/13.
 */
import conversation from "./main/main.js";
import contentBox from "./chunks/contentBox/contentBox.js";
import foot from "./chunks/foot/foot.js";
import head from "./chunks/head/head.js";
import hoverButton from "./chunks/hoverButton/hoverButton.js";
import phraseForm from "./chunks/phraseForm/phraseForm.js";

export default angular.module("user.conversation",[])
    .directive("conversation",conversation)
    .directive("charContentBox",contentBox)
    .directive("charFootBar",foot)
    .directive("charHeadBar",head)
    .directive("hoverButton",hoverButton)
    .directive("phraseForm",phraseForm)
    .config(function($provide){
        $provide.value("charState",{
            charShow:false,
            phraseFormShow:false,
            name:"charState",
            newMsgCount:0,
            sendMessage:function(content){
                console.log(content);
            }
        });
    });


