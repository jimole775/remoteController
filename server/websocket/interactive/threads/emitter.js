/**
 * Created by Andy on 2017/3/23.
 */

import tool from "/server/tool/main";
import TR from "/server/websocket/socketRegister/socketRegister";

export default function (status, data, socket) {

    let opcode = TR.getStorage("opcode");

    let emitProtocolMap = {
        status: status,
        items: data
    };

    let PayloadData = opcode == 1 ? JSON.stringify(emitProtocolMap) : new Buffer(JSON.stringify(emitProtocolMap));

    socket.write(
        tool.frameEncode({
            FIN: 1,
            Opcode: opcode,
            PayloadData: PayloadData
        })
    );
}