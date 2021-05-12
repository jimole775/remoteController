/**
 * Created by Andy on 2017/10/27.
 */
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const vendors = [
    "jquery",
    "angular",
    "angular-ui-router",
    "lodash",
    "jroll"
];
const webpack = require("webpack");

const config = {
    output: {
        publicPath: 'lib',
        filename: "[name].[chunkHash:5].js",
        path: path.join(__dirname, "client/lib/"),
        library: "[name]"
    },
    entry: {
        vendor: vendors
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'client/app/src/index.html'),
            filename: path.join(__dirname, 'client/lib/index.html')
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DllPlugin({
                path: path.join(__dirname, "client/lib/manifest.json"),
                name: "[name]",
                context: __dirname
            }
        )
    ]

};

module.exports = config;