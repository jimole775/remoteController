/**
 * Created by Andy on 2017/10/27.
 */
const path = require("path");
const vendors = [
    "jquery",
    "angular",
    "angular-ui-router",
    "lodash",
    "photoswipe",
    "Base64",
    "jroll"
];
const webpack = require("webpack");

const config = {
    output: {
        filename: "[name].js",
        publicPath:"./public/lib/",
        path: path.join(__dirname, "public/lib"),
        library: "[name]"
    },
    entry: {
        vendor: vendors
    },
    plugins: [
        new webpack.DllPlugin({
                path: "./public/lib/manifest.json",
                name: "[name]",
                context: __dirname
            }
        )/*,
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })*/
    ]

};

module.exports = config;