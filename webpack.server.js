/**
 * Created by Andy on 2017/10/25.
 */
const path = require("path");
const webpack = require("webpack");

const hostDist = path.join(__dirname);
const DBDist = path.join(__dirname, "database/json");
const serverDis = path.join(__dirname, "server");
const publicDist = path.join(__dirname, "public");

var server = {
    target: "node"
};

server.entry = path.resolve(serverDis, "index.js");

server.output = {
    publicPath: path.join(hostDist),
    path: path.join(serverDis),
    filename: 'bundle.node.js'
};

server.plugins = [
    /*  new webpack.optimize.UglifyJsPlugin({
     compress:{
     warnings:true
     }
     })*/
];
server.node = {
    __filename: true,
    __dirname: true
};
server.resolve = {
    extensions: ['.js', '.json', '.css', '.less'] //添加在此的后缀所对应的文件可以省略后缀
    //模块别名定义，方便后续直接引用别名，无须多写长长的地址
    ,alias: {
        StorageRegister$: path.join(publicDist, 'plugin/StorageRegister/StorageRegister.js')
        , publicDist: path.join(publicDist)
        , DB: path.join(DBDist)
        , wsServer: path.join(__dirname, 'server/socket')        
        , log$: path.join(__dirname, 'server/log/main.js')
    }
};


module.exports = server;