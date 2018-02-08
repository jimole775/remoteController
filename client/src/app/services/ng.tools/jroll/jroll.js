/**
 * Created by Andy on 2018/1/5.
 */
import JRoll from "jroll";
import $ from "jquery";
let jroll = [];
export default function(ele, position){

    let tagName = ele.tagName;
    let tagId = $("body").find(tagName).index(ele);
    // 延迟300ms的渲染时间，绑定jroll滚动事件
    setTimeout(function () {
        if (!jroll[tagId]) {

            jroll[tagId] = new JRoll(ele, {
                edgeRelease: true,
                mousewheel: true
            });

            var userAgent = navigator.userAgent.toLowerCase();
            var isWin = (userAgent.indexOf("windows") != -1); // 如果是Windows系统，则返回true
            var isMac = (userAgent.indexOf("mac") != -1 && userAgent.indexOf("iphone") == -1); // 如果是Macintosh系统，则返回true
            var isUnix = (userAgent.indexOf("x11") != -1); // 如果是Unix系统，则返回true
            var isLinux = (userAgent.indexOf("linux") != -1); // 如果是Linux系统，则返回true 文章大部分内容来
            // 如果是PC端，禁止在滚动的时候触发点击事件
            if (isWin || isMac || isUnix || isLinux) {

                let startY = 0;
                let scrollY = 0;
                jroll[tagId].on("scrollStart", function (e) {
                    //startY = e.pageY;
                    //ele.style.pointerEvents = null;
                });

                jroll[tagId].on("scroll", function (e) {
                    //scrollY = e.pageY;

                    // 确定已经滚动，就隐藏点击事件
                    //if (scrollY - startY >= 2) {
                        ele.style.pointerEvents = "none";
                    //}
                });

                // 滚动完毕，回复点击事件
                jroll[tagId].on("scrollEnd", function () {
                    console.log("scrollEnd");
                    ele.style.pointerEvents = null;
                });
            }

        } else {

            // 刷新JROll的高宽
            jroll[tagId].refresh();

            let beyondEdge = ele.firstChild.clientHeight - ele.clientHeight;

            // 执行滚动需求
            if(position === "bottom" && beyondEdge > 0){
                jroll[tagId].scrollTo(0, -beyondEdge, 300);
            }
            if(position === "top"){
                jroll[tagId].scrollTo(0, 0, 300);
            }

        }
    }, 100);


}