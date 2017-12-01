/**
 * Created by Andy on 2017/11/13.
 */
import tpl from "./conversation.jade";
import "./conversation.scss";

export default function (){
    return {
        restrict:"EA",
        scope:false,
        template:tpl(),
        link:link,
        constructor:Ctrl
    }
}

function link(){


}

class Ctrl{
    constructor($scope){
        "ngInject";

    }
}
