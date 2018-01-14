/**
 * Created by Andy on 2017/11/7s.
 */
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");
let test = {
    entry: "./test/useage.js",
    output: {path: __dirname + "/test", filename: "bundle.[chunkHash:5].js"},
    target: "web",
    resolve: { //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['.js', '.json', '.scss'],

        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            SimulateSlider$: path.join(__dirname, 'public/plugin/SimulateSlider/SimulateSlider.js')     //后续直接 require('SimulateSlider') 即可
            , StorageRegister$: path.join(__dirname, 'public/plugin/StorageRegister/StorageRegister.js')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'test',
            template: path.resolve(__dirname, 'test/template.html'),
            filename: path.resolve(__dirname, 'test/index.html'),
            inject: 'head',
            favicon: './fav.jpg'
        })
        , new ExtractTextPlugin("[id].[name].css")
    ]
};
module.exports = test;