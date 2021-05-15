/**
 * Created by Andy on 2017/10/25.
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackInjector = require('html-webpack-injector');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const webClient = {
    entry: [
        // 'babel-core',
        // 'babel-polyfill',
        path.join(__dirname, 'client/app/src/common/css/base.less'),
        path.join(__dirname, 'client/app/src/index.js')
    ],
    target: 'web',
    // devServer: {
    //     contentBase: path.join(__dirname, 'client/assets'),
    //     hot: true
    //   },
    output: {
        publicPath: 'static/',   //cdn资源加载的统一路径
        path: path.join(__dirname, 'client/dist/static'),  //webpack打包文件的统一输出路径
        filename: 'js/bundle.[chunkHash:5].js'
    }
};

webClient.plugins = [
    new HtmlWebpackPlugin({
        title: 'RMT',
        inject: true,
        template: path.join(__dirname, 'client/lib/index.html'),
        filename: path.join(__dirname, 'client/dist/index.html')
    })
    , new webpack.DllReferencePlugin(
        {
            context: __dirname,
            manifest: require(path.resolve(__dirname, 'client/lib/manifest.json'))
        }
    )
    // , new HtmlWebpackTagsPlugin({ tags: ['./client/lib/vendor.[hash].js'], append: true })
    // , new HtmlWebpackTagsPlugin({
    //     // new HtmlWebpackTagsPlugin({ tags: ['a.js', 'b.css'], append: true })
    //     // tags: ['lib/vendor.*.js', 'js/bundle.*.js'], append: true
    //     scripts: [
    //         // { glob: 'vendor.*.js', path: 'lib', globPath: 'client/dist/lib', globFlatten: true, attributes: { defer: 'defer' }, append: true },
    //         { glob: 'bundle.*.js', path: 'js', globPath: 'client/dist/js', globFlatten: true, attributes: { defer: 'defer' }, append: true }
    //     ],
    //     // scripts: [
    //     //     {
    //     //         path: './lib/vendor.dll.js'
    //     //     }
    //     // ]
    //     })
    , new ExtractTextPlugin({
        filename: 'css/bundle.[chunkHash:5].css',
        allChunks: true
    })
    // , new CopyWebpackPlugin(
    //     [{
    //         patterns: [
    //             {
    //                 from: path.join(__dirname, '/client/app/static/*'),
    //                 to: path.join(__dirname, '/client/dist/static/*')
    //             }
    //         ],
    //         options: {
    //           concurrency: 100,
    //         },
    //     }]
    // )
    // , new webpack.HotModuleReplacementPlugin()
];

webClient.resolve = {

    //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
    extensions: ['.js', '.json', '.less'],

    //模块别名定义，方便后续直接引用别名，无须多写长长的地址
    alias: {
        SimulateSlider$: path.join(__dirname, 'public/plugin/SimulateSlider/SimulateSlider.js')     //后续直接 require('SimulateSlider') 即可
        , StorageRegister$: path.join(__dirname, 'public/plugin/StorageRegister/StorageRegister.js')
        , client: path.join(__dirname,'client')
        , wsClient: path.join(__dirname, 'client/app/src/webSocket.client.io')
        //, RMTDistributor$: path.join(__dirname, 'client/app/src/services/remote.distributor/distributor/distributor.js')
    }
};

module.exports = webClient;
