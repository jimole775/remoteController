/**
 * Created by Andy on 2017/10/25.
 */

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const clientDist = path.resolve(__dirname, "client");
const publicDist = path.resolve(__dirname, "public");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const webClient = {
    entry: [
        "babel-polyfill",
        path.resolve(publicDist, "css/base.scss"),
        path.resolve(clientDist, "src/template.js")
    ],
    target: "web",

    output: {
        publicPath: "../src/",   //cdn资源加载的统一路径
        path: path.resolve(clientDist, "src"),  //webpack打包文件的统一输出路径
        filename: 'assets/js/bundle.[chunkHash:5].js'
    }
};

webClient.plugins = [
    new HtmlWebpackPlugin({
        title: 'RMT',
        template: path.resolve(clientDist, 'src/template.html'),
        filename: path.resolve(clientDist, 'src/index.html'),
        inject: 'body',
        favicon: path.resolve(clientDist, 'src/fav.jpg')
    }),
    new webpack.DllReferencePlugin(
        {
            context: __dirname,
            manifest: require('./public/lib/manifest.json')
        }
    )/*,
     new webpack.optimize.UglifyJsPlugin({
     compress: {
     warnings: false
     }
     })*/
    , new ExtractTextPlugin({
        filename: "assets/css/bundle.[chunkHash:5].css",
        allChunks: true
    })
];

webClient.resolve = {

    //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
    extensions: ['.js', '.json', '.scss'],

    //模块别名定义，方便后续直接引用别名，无须多写长长的地址
    alias: {
        SimulateSlider$: path.join(publicDist, 'plugin/SimulateSlider/SimulateSlider.js')     //后续直接 require('SimulateSlider') 即可
        , StorageRegister$: path.join(publicDist, 'plugin/StorageRegister/StorageRegister.js')
        //, JrollDefaultOption$: path.join(publicDist, 'plugin/JrollDefaultOption/JrollDefaultOption.js')
        , RMT$: path.join(clientDist, 'webSocket/remote.router/RMTDistributor/RMTDistributor.js')
        , publicDist: path.join(publicDist)
        , clientDist: path.join(clientDist)
    }
};


module.exports = webClient;