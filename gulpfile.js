var gulp = require('gulp')
var path = require('path')
var del = require('del')
var webpack = require('webpack')
var config = require("./webpack.config.js")
// 清理js/css
gulp.task('clean:webpack', function(done) {
    console.log('config.client.output.path', config.client.output.path)
    del([
        config.client.output.path
    ], { force: true })
    return done && done()
});

gulp.task('build',function(done) {

        webpack(config.client, function(err, stats) {
            // compileLogger(err, stats);
            // callback();
        });

        webpack(config.server, function(err, stats) {
            // compileLogger(err, stats);
            // callback();
        });

        return done && done()
})


gulp.task('default',gulp.series('clean:webpack','build'));
