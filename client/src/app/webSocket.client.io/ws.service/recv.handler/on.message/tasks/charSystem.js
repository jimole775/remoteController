/**
 * Created by Andy on 2018/1/6.
 */

export default function ({$rootScope,ngTool, prayload, userStorage, charState}) {

    if(!charState.charShow){
         charState.newMsgCount = charState.newMsgCount + 1;
    }else{
        charState.newMsgCount = 0;
    }

    charState.charParagraphs.push(prayload.serverData);

    return charState;
}