/**
 * Created by Andy on 2017/12/2.
 */
var path = require("path");

global.ROOT_DIS = path.resolve(__dirname,"../");
console.log(global.ROOT_DIS);
global.CLIENT_DIS = path.resolve(__dirname,"client");
console.log(global.CLIENT_DIS);
//var JSON = require("json2");
var data = require("../../../server/data/DTCValues.json");
console.log("js data:",JSON.stringify(data));
//var createHttp = require("./exports.js");
//
//createHttp.run();