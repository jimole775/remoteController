/**
 * Created by Andy on 2018/1/9.
 */
import $ from "jquery";
export default function ({prayload, wsService}) {
    if (prayload.serverData.remoteId == 1) {

    }

    if (prayload.serverData.remoteId == 2) {

        // 阻止所有可用按钮的事件向下传播，避免捕获到不相关元素
        //stopEventsPropagation();
        document.body.addEventListener("click",function(e){
            let target = e.target;
            let path = e.path;

            if(!/INPUT|BUTTON|SUBMIT/i.test(target.tagName)){
                for(let item of path){
                    if(/INPUT|BUTTON|SUBMIT/i.test(item.tagName)){
                        target = item;
                        break;
                    }
                }
            }

            // 从冒泡路径中还是找不到 按键类型的元素 的话，就直接退出
            if (!/INPUT|BUTTON|SUBMIT/i.test(target.tagName)) return;
            queryTarget(target, wsService);
        });

    }
}

function queryTarget(curTarget, wsService){

    console.log("event target: ", curTarget);

    // 根据业务类型，禁止一些事件传输，比如：聊天系统
    // 注意html的元素属性名不支持驼峰的书写方式
    if (curTarget.attributes["unremote"]) return;

    let targetName = curTarget.tagName.toUpperCase();

    let index = $("body").find(targetName).index(curTarget);

    wsService.emit(0x05, {buttonIndex: index, buttonType: targetName});
}


function stopEventsPropagation(){


    $("button").on("click",function(e){
        e.stopPropagation();
    });
    $("submit").on("click",function(e){
        e.stopPropagation();
    });
    $("input").on("click",function(e){
        e.stopPropagation();
    });
    $("a").on("click",function(e){
        e.stopPropagation();
    });

}