/**
 * Created by Andy on 2017/10/27.
 */
const path = require("path");
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
        filename: "[name].[chunkHash:5].js",
        path: path.join(__dirname, "client/src/assets/lib/"),
        library: "[name]"
    },
    entry: {
        vendor: vendors
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DllPlugin({
                path: "client/src/assets/lib/manifest.json",
                name: "[name]",
                context: __dirname
            }
        )
    ]

};

module.exports = config;