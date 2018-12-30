var gulp = require('gulp');
var path = require('path');
var del = require('del');
var webpack = require('webpack');
var config = require("./webpack.config.js");
gulp.task('default',['clean:webpack'],function() {
  // 将你的默认的任务代码放在这
//   return gulp
        // .src("client/src/app/index.js")
        // .src([
            //     // "babel-core",
            //     // "babel-polyfill",
            //     path.join(__dirname, "public/css/base.scss"),
            //     path.join(__dirname, "client/src/app/index.js")
            // ])
        // .pipe(webpack(config))
        // .pipe(gulp.dest('/gulpTest/'));

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
