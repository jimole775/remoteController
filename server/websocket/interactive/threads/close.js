/**
 * Created by Andy on 2017/11/4.
 */
import disconnectChanel from "./disconnectChanel";
import reduceUserName from "./reduceUserName";

//用户关闭socket链接
export default function (data, socket) {
    reduceUserName(data, socket);
    if (data.items.remoteRole != 0)disconnectChanel(data, socket);
};