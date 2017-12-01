/**
 * Created by Andy on 2017/3/4.
 */
(function ($) {
    var template = [
        '<div id="friendFrame" class="friend-frame">',
        '<h2 id="friendListHeader" class="friend-list-header">基友列表(在线)</h2>' +
        '<ul id="friendList" class="friend-list"></ul>',
        '<button id="friendListClose" style="z-index:3;" class="button-init triangle-icon-basic">' +
        '<i class="triangle-icon"></i>' +
        '</button>',
        '<button style="z-index:3;" id="friendListExtend" class="button-init extend-icon-basic">',
        '<i class="extend-icon"></i>',
        '</button>'
    ].join("");

    $("body").append(template);

    $("#friendFrame").ready(function () {
        setTimeout(function () {
            var headBarRight = $("#headBarRight");
            headBarRight.show();

            headBarRight.find(".head-bar-right-button").on("click",function(){
                $("#friendFrame").show();
                headBarRight.find(".tip-pop").hide().text("");
                headBarRight.find("button").addClass("head-bar-right-button-press");
            });

            $("#friendListClose").on("click", function () {
                $("#friendFrame").hide();
                headBarRight.find("button").removeClass("head-bar-right-button-press");
            });

            var _drag = new Drag();
            _drag.bindEvent("friendListHeader", "friendFrame", "friendListExtend");
        }, 500);
    });
}(jQuery));