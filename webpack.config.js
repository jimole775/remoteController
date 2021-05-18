/**
 * Created by Andy on 2017/8/15.
 */
// const ExtractTextPlugin = require("extract-text-webpack-plugin")
let client = require("./webpack.client.js")
let server = require("./webpack.server.js")
let webpack = require("webpack")
let test = require("./webpack.test.js")

let $module = {
    mode: 'production',
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

client = Object.assign(client, $module)
server = Object.assign(server, $module)

module.exports = { client, server }
