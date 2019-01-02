var gulp = require('gulp');
var path = require('path');
var del = require('del');
var webpack = require('webpack');
var config = require("./webpack.config.js");
gulp.task('default',['clean:webpack'],function() {

        webpack(config.client, function(err, stats) {
            // compileLogger(err, stats);
            // callback();
        });

        webpack(config.server, function(err, stats) {
            // compileLogger(err, stats);
            // callback();
        });
});

// 清理js/css
gulp.task('clean:webpack', function() {
    del([
        config.client.output.path
    ], { force: true });
});
