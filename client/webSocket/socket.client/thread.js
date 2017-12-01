/**
 * Created by Andy on 2017/3/23.
 */
(function ($) {

    //被询问 请求协助，只有被询问方执行
    WebSocket.prototype.remoteSniff = function (items) {
        var that = this;

        this.tool.getAskerName(items.remoteUid.askerUid);
        this.tool.getHelperName(items.remoteUid.helperUid);

        tool.alert(
            ["【" + items.remoteUid.askerUid + "】请求您的协助！", "确定", "取消"],
            function () {
                that.send(0x03, true);
            },
            function () {
                that.send(0x04, false);
            });
    };

    //接受远程的响应，由服务器分别推送给两个客户端（也就是说两边客户端同时执行）
    WebSocket.prototype.acceptRemoteConnect = function (items) {
        var that = this;
        tool.loading(0);
        var asker = that.tool.getAskerName();
        var helper = that.tool.getHelperName();
        $("#friendList").find("button").each(function (index, item) {
            var userName = $(item).find("span").text();
            $(item).addClass("event-disable");
            if (userName === helper) {
                $(item).append('<em class="light-text">(协助者)</em>');
                $(item).parent("li").append('<i class="remote-disconnect-btn"></i>');
            } else if(userName === asker){
                $(item).append('<em class="light-text">(求助者)</em>');
                $(item).parent("li").append('<i class="remote-disconnect-btn"></i>');
            }else {
                $(item).addClass("button-disable-state");
            }
        });

        win.jsRecvAppData(1000, {
            screenInfo: {screenSize: 5.5, headHeight: 60, footHeight: 60},
            serverHost: "http://192.168.1.37:8091",   //http://192.168.1.37:8091#ZJL服务器 //http://112.124.26.243:8090#云服务器
            businessRole: items.remoteRole
        }, "");
    };

    //不管用户在不在通讯中,一律删除
    WebSocket.prototype.reduceUserName = function (items) {
        var that = this;
        $("#friendList").find("button").each(function (index, item) {

            //判断需要删除的用户是否和当前用户存在远程业务关系，再决定是否删除提示信息
            if (global.RMTID.role != 0) {
                if (that.tool.getAskerName() === items.deadUid || that.tool.getHelperName() === items.deadUid)
                    $(item).find("em.light-text").remove();
            }

            if ($(item).find("span").text() === items.deadUid) {
                $(item).parents("li").remove();
            }
        });
    };

    WebSocket.prototype.rejectRemoteConnect = function (items) {
        tool.alert("对方拒绝了您的请求!", function () {
        });
    };

    var newFriendsAmount = 0;
    WebSocket.prototype.addFriend = function (items) {
        var that = this;
        var friendList = $("#friendList");
        var namesMap = JSON.parse(items.namesMap);
        var originNames = friendList.find("button").text() || [];

        //多个用户
        if (namesMap.length > 1) {

            namesMap.forEach(function (item) {

                //如果原用户列表中没有，就代表是新用户
                if (originNames.indexOf(item) < 0) {
                    if (that.tool.getUserName() != item) {
                        if (global.RMTID.role != 0) {
                            friendList.append(
                                '<li><button class="item-button event-disable button-disable-state" style="height:3.6rem;">' +
                                '<span data-id="userName">' + item + '</span></button></li>');
                        } else {
                            friendList.append('<li><button class="item-button" style="height:3.6rem;"><span data-id="userName">' + item + '</span></button></li>');
                        }
                        handleNewFriendTipsPop();
                    }
                }

            });

        }

        //单个用户
        else if (namesMap.length === 1) {
            if (that.tool.getUserName() === namesMap[0]) return;

            if (global.RMTID.role != 0) {
                friendList.append('<li><button class="item-button event-disable button-disable-state" style="height:3.6rem;"><span data-id="userName">' + namesMap[0] + '</span></button></li>');
            } else {
                friendList.append('<li><button class="item-button " style="height:3.6rem;"><span data-id="userName">' + namesMap[0] + '</span></button></li>');
            }


            handleNewFriendTipsPop();
        }

        //绑定按钮事件
        setTimeout(function () {
            friendList.off().on("click", "button", function (event) {
                that.tool.getAskerName(that.tool.getUserName());
                that.tool.getHelperName(event.currentTarget.innerText);
                tool.alert("是否请求【" + event.currentTarget.innerText + "】的帮助？",
                    function () {
                        tool.loading({text: "等待对方应答..."});
                        that.send(0x02, true);
                    },
                    function () {
                    })
            });

        }, 45);
    };

    function handleNewFriendTipsPop() {
        if ($("#friendFrame").is(":hidden")) {  //如果用户列表在隐藏状态，就累积计算新用户数量
            newFriendsAmount = parseInt(newFriendsAmount) >= 9 ? "9+" : newFriendsAmount + 1;
            var tipPop = $("#headBarRight").find(".tip-pop");
            if (tipPop.text() === "") { //如果好友提示文本为空，就证明是第一次显示，或者被重置过，重新计算新好友数量
                newFriendsAmount = 1;
                tipPop.text(1).show();
            } else {
                tipPop.text(newFriendsAmount).show();
            }
        }
        else {
            newFriendsAmount = 0;
        }
    }

    WebSocket.prototype.disconnectChanel = function (items) {
        $("#RMTCover").hide();

        global.RMTID.role = 0;

        $("#friendList").find("button").each(function (index, item) {
            var userName = $(item).find("span").text();
            items.remoteChanelMap.forEach(function (inneritem, innerIndex) {
                if (inneritem.askerUid === userName || inneritem.helperUid === userName)return;
                $(item).removeClass("event-disable button-disable-state");
            });
        });

        tool.alert("对方已经断开连接", function () {
        });
    };

    WebSocket.prototype.signRMTUser = function (items) {
        var that = this;

        //如果有remoteUid项，就是普通业务通知的，如果没有，就是未注册用户获取整个列表的时候，拿到的通知
        var asker = items.remoteUid ? items.remoteUid.askerUid : items.askerUid;
        var helper = items.remoteUid ? items.remoteUid.helperUid : items.helperUid;

        $("#friendList").find("button").each(function (index, item) {
            var userName = $(item).find("span").text();
            if (userName === helper || userName === asker) {
                $(item).addClass("event-disable button-disable-state");
                $(item).append('<em class="disable-text">(忙碌...)</em>');
            }
        });
    };

    WebSocket.prototype.unSignRMTUser = function (items) {
        var that = this;
        var asker = items.remoteUid.askerUid;
        var helper = items.remoteUid.helperUid;
        $("#friendList").find("button").each(function (index, item) {
            var userName = $(item).find("span").text();
            if (userName === helper || userName === asker) {
                $(item).find("em.disable-text").remove();
                if (global.RMTID.role == 0) {
                    $(item).removeClass("event-disable button-disable-state");
                }
            }
        });
    }

})(jQuery);