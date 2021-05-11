/**
 * Created by Andy on 2017/12/16.
 */

export default function ({ngTool,userStorage}) {
    ngTool.alert.loading.hide();
    ngTool.alert.prompt("对方拒绝了您的请求!");
    return userStorage;
};