/**
 * Created by Andy on 2017/11/6.
 */

import Reg from "./main";
import StorageRegister from "StorageRegister";
let rg = new StorageRegister({foo:"congrssssss"});

let storage = {};
Reg.setStorage("baz");
class Rex extends Reg{

}
Rex.setStorage("bazzzzÍÞÍÞ´ó");
export default rg;