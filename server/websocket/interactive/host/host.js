
/**
 * Created by Andy on 2017/3/14.
 */
import TR from "/server/websocket/socketRegister/socketRegister";

import close from "../threads/close";
import pushNameMap from "../threads/pushNameMap";
import distributeUid from "../threads/distributeUid";
import connectAsk from "../threads/connectAsk";
import connectAccept from "../threads/connectAccept";
import connectReject from "../threads/connectReject";
import interActivePassageway from "../threads/interActivePassageway";

export default function (frame, socket) {
    switch (frame.Opcode) {
        case 8:
            let msg = frame.PayloadData.slice(2).toString();
            console.log("会话已经结束:", socket, msg);
            socket.end();
            if (msg)if (/^[\{\[]/.test(msg))close(JSON.parse(msg), socket);
            break;
        default :
            TR.setStorage("opcode",frame.Opcode);
            let data = JSON.parse(frame.PayloadData.toString()) || "";
            switch (data.status) {
                case 0x00:
                    pushNameMap(data, socket);
                    break;
                case 0x01: //如果map里面没有此用户，就存储session，并绑定用户名
                    distributeUid(data, socket);
                    break;
                case 0x02:    //协助通道的询问
                    connectAsk(data, socket);
                    break;
                case 0x03:  //协助通道的应答
                    connectAccept(data, socket);
                    break;
                case 0x04:
                    connectReject(data, socket);
                    break;
                case 0x05:    //远程协助交互通道
                    interActivePassageway(data);
                    break;
                case 0x06:
                    break;
                case 0x07:
                    break;
                case 0xFF: //断开协助通道//关闭ws
                    //that.close(data);
                    //console.log("中断远程用户");
                    break;
                default :
                    break;
            }
            break;
    }
};
