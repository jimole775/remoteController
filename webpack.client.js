/**
 * Created by Andy on 2017/10/25.
 */

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const webClient = {
    entry: [
        // "babel-core",
        // "babel-polyfill",
        path.join(__dirname, "public/css/base.scss"),
        path.join(__dirname, "client/src/app/index.js")
    ],
    target: "web",
    // devServer: {
    //     contentBase: path.join(__dirname, "client/assets"),
    //     hot: true
    //   },
    output: {
        //publicPath: "../",   //cdn资源加载的统一路径
        path: path.join(__dirname, "client/src"),  //webpack打包文件的统一输出路径
        filename: 'assets/js/bundle.[chunkHash:5].js'
    }
};

webClient.plugins = [
    new HtmlWebpackPlugin({
        title: 'RMT',
        template: path.join(__dirname, 'client/src/app/index.html'),
        filename: path.join(__dirname, 'client/src/index.html'),
        inject: 'body',
        favicon: path.join(__dirname, 'client/src/favicon.ico')
    }),
    new webpack.DllReferencePlugin(
        {
            context: __dirname,
            manifest: require('./public/lib/manifest.json')
        }
    )
    //  ,new webpack.optimize.UglifyJsPlugin({
    //     comments: false,
    //     mangle: false,
    //     compress: {
    //         warnings: false
    //     }
    //  })
    , new ExtractTextPlugin({
        filename: "assets/css/bundle.[chunkHash:5].css",
        allChunks: true
    })

    //  ,new webpack.NamedModulesPlugin()
    //  ,new webpack.HotModuleReplacementPlugin()
];

webClient.resolve = {

    //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
    extensions: ['.js', '.json', '.scss'],

    //模块别名定义，方便后续直接引用别名，无须多写长长的地址
    alias: {
        SimulateSlider$: path.join(__dirname, 'public/plugin/SimulateSlider/SimulateSlider.js')     //后续直接 require('SimulateSlider') 即可
        , StorageRegister$: path.join(__dirname, 'public/plugin/StorageRegister/StorageRegister.js')
        , client: path.join(__dirname,'client')

        , wsClient: path.join(__dirname, 'client/src/app/webSocket.client.io')
        //, RMTDistributor$: path.join(__dirname, 'client/src/app/services/remote.distributor/distributor/distributor.js')
    }
};


module.exports = webClient;