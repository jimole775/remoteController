var gulp = require('gulp')
var path = require('path')
var del = require('del')
var through = require('through2')
// var gulpCopy = require('gulp-copy')
var webpack = require('webpack')
var fs = require('fs')
var config = require("./webpack.config.js")
// 清理js/css
gulp.task('clean:webpack', function(done) {
    del([config.client.output.path], { force: true })
    return done && done()
});


gulp.task('copy:lib', function(done) {
    gulp.src('./client/lib/*')
        .pipe(gulp.dest('./client/dist/lib/'))
    return done && done()
});


function injectHtmlTags (chunk, enc, callback) {
    var contents = chunk.contents.toString('utf8')
    var sp = contents.split('</body>')
    var pre = sp[0]
    this.push(chunk)
    // var a = fs.readFileSync(chunk)
    console.log('dasdassd', )
    callback()
}

gulp.task('inject:tags', function(done) {
    gulp.src('./client/src/app/index.html')
        .pipe(through.obj(injectHtmlTags))
        .pipe(gulp.dest('./client/'))
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

// gulp.task('default', gulp.series('clean:webpack', 'build'))
gulp.task('default', gulp.series('inject:tags'))
