/**
 * Created by Andy on 2017/3/21.
 */
(function ($) {
    var win = window;
    var doc = document;

    var template = [
        '<div id="userNameFrame" class="user-name-frame">' +
        '<div class="table-cell-center">' +
        '<label for=""><input type="text" size="22" maxlength="14" id="userName" style="text-align:center; font-size: 1.6rem" placeholder="取个牛逼点的名字" class="disable-plugin"/></label>' +
        '<label for=""><input type="button" style="width: 6rem;text-align: center;margin-left: 1rem;" id="userNameBtn" class="item-button disable-plugin" value="确定"></label>' +
        '</div>' +
        '</div>'
    ].join("");

    $("body").append(template);
    $("#bodyInit").text("");

    setTimeout(function () {
        $("#carLogo")[0].style.filter = "blur(3px)";

        //监听用户名长度
        $("#userName").on("input", function (event) {
            var val = this.value;
            var cnLen = 0;
            if (val) {
                val.split("").forEach(function (item) {
                    if (item.charCodeAt().toString(16).length >= 4) {
                        cnLen++;
                    }
                });
            }
            this.maxLength = cnLen + (14 - cnLen * 2);  //动态设置最大长度
        });

        //绑定确定按钮事件
        $("#userNameBtn").on("click", function () {
            var input = $("#userName");

            if (!win.global.ws)win.global.ws = new WebSocket("ws://127.0.0.1:81");

            if (input.val()) {
                if (getUserList().indexOf(input.val()) >= 0) {
                    tool.warnTip("#userName", "那么帅气的名字已经被抢了");
                    return;
                }
                if (/[`~!！?？@#$%^&'"“”\{}\[\]\(\)\\\/\*]/.test(input.val())) {
                    tool.warnTip("#userName", "不允许有特殊字符");
                    return;
                }
                $("#userNameFrame").hide();
                $("#carLogo")[0].style.filter = "blur(0)";
                global.ws.tool.getUserName(input.val());
                global.ws.send(0x01);
            } else {
                tool.warnTip("#userName", "不支持黑户");
                input[0].placeholder = "请先取一个名字！";
            }
        });
    }, 500);

    function getUserList() {
        var result = [];
        $("#friendList").find("li").each(function (index, item) {
            if (item.children.length && !item.innerText) {
                if (item.children.length > 1 && !item.children.innerText) {
                    Array.prototype.forEach.call(item.children, function (_index, _item) {
                        if (_item.innerText)result.push(_item.innerText);
                    });
                } else {
                    result.push(item.children.innerText);
                }
            } else {
                result.push(item.innerText);
            }
        });

        return result;
    }

})(jQuery);


//在PC端进行测试的时候，很多时候都需要重新拖拽窗口大小，由于页面的布局某些部分是由JS计算的，
//所以监听onresize之后，需要进行特殊处理
(function () {
    var cumulation = 0;

    var resizeFlag = false;
    var watcher = null;
    window.onresize = function () {

        if (cumulation <= 0) {
            watcher = setInterval(function () {
                if (cumulation > 0)cumulation--;
                if (cumulation <= 0 && resizeFlag) {
                    clearInterval(watcher);
                    watcher = null;
                    reLayout();
                    resizeFlag = false;
                }
            }, 75);
        }
        cumulation++;
        resizeFlag = true;
    };

//如果窗口的大小改变,就重载资源(主要为了在PC端测试时使用)
    function reLayout() {
        console.log("重新布局");
        cumulation = 0;
        win.CONSTANT.WINDOW_HEIGHT = document.body.clientHeight;
        win.CONSTANT.WINDOW_WIDTH = document.body.clientWidth;
        win.CONSTANT.EVENT_TYPE.START = "ontouchstart" in window ? "touchstart" : "mousedown";
        win.CONSTANT.EVENT_TYPE.MOVE = "ontouchmove" in window ? "touchmove" : "mousemove";
        win.CONSTANT.EVENT_TYPE.END = "ontouchend" in window ? "touchend" : "mouseup";

        //carLogo布局重新计算
        $(".module-list-ul").each(function () {
            var children = $(this).children("li");
            var liCount = children.length;
            var lineCount = parseInt(liCount / 3) + (liCount % 3 == 0 ? 0 : 1);
            var childWidth = win.CONSTANT.WINDOW_WIDTH / 3;
            // 设置li元素的高度
            children.each(function (index, item) {
                $(item).css({
                    "height": childWidth * 1.1,
                    "width": childWidth
                });
            });
        });

        tool.layoutTable();//由于数据量有点大,css布局不合理,所以,拿到数据之后再格式化表格
        setTimeout(function () {
            tool._scroll.run();//表格显示之后再添加滑动插件，这样的计算更准确
        }, 210);
    }
})();