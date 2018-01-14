/**
 * Created by Andy on 2017/11/4.
 */

import emitter from "../../emitter/emitter.js";
export default function (socket, data) {
    setTimeout(function(){
        emitter(0x00, {fin:"1"}, socket);
    },5 * 60 *1000); //5分鐘一次心跳
};