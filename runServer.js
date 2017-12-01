/**
 * Created by Andy on 2017/2/8.
 */
global.ROOT_DIR = __dirname;
global.HOST_DIR = __dirname + "/client/www";
var createHttp = require("./server/http");
createHttp.run();

var createTcp = require("./server/socket");
createTcp.run();
