/**
 * Created by Andy on 2017/8/15.
 */
// const ExtractTextPlugin = require("extract-text-webpack-plugin")
let client = require("./webpack.client.js")
let server = require("./webpack.server.js")
let dll = require("./webpack.dll.js")
let webpack = require("webpack")
let test = require("./webpack.test.js")
let devConfig = require("./build/dev.config.js")
let prodConfig = require("./build/prod.config.js")

let $module = {
    mode:"production",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                // loader: "babel-loader",
                // exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
                // options: {presets: ["es2015"]},
                exclude: [/node_modules/,/lib/]
            },
            {
                test: /\.jade$/,
                loader: "pug-loader"
            },
            // {
            //     test: /\.(css|less)$/,
            //     loader: ExtractTextPlugin.extract({
            //         fallback: "style-loader",
            //         use: "css-loader!less-loader"
            //     })
            // },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    // {
                    //     loader: 'url-loader',
                    //     options: {
                            
                    //     }
                    // },
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images',
                            name: '[hash].[ext]'
                        }
                    }/*,
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true
                            },
                            gifsicle: {
                                interlaced: true
                            },
                            optipng: {
                                optimizationLevel: 7
                            }
                        }
                    }*/
                ]
            }
        ]
    }
};

let $devtool
$devtool = {devtool: "cheap-module-eval-source-map"}
// $devtool = $devtool ? $devtool : {};    // 在注销devtool时，不用修改后面的代码
client = injectPlugins(Object.assign(client, $module, $devtool))
server = injectPlugins(Object.assign(server, $module, $devtool))

function injectPlugins (config) {
    let envprops = {}
    if (process.env.NODE_ENV === 'development') {
        envprops = devConfig
    }
    if (process.env.NODE_ENV === 'production') {
        envprops = prodConfig
    }
    config.plugins.push(new webpack.DefinePlugin({ 'global.env': JSON.stringify(envprops) }))
    return config
}

module.exports = { client, server, dll }
