/**
 * Created by Andy on 2017/3/14.
 */

import path from "path";
import frameEncode from "./WSCompiler/frameEncode";
import frameDecode from "./WSCompiler/frameDecode";

function add(target, name, file) {
    target.prototype[name] = file;
}
//@add(Tool,"frameEncode", frameEncode);
//@add(Tool,"frameDecode", frameDecode);
class Tool {
    constructor() {

    }
}

add(Tool, "frameEncode", frameEncode);
add(Tool, "frameDecode", frameDecode);
export default new Tool();


