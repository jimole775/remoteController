var gulp = require('gulp');
var path = require('path');
var del = require('del');
var webpack = require('webpack');
var config = require("./webpack.config.js");
gulp.task('default',['clean:webpack'],function() {

        webpack(config, function(err, stats) {
            
        });
});

// 清理js/css
gulp.task('clean:webpack', function() {
    del([
        config.output.path
    ], { force: true });
});
