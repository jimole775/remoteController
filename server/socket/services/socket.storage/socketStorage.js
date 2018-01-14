/**
 * Created by Andy on 2017/11/7.
 */
import StorageRegister from "StorageRegister";
let storage = {
    clients: {},
    namesMap: [],
    remoteChanelMap: [],
    opcode: 0
};
export default new StorageRegister(storage);
