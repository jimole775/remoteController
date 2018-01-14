/**
 * Created by Andy on 2017/12/25.
 */
import tpl from "./main.jade";
export default function(){
    return {
        restrict:"E",
        replace:true,
        template:tpl(),
        link:link
    }
}
function link(){
    //nothing to do...
}

