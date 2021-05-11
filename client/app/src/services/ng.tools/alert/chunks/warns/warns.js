/**
 * Created by Andy on 2017/12/23.
 */
import tpl from "./warns.jade";
import "./warns.less";
import $ from "jquery";
export default function(){
    return {
        replace:true,
        restrict:"E",
        template:tpl(),
        controller:Ctrl,
        link:link,
        scope:false,
        require:"^alertPlugin"
    }
}

class Ctrl{
    constructor($scope){

    }
}

function link($scope,$element,$attr,req){

    let thisEle = $($element);
    let parentEle = thisEle.parent();

    $scope.alert.warns = function (message = "提醒") {
        $scope.message = message;

        parentEle.append(thisEle.css({opacity: 1}).show().stop());
        //显示500毫秒就淡出
        setTimeout(function () {
            thisEle.animate({opacity: 0}, 700, function () {
                thisEle.remove();  //最后删除元素
            });
        }, 500);

        return $scope.alert;
    };

}