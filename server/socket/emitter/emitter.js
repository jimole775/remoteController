/**
 * Created by Andy on 2017/3/23.
 */

import tool from "../services/tool/exports.js";
import TR from "wsServer/services/socket.storage/socketStorage";

export default function (status, emitData, socket) {

    let opcode = TR.getStorage("opcode");

    let emitProtocolMap = {
        "status": status,
        "serverData": emitData,

        // 谁发上来的数据，就返回给谁，其他用户一律返回null
        "clientData": emitData.clientData && emitData.clientData.uid === socket.uid ? emitData.clientData : null
    };
    let PayloadData = opcode == 1 ? JSON.stringify(emitProtocolMap) : Buffer.from(JSON.stringify(emitProtocolMap));

    if(socket.uid && socket.writable)
        socket.write(
            tool.frameEncode({
                FIN: 1,
                Opcode: opcode,
                PayloadData: PayloadData
            })
        );
}