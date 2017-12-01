/**
 * Created by Andy on 2017/10/25.
 */
const path = require("path");
const webpack = require("webpack");
const serverDir = path.join(__dirname, "server");

var server = {
    target: "node"
};

server.entry = path.resolve(serverDir,"tool/main.js");

server.output =  {
    path: path.join(__dirname),
    filename: 'lib.node.js'
};

server.plugins = [
  /*  new webpack.optimize.UglifyJsPlugin({
        compress:{
            warnings:true
        }
    })*/
];

/*server.module = {
    loaders: [
        {
            test: /\.(js|jsx)$/,
            loader: "babel-loader",
            options: {presets: ["es2015"]}/!*,
            exclude: [/node_modules/, /lib/, /lib-full-version/]*!/
        },
        {test: /\.(png|gif|peg)$/, loader: "url?limit=9180"}
    ]
};*/

server.resolve = {
    extensions: ['', '.js', '.json', '.css', '.scss'] //添加在此的后缀所对应的文件可以省略后缀
};


module.exports = server;