/**
 * Created by Andy on 2017/12/3.
 */
import $ from "jquery";
import _ from "lodash";
export default class Layout {

    /**
     * 布局方法，一般把窗口 分为3个部分，
     *
     * 头部（包括 #title ，.groupNav , .scroll-table-header）
     * 中间可滚动部分 （.scroll-table-body）
     * 脚部（#footer，#bottomBtn，.scroll-table-footer）
     *
     *@params flag:init  重置克隆的元素
     * */
    static init(element = $("section"), flag = 1) {
        let dataBox = null;

        /**
         * section标签是uiRouter的控制器盒子，
         * div标签是directive的控制器盒子
         * */
        if (element[0].nodeName === "SECTION") {

            //如果多层盒子在uiView中平行存在，那么，默认第一个dataBox就是当前uiRouter的控制器盒子
            //其他的都是directive的控制器盒子
            //***一个路由跳转只能是一个$state加N个directive***
            dataBox = $($(element[0]).children[0]);
        } else {
            dataBox = $(element[0]);
        }
        let elementIndex = $("section").find("div").index(dataBox);
        let $curContentBody = dataBox.find(".scroll-table-body");
        console.log("elementIndex: ", elementIndex);
        if (flag == 1) {
            Layout.showTable(dataBox);

            //打开页面【后】，探索当前页有没有存储有滚动条记录
            let curScrollTop = parseFloat(sessionStorage.getItem(elementIndex));
            if (curScrollTop != undefined && curScrollTop != null) {
                $curContentBody.scrollTop(curScrollTop);
            }
        }
        else {
            //关闭页面【前】，存储当前页的滚动条高度
            sessionStorage.setItem(elementIndex, $curContentBody.scrollTop());

            Layout.hideTable(dataBox);
        }
    }

    static showTable(box) {

        let boxChildren = box.children();
        /**
         * 1，由于angular渲染元素在原生JS之后，获取不到相应的元素
         * 所以 在angular框架下，必须 把布局写在 html 里面
         *
         * 2，在非angular框架下，必须限制是 3个盒子
         */
            //如果css类名为data-box,并且找不到.scroll-table-body，就依次为盒子添加3个布局；
            //if (!box.find(".scroll-table-body").length) {
            //    let header = "<div class='scroll-table-header'></div>";
            //    let body = "<div class='scroll-table-body'></div>";
            //    let footer = "<div class='scroll-table-footer'></div>";
            //    let title = boxChildren.eq(0);
            //    let content = boxChildren.eq(1);
            //    let footerBtn = boxChildren.eq(2);
            //    box.append(header, body, footer);
            //    title.appendTo(box.find(".scroll-table-header"));
            //    content.appendTo(box.find(".scroll-table-body"));
            //    footerBtn.appendTo(box.find(".scroll-table-footer"));
            //}
            //box.removeClass().addClass("data-box");

        box.show();
        setTimeout(function () {
            Layout.resize(box);
        });
    }

    static hideTable(box) {

        box.hide();

    }

    /**
     * 布局方法，一般把窗口 分为3个部分，
     *
     * 头部（包括 #title ，.groupNav , .scroll-table-header）
     * 中间可滚动部分 （.scroll-table-body）
     * 脚部（#footer，#bottomBtn，.scroll-table-footer）
     *
     *@params flag:init  重置克隆的元素
     * */
    static resize(box, flag) {
        let curFrame = null;
        if (box === undefined || !$(box).is("div")) {
            curFrame = _.find($("section").find("div"), function (el) {
                return $(el).is(':visible');
            });
        } else {
            curFrame = box;
        }

        if (!curFrame) {
            return;
        }

        if (flag === 'init') {          //退出前重置 克隆的头部元素，避免重新进入时出现两个元素重叠
            Layout.removeCloneHead(curFrame);
        }
        else {

            Layout.cloneThead(curFrame);

            Layout.layout(curFrame);

        }

    }

    static cloneThead(curFrame) {

        let frameHeader = $(curFrame).find('.scroll-table-header');
        let frameBody = $(curFrame).find('.scroll-table-body');
        if (frameBody.find('table').length > 0) {     //处理table滚动元素的布局；

            let bodyThead = frameBody.find('thead');

            if (!frameHeader.find('table').length && bodyThead.length) {       		//避免重复克隆，而且有些盒子是没有thead的，就不需要克隆
                frameHeader.append('<table></table>');
                frameHeader.find('table').append(bodyThead.clone());
            }
        }
    }

    static removeCloneHead(curFrame) {
        let frameBody = $(curFrame).find('.scroll-table-body');
        if (frameBody.find('thead').length > 0) {
            $(frameBody.find('thead')).remove();
        }
    }

    static layout(curFrame) {

        let frameHeader = $(curFrame).find('.scroll-table-header');
        let frameBody = $(curFrame).find('.scroll-table-body');
        let footer = $("footer");
        let titleHeight = $("#Title").height() || 0;
        let frameHeaderHeight = frameHeader.height() || 0;
        let footHeight = footer.is(':visible') ? footer.height() : 0;
        let thead_cloneHeight = frameHeader.height();

        let bodyHeight = $("html").height() - titleHeight - frameHeaderHeight - footHeight + thead_cloneHeight;


        frameBody.css('height',bodyHeight);

        if(frameBody.css("position") === "absolute"){
            frameBody.css({
                'top': frameHeaderHeight - thead_cloneHeight + titleHeight
            });
        }else{
            frameBody.css({
                'top': - thead_cloneHeight
            });
        }

        if(frameHeader.css("position") === "absolute"){
            frameHeader.css({
                'top': titleHeight
            });
        }

    }
}