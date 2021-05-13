/**
 * Created by Andy on 2017/12/2.
 */
import path from "path";
global.ROOT_DIS = path.resolve(__dirname,"../");

console.log(global.ROOT_DIS);
global.SOURCES_DIS = path.resolve(__dirname,"../client/dist");
console.log(global.CLIENT_DIS);
global.SERVER_DIS = path.resolve(__dirname);
console.log(global.SERVER_DIS);
global.DB_DIS = path.resolve(global.SERVER_DIS,"database/json");
console.log(global.DB_DIS);

import CreateHttp from "./http/init/open.js";
// if (global.env.ENV === 'development') {
  (new CreateHttp()).open(global.env.HTTPPORT);
// }

import createSocket from "./socket/init/open/open.js";
createSocket(global.env.WSPORT);
