/**
 * Created by Andy on 2017/12/2.
 */
import path from "path";
import createSocket from "./socket/init/open/open.js";
import CreateHttp from "./http/init/open.js";

global.ROOT_DIS = path.resolve(__dirname,"../");

global.SOURCES_DIS = path.resolve(__dirname,"../client/dist");
global.SERVER_DIS = path.resolve(__dirname);
global.DB_DIS = path.resolve(global.SERVER_DIS,"database/json");

(new CreateHttp()).open(global.env.HTTPPORT);
createSocket(global.env.WSPORT);

console.log(global.CLIENT_DIS);
console.log(global.SERVER_DIS);
console.log(global.ROOT_DIS);
console.log(global.DB_DIS);
console.log(global.env);
