var gulp = require('gulp')
var path = require('path')
var del = require('del')
// var gulpCopy = require('gulp-copy')
var webpack = require('webpack')
var fs = require('fs')
var config = require("./webpack.config.js")
// 清理js/css
gulp.task('clean:webpack', function(done) {
    del([config.client.output.path], { force: true })
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
    
    gulp.src('./client/src/lib/*')
        .pipe(gulp.dest('./client/dist/lib/'))
    return done && done()
})

gulp.task('copy:lib',function(done) {
    console.log('run', fs.readdirSync('./client/dist/'))
    gulp.src('./client/src/lib/*')
        .pipe(gulp.dest('./client/dist/lib/'))
    return done && done()
})

gulp.task('watcher', function (done) {
    gulp.watch(['/client/dist/*.html'], gulp.series('clean:webpack', 'build'))
})

gulp.task('default', gulp.series('clean:webpack', 'build'))

// watcher.on('add', function () {
//     console.log('>>>>>>>>')
// })
// watcher.on('unlink', function(path, stats) {
//     console.log('>>>>>>>>')
//     console.log(`File ${path} was removed`);
// });
// watcher.close()