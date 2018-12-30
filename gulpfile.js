var gulp = require('gulp');
var path = require('path');
var del = require('del');
var webpack = require('webpack');
var config = require("./webpack.config.js");
gulp.task('default',['clean:webpack'],function() {

        webpack(config[0], function(err, stats) {
            // compileLogger(err, stats);
            // callback();
        });

        webpack(config[1], function(err, stats) {
            // compileLogger(err, stats);
            // callback();
        });
});

// 清理js/css
gulp.task('clean:webpack', function() {
    del([
        config[0].output.path
    ], { force: true });
});
