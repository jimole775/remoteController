var gulp = require('gulp')
var path = require('path')
var del = require('del')
var through = require('through2')
// var gulpCopy = require('gulp-copy')
var webpack = require('webpack')
var fs = require('fs')
var config = require("./webpack.config.js")

gulp.task('clean:dist', function(done) {
    del([config.client.output.path], { force: true })
    return done && done()
});
gulp.task('clean:dirty', function(done) {
    del(['./client/lib'], { force: true })
    return done && done()
});

gulp.task('copy:lib', function(done) {
    gulp.src(['./client/lib/*.js', './client/lib/*.json'])
        .pipe(gulp.dest('./client/dist/static/lib/'))
    return done && done()
});

gulp.task('copy:static', function(done) {
    gulp.src('./client/static/*')
        .pipe(gulp.dest('./client/dist/static/'))
    return done && done()
});

// 把assets文件复制到dist目录
gulp.task('copy:assets', gulp.series('copy:static', 'copy:lib'));

// 往index.html中注入内容
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
    gulp.src('./client/app/src/index.html')
        .pipe(through.obj(injectHtmlTags))
        .pipe(gulp.dest('./client/'))
    return done && done()
});

// 打包
gulp.task('build:dll',function(done) {
    webpack(config.dll, function(err, stats) {
        // compileLogger(err, stats);
        // callback();
    });
    return done && done()
})

// 打包
gulp.task('build:server',function(done) {
    webpack(config.server, function(err, stats) {
        // compileLogger(err, stats);
        // callback();
    });
    return done && done()
})

// 打包
gulp.task('build:client',function(done) {
    webpack(config.client, function(err, stats) {
        // compileLogger(err, stats);
        // callback();
    });
    return done && done()
})

gulp.task('build', gulp.series('build:dll', 'build:client', 'build:server'))
gulp.task('default', gulp.series('clean:dist', 'build', 'copy:assets'))
// gulp.task('default', gulp.series('inject:tags'))
