/**
 * Created by Andy on 2017/11/15.
 */
import tpl from "./home.jade";
import "./home.less";
import SimulateSlider  from "SimulateSlider";

export default function ($stateProvider) {
    $stateProvider
        .state("home", {
            url: '/home',
            title: 'home',
            template: tpl(),
            controller: Ctrl
        });
}


class Ctrl {
    constructor($scope, $element, $rootScope, userStorage, ngTool) {
        "ngInject";
        let slider = new SimulateSlider({
             tabId: "sliderTab"
            , slidingShoeId: "slidingShoe"
            , contextBoxId: "contextBox"
            , sliderBodyId: "sliderBody"
        });

        // 来自ws端口0x0A的数据
        $rootScope.$on("scrollCoordinate",function(scope){
            let scrollCoordinate = $rootScope["scrollCoordinate"];
            console.log(scrollCoordinate);

            if(userStorage.getStorage("remoteId") === 1){
                let {targetId,jrollX,jrollY} = scrollCoordinate;
                let winWidth = document.body.clientWidth;
                let winHeight = document.body.clientHeight;

                // 由于远端发送的滚动数据只有坐标
                // 这里的API需要当前的盒子在滑动块总数中的位置
                // 所以,在这里根据传输过来的坐标来计算
                let sliderTab = $element[0].querySelector(".slider-tab-chunk")[0];
                if(!sliderTab)return;
                let tabChunksCount = sliderTab[0].children.length;
                let slideChunkIndex = Math.round(Math.abs(tabChunksCount*jrollX));
                slider.hSlideTo(slideChunkIndex);
                slider.vSlideTo(slideChunkIndex,jrollY);
            }

        });

        $rootScope.footBtn({
            btn1Text:"退出",
            btn1Callback:function(){
                ngTool.alert.prompt("there's no way to run back~");
            }
        });
    }

}

