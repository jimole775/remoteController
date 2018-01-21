/**
 * Created by Andy on 2017/12/2.
 */
import path from "path";
global.ROOT_DIS = path.resolve(__dirname,"../");

console.log(global.ROOT_DIS);
global.SOURCES_DIS = path.resolve(__dirname,"../client/src");
global.ASSETS_DIS = path.resolve(__dirname,"../client/src/assets");
console.log(global.CLIENT_DIS);
global.SERVER_DIS = path.resolve(__dirname);
console.log(global.SERVER_DIS);
global.DB_DIS = path.resolve(global.SERVER_DIS,"DB");
console.log(global.DB_DIS);


import CreateHttp from "./http/init/open.js";
(new CreateHttp()).open(80);

import createSocket from "./socket/init/open/open.js";
createSocket(1111);